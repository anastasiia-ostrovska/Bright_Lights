const DESKTOP_TYPE = 'DESKTOP';
const TABLET_TYPE = 'TABLET';
const MOBILE_TYPE = 'MOBILE';

const defaultDeviceType = DESKTOP_TYPE;
let _currentDeviceType = defaultDeviceType;

const getCurrentDeviceType = () => _currentDeviceType;
const setCurrentDeviceType = (type) => _currentDeviceType = type;

const setDesktopType = () => setCurrentDeviceType(DESKTOP_TYPE);
const setMobileType = () => setCurrentDeviceType(MOBILE_TYPE);
const setTabletType = () => setCurrentDeviceType(TABLET_TYPE);

const getIsDesktop = () => getCurrentDeviceType() === DESKTOP_TYPE;
const getIsMobile = () => getCurrentDeviceType() === MOBILE_TYPE;
const getIsTablet = () => getCurrentDeviceType() === TABLET_TYPE;

const updateDeviceTypeState = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  // console.log('userAgent', userAgent);

  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const tabletRegex = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i;

  if (mobileRegex.test(userAgent) === true) {
    setMobileType();
  } else if (tabletRegex.test(userAgent)) {
    setTabletType();
  } else {
    setDesktopType();
  }
  // console.log('getIsMobile(): ', getIsMobile());
  // console.log('getIsDesktop(): ', getIsDesktop());
  // console.log('getIsTablet(): ', getIsTablet());
};

window.onload = () => updateDeviceTypeState();
window.onresize = () => updateDeviceTypeState();

export default {
  getIsDesktop,
  getIsMobile,
  getIsTablet,
};

