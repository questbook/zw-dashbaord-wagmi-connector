const detectIsMobile = () => {
   
    const details = navigator.userAgent;
      
    const regexp = /android|iphone|kindle|ipad/i;
    
    const isMobileDevice = regexp.test(details);

    return isMobileDevice;
}

export default detectIsMobile;