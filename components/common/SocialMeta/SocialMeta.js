import PropTypes from 'prop-types';
import Head from 'next/head';

function SocialMeta(props) {
  const {
    data: { url = '', title = '', image = '', description = '', pageIndex = 'index', linkFollow = "follow", keywords = '' },
  } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta name="robots" content={`${pageIndex},${linkFollow}`} />
      <meta property="og:title" content={title} key="facebookTitle" />

      <meta
        name="twitter:card"
        content="summary_large_image"
        key="twitterCard"
      />

      <meta name="twitter:title" content={title} key="twitterTitle" />

      <meta property="og:type" content="article" key="facebookType" />

      {
    url && (
      <>
        <meta property="og:url" content={url} key="facebookUrl" />
        <meta name="twitter:url" content={url} key="twitterUrl" />
      </>
    )
  }

  {
    image && (
      <>
        <meta name="thumbnail" content={image} key="googleImage" />
        <meta property="og:image" content={image} key="facebookImage" />
        <meta name="twitter:image" content={image} key="twitterImage" />
      </>
    )
  }
  {
    description && (
      <>
        <meta
          property="og:description"
          content={description}
          key="facebookDescription"
        />
        <meta name="description" content={description} key="description" />
        <meta
          name="twitter:description"
          content={description}
          key="twitterDescription"
        />
      </>
    )
  }
  {keywords && (
    <>
    <meta name="keywords" content={keywords} />
    </>
  )}
    </Head >
  );
}

SocialMeta.propTypes = {
  data: PropTypes.object.isRequired,
};

export default SocialMeta;
