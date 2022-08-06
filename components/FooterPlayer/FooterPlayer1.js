import React, { Component } from 'react'
import styles from '/styles/footerplayer.module.scss'
import songBarsStyles from '/styles/songBars.module.scss'

// import Player from '../Player/Player'
import ReactTooltip from 'react-tooltip';
import { Icon, Login } from '../../../components/Index'
import func from '../../../assets/js/functions'
import playerFunc from '../../../assets/js/player'
import toast from 'react-hot-toast'
import { reactLocalStorage } from 'reactjs-localstorage';
import Cookie from 'universal-cookie'
import adholder from '/assets/images/320x50.png'
import './full-player.css'
import { APP_INFO } from '/constants'

const cookies = new Cookie()
const saveSongStateInterval = 1; // every 5 seconds it will save the song total play duration

// const default_state = {
// 	scrubberTooltipVal: 0,
// 	maxScrubberVal: 1,
// 	volume: reactLocalStorage.get('volume') || 100,
// 	playing: false,
// 	isRepeating: false,
// 	currentTime: 0,
// 	muted: false,
// 	loginVisible: false,
// 	isFavorite: false,
// 	playingSongData: {},
// 	isExpanded: false,
// 	favList: [],
// 	queue: [],
// 	songUniqueHash: '',
// 	lastInsertedSeconds: 0
// }

export default class FooterPlayer extends Component {

	state = { ...default_state }

	constructor(props) {
		super()
		this.audio = new Audio()
		this.audioLoop = null
	}

	songTotalPlayTime = 0;

	loop = () => {
		this.audioLoop = setInterval(() => {
			let audioDuration = parseInt(this.audio.duration)
			let currentTime = parseInt(this.audio.currentTime)
			document.getElementById("scrubber").value = currentTime
			let playingState = this.audio.paused ? false : true
			this.setState({
				maxScrubberVal: audioDuration,
				currentTime: currentTime,
				playing: playingState
			})
			if (this.state.maxScrubberVal > 30 && this.state.currentTime >= saveSongStateInterval && (this.songTotalPlayTime % saveSongStateInterval) === 0) {
				this.saveSongPlaytime()
			}
			this.songTotalPlayTime = this.songTotalPlayTime < this.state.maxScrubberVal ? this.songTotalPlayTime + 0.5 : 0 // 0.5 is because the loop is iterating every 0.5 seconds
		}, 500)


	}

	componentDidMount() {
		let scrubber = document.getElementById("scrubber")
		scrubber.addEventListener('mousemove', this.scrubber)
		this.playNewAudio(this.props.song_id)
		window.addEventListener('keyup', e => this.listenKeys(e))
		if (this.props.isLogged) {
			this.fetchFavSongList()
			this.fetchQueue(this.props.song_id)
		}
	}

	componentDidUpdate(prevProps) {
		let scrubber = document.getElementById("scrubber")
		scrubber.addEventListener('mousemove', this.scrubber)
		if (prevProps.song_id !== undefined && prevProps.song_id !== this.props.song_id) {
			this.audio.pause()
			this.playNewAudio(this.props.song_id);
		}
	}

	componentWillUnmount() {
		let scrubber = document.getElementById("scrubber")
		scrubber.removeEventListener('mousemove', this.scrubber)
		window.removeEventListener('keyup', e => this.listenKeys(e))
	}

	scrubber = e => {
		let width = window.innerWidth
		let x = e.clientX
		let min = 0
		let max = this.state.maxScrubberVal
		let value = (x / width) * (max - min)
		this.setState({ scrubberTooltipVal: value })
	}

	scrubberMinSecStr = sec => {
		let result = playerFunc.secToMinSec(sec)
		return result.min + ":" + result.sec
	}

	volumeChange = e => {
		let value = e.target.value
		let val = ((value - 0) / 100) * 100
		let css = 'linear-gradient(to right, #82CFD0 0%, #82CFD0 ' + val + '%, #bdc3c7 ' + val + '%, #bdc3c7 100%)'
		document.getElementById("volume-controller").style.background = css
		this.setState({ volume: value }, () => {
			reactLocalStorage.set('volume', value)
			this.audio.volume = value / 100
		})
	}

	saveSongPlaytime = () => {
		console.log(this.props)
		// console.log("Saving song playtime state")
		if (this.props.isLogged) {
			// Save to server

			return
		}
		// is not logged in then Save to localstorage
		let obj = reactLocalStorage.getObject('playedSongs') || {}
		console.log(obj)
		let newSongObj = {}
		let songId = this.state.playingSongData?.song_id
		if (obj.hasOwnProperty(this.state.playingSongData.song_id)) {
			let songData = obj[songId]
			let newPercent = 0;
			let totalCount = 1;
			let playTime = 0;
			let hash = songData.hash
			let totalDuration = (songData.totalPlayCount * this.state.maxScrubberVal)
			console.log(this.state.songUniqueHash, songData.hash)
			if (songData.hash === this.state.songUniqueHash) {
				console.log("Percent:" + songData.percent)
				playTime = (((songData.percent / 100) * this.state.maxScrubberVal) * songData.totalPlayCount) + (this.songTotalPlayTime - (this.songTotalPlayTime - saveSongStateInterval))
				newPercent = (playTime / totalDuration) * 100
				totalCount = songData.totalPlayCount

			}
			else {
				let percentToSec = (((songData.percent / 100) * this.state.maxScrubberVal) * songData.totalPlayCount)
				playTime = percentToSec + this.songTotalPlayTime
				newPercent = (playTime / (totalDuration + parseInt(this.state.maxScrubberVal))) * 100
				totalCount = songData.totalPlayCount + 1
				hash = this.state.songUniqueHash
			}

			newSongObj[songId] = {
				totalPlayCount: totalCount,
				percent: newPercent,
				hash: hash
			}
			reactLocalStorage.setObject('playedSongs', {
				...obj,
				...newSongObj
			})
			return
		}
		newSongObj[songId] = {
			totalPlayCount: 1,
			percent: (this.state.currentTime / this.state.maxScrubberVal) * 100,
			hash: this.state.songUniqueHash
		}


		reactLocalStorage.setObject('playedSongs', {
			...obj,
			...newSongObj
		})
		this.setState({ lastInsertedSeconds: this.state.currentTime })
		return
	}

	generateHash = length => {
		var result = '';
		var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for (var i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

	toggleExpand = () => {
		this.setState({
			isExpanded: !this.state.isExpanded
		})
	}

	render() {
		return (
			<React.Fragment>
				<div className="footer-player-ph"></div>
				{!this.state.isExpanded ?
					<div className="music-player" id="footer-player">
						<div className="mp-seek">
							<input data-for="scrubber-inp" data-tip type="range" min="0" max={this.state.maxScrubberVal || 0} id="scrubber" onChange={e => this.seek(e.target.value)} />
							<ReactTooltip id='scrubber-inp' type='dark' effect='float'>
								<span>{this.scrubberMinSecStr(Math.ceil(this.state.scrubberTooltipVal))}</span>
							</ReactTooltip>
						</div>
						<div className="mp-left">
							<div className="mp3-icon-cont">
								{/* <Icon type="solid" classes="fas fa-music mp-footer-icon" /> */}
								<div className="mp-bars"></div>
							</div>
							<div className="song-data">
								<span className="mp-song-title" data-for="stitle" data-tip>{this.state.playingSongData?.title}</span>
								{/* <span className="mp-song-details">{this.state.playingSongData?.total_downloads} Downloads</span> */}
								<span className="mp-song-details" data-tip={this.props.isLogged ? "Next song." : 'Login'} >
									{this.props.isLogged ? "Next song name here" : 'Login to get favourite tracks.'}
								</span>
								<ReactTooltip id='stitle' type='dark' effect='solid'>
									<span>{this.state.playingSongData?.title}</span>
								</ReactTooltip>
							</div>
							<div className="mp-left-btn-cont">
								<span data-tip={`${this.state.isFavorite ? "Remove from favourites" : "Add to favourites"}`} className="mp-left-btn mp-fav-btn" onClick={this.markAsFav}>
									<Icon type={`${this.state.isFavorite ? 'solid' : 'regular'}`} classes="fa-heart" />
								</span>
								<span data-tip="Download this song." className="mp-left-btn mp-download-btn" onClick={this.download}>
									<Icon type="regular" classes="fa-download" />
								</span>
							</div>
						</div>
						<div className="mp-center">
							<div className="mp-time">
								<span id="current-time" className="mp-current-time" data-tip="Current Time">{playerFunc.secToMinSec(this.state.currentTime).min + ":" + playerFunc.secToMinSec(this.state.currentTime).sec}</span>
								<span> / </span>
								<span className="mp-duration-time" data-tip="Total Duration">{playerFunc.secToMinSec(this.state.maxScrubberVal).min + ":" + playerFunc.secToMinSec(this.state.maxScrubberVal).sec}</span>
							</div>

							<span className="mp-control-btn" onClick={this.repeat}>
								<Icon classes={this.state.isRepeating ? 'fa-repeat-1-alt' : 'fa-repeat'} type="regular" />
							</span>

							<span className="mp-control-btn">
								<Icon classes="fa-angle-double-left" type="regular" />
							</span>

							<span className="mp-control-btn mp-play-btn" onClick={this.toggle}>
								<Icon classes={`${this.state.playing ? 'fa-pause' : 'fa-play'}`} type="regular" />
							</span>

							<span className="mp-control-btn">
								<Icon classes="fa-angle-double-right" type="regular" />
							</span>

							<span className="mp-control-btn" data-tip="Copy link (Ctrl + c)" onClick={this.copyLinkToClipboard}>
								<Icon classes="fa-link" type="regular" />
							</span>

							<span className="mp-control-btn mp-volume-btn">
								<div className="mp-vc-cont">
									<input data-tip data-for="vol-cont-tip" id="volume-controller" type="range" className="mp-vc" min="0" max="100" value={this.state.volume} onChange={e => this.volumeChange(e)} />
								</div>
								<ReactTooltip id='vol-cont-tip' type='info' effect='solid'>
									<span>{this.state.volume}</span>
								</ReactTooltip>
								<span onClick={this.mute}><Icon classes={`${this.state.muted ? 'fa-volume-slash' : 'fa-volume-up'}`} type="regular" /></span>
							</span>
						</div>
						<div className="mp-right">
							{/* <span data-tip={ this.props.isLogged ? "Next song." : 'Login'} className="mp-next-song">
							{ this.props.isLogged ? "Next song name here" : 'Login to get favourite tracks.'}
						</span> */}
							<img src={adholder} alt="" />

							<span className="mp-expand-btn" onClick={this.toggleExpand}>
								<Icon classes="fa-expand" type="regular" />
							</span>
						</div>
						<ReactTooltip type="info" effect="float" />
					</div> : 

					// <Player {...this.allMethods} {...this.state} {...this.props} />}
			</React.Fragment>
		)
	}








	setAudio = url => {
		this.audio = new Audio(url)
		this.audio.onplay = this.loop
		this.audio.onpause = () => clearInterval(this.audioLoop)
		//  apply settings to the audio obj
		this.audio.volume = this.state.volume / 100

		// remain loop mode
		this.audio.loop = this.state.isRepeating
		this.setState({
			maxScrubberVal: this.audio.duration
		})
		return this.audio
	}

	playNewAudio = (sid) => {
		clearInterval(this.audioLoop)
		this.setState({ isPlaying: true }, () => {
			fetch(APP_INFO.API_URL + 'song?id=' + sid, {
				method: 'get',
				headers: {
					"Content-Type": 'application/json',
					'sessid': cookies.get("PHPSESSID")
				}
			})
				.then(res => {
					if (res.ok) {
						return res.json()
					}
					throw new Error("Error")
				})
				.then(json => {
					if (json.status) {
						this.setState({
							playingSongData: json.data,
							isFavorite: json.data.favorite,
							playing: true,
							songUniqueHash: this.generateHash(16)
						}, () => {
							this.songTotalPlayTime = 0; // reset the audio total played duration
							this.audio.pause()
							this.setAudio(json.data.file).play()
						})
					}
					else {
						toast.error(json.error.message);
					}
				})
				.catch(err => {
					console.log(err)
				})
		})
	}


	play = () => {
		this.setState({
			playing: true
		}, () => {
			this.audio.play()
		})
	}

	pause = () => {
		this.setState({
			playing: false
		}, () => {
			this.audio.pause()
		})
	}

	toggle = () => {
		this.audio.paused ? this.play() : this.pause()
	}

	mute = () => {
		let state = this.state.muted
		this.setState({ muted: !state }, () => {
			this.audio.muted = !state
		})
	}

	stop = () => {
		this.audio.pause()
		this.audio.currentTime = 0
	}


	seek = sec => {
		this.audio.currentTime = sec
	}

	repeat = () => {
		let flag = !this.audio.loop
		this.setState({
			isRepeating: flag
		}, () => {
			this.audio.loop = flag
			reactLocalStorage.set('repeat', flag)
			flag ? toast.success("Repeat On", {
				position: 'bottom-left',
				style: {
					border: '2px solid var(--dark-green)',
					padding: '4px 16px',
					color: 'var(--dark-green)',
					minWidth: '120px'
				},
				iconTheme: { primary: 'var(--dark-green)', secondary: '#FFFAEE' },
			}) : toast.success("Repeat Off", {
				position: 'bottom-left',
				style: {
					border: '2px solid var(--dark-red)',
					padding: '4px 16px',
					color: 'var(--dark-red)',
					minWidth: '120px'
				},
				iconTheme: { primary: 'var(--dark-red)', secondary: '#FFFAEE' },
			})
		})
	}

	markAsFav = () => {
		if (this.props.isLogged) {
			fetch(APP_INFO.API_URL + 'favourite?sid=' + this.state.playingSongData.song_id, {
				method: 'get',
				headers: {
					"Content-Type": 'application/json',
					"sessid": cookies.get("PHPSESSID")
				}
			})
				.then(res => {
					if (res.ok) return res.json()
					throw new Error("Error")
				})
				.then(json => {
					if (json.status) {
						if (json.message === 'added') {
							this.setState({ isFavorite: true }, () => {
								toast.success('Added to favorite list.', {
									...APP_INFO.TOAST_INFO_STYLE,
									position: "bottom-left"
								});
							})
						}
						if (json.message === 'removed') {
							this.setState({ isFavorite: false }, () => {
								toast.success('Removed from favorite list.', {
									...APP_INFO.TOAST_INFO_STYLE,
									position: "bottom-left"
								});
							})
						}
						this.fetchFavSongList()
					}
				})
				.catch(err => {

				})
		}
		else {
			this.setState({ loginVisible: true })
		}
	}

	download = () => {
		let song_id = parseInt(this.state.playingSongData.song_id)
		let key = this.state.playingSongData.file_key
		window.open(APP_INFO.DOWNLOAD_SERVER_URL + '?file_id=' + song_id + '&auth_key=' + key, '_blank')
	}

	copyLinkToClipboard = () => {
		func.copyToClipboard(APP_INFO.APP_URL + 's/' + this.state.playingSongData.short_url)
		toast.success("Link copied to clipboard.", { position: 'bottom-left' })
	}

	fetchFavSongList = () => {
		fetch(APP_INFO.API_URL + 'favList', {
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				'sessid': cookies.get("PHPSESSID")
			}
		})
			.then(res => {
				if (res.ok) return res.json()
				throw new Error("Error");
			})
			.then(json => {
				if (json.status) {
					this.setState({ favList: json.data })
				}
				else {
					toast.error(json.error.message, { position: 'bottom-left' })
				}
			})
			.catch(err => {
				console.log(err)
			})
	}

	fetchQueue = sid => {
		if (isNaN(sid)) return
		fetch(APP_INFO.API_URL + 'queue', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				sid: sid,
			}
		})
			.then(res => {
				if (res.ok) return res.json()
				throw new Error("Error")
			})
			.then(json => {
				console.log(json)
				if (json.status) {
					this.setState({
						queue: json.data
					})
				}
				else {
					toast.error(json.error.message)
				}
			})
			.catch(err => {
				console.log(err)
			})
	}

	setFavsAsQueue = () => {
		this.setState({ queue: this.state.favList })
	}

	allMethods = {
		scrubber: this.scrubber,
		volumeChange: this.volumeChange,
		setAudio: this.setAudio,
		playNewAudio: this.playNewAudio,
		play: this.play,
		pause: this.pause,
		mute: this.mute,
		toggle: this.toggle,
		stop: this.stop,
		seek: this.seek,
		repeat: this.repeat,
		markAsFav: this.markAsFav,
		download: this.download,
		copyLink: this.copyLinkToClipboard,
		togglePlayer: this.toggleExpand,
		updateFavSongs: this.fetchFavSongList,
		setFavsAsQueue: this.setFavsAsQueue
	}

	listenKeys = e => {
		// check if any input box is focused.
		// If, then do not respond for the key.
		let elems = document.querySelectorAll('input')
		let flag = false
		elems.forEach(item => {
			if (item === document.activeElement) flag = true
		})
		if (flag) return true

		// CONTROL SEEKING THROUGH NUMPAD || NUMBERS FROM 0 TO 9
		// 48 TO 57 FOR THE UPPER NUMBER KEYS && 96 TO 105 FOR NUMPAD NUM KEYS
		if ((e.which >= 48 && e.which <= 57) || (e.which >= 96 && e.which <= 105)) {
			let val = e.which >= 45 && e.which <= 57 ? (parseInt(e.which) - 48) * 10 :
				e.which >= 96 && e.which <= 105 ? (parseInt(e.which) - 96) * 10 : 0
			let secs = parseInt((val * this.state.maxScrubberVal) / 100)
			this.seek(secs)
			return true
		}

		// HANDLE COPY SHORT URL COMMAND THROUGH (Ctrl + c || Ctrl + C)
		if ((e.which === 67 || e.which === 99) && e.ctrlKey) {
			this.copyLinkToClipboard()
		}
		let keyMap = [13, // Enter button
			32, // spacebar
			48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
			65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, // A to Z
			97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122 // a to z
		]
		let keyIndex = [1,
			2,
			3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
			//  a,  b,  c,  d,  e,  f,  g,  h,  i,  j,  k,  l,  m,  n,  o,  p,  q,  r,  s,  t,  u,  v,  w,  x,  y,  z  
			13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
			13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38
		]
		let pressedKey = keyMap.indexOf(e.which)
		// play/pause
		switch (keyIndex[pressedKey]) {
			case 2: // spacebar
				e.preventDefault() // disable default behaviour
				this.toggle()
				break

			case 30: // r pressed for repeat
				this.repeat(!this.state.isRepeating)
				break

			case 26: // n or N pressed for next
				// this.next()
				break
			case 25: // m or M pressed for mute
				this.mute()
				break
			case 28: // p or P pressed for prev song
				// this.prev()
				break
		}
	}
}
