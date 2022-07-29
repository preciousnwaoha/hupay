import bunzz from "bunzz-sdk";

// Get variable from .env
const DAPP_ID = process.env.REACT_APP_DAPP_ID;
const API_KEY = process.env.REACT_APP_API_KEY;

/**
 * init - Initializes the bunzz sdk
 * @returns a handler with access to the bunzz blockchain functions
 */
const init = async () => {
  const handler = await bunzz.initializeHandler({
    dappId: DAPP_ID,
    apiKey: API_KEY,
  });
  return handler;
};

export default init;