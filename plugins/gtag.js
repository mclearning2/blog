export default ({ app }, inject) => {
  const activeGTag = function () {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-83T733X73S');
  };
  inject('activeGTag', activeGTag);
};
