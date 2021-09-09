export default ({ app }, inject) => {
  const activeGTag = function () {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', process.env.GTAG);
  };
  inject('activeGTag', activeGTag);
};
