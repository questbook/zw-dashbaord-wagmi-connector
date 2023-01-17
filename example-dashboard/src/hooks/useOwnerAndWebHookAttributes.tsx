import { useSigner } from "wagmi";
import { ZeroWalletSigner } from 'zero-wallet-wagmi-connector';
import React, { useEffect } from 'react';
import { IBase } from "../types";


export default function useOwnerAndWebHookAttributes() {
    const { data: signer } = useSigner<ZeroWalletSigner>();
    const [webHookAttributes, setWebHookAttributes] = React.useState<IBase>();

    useEffect(() => {
        if (!signer) return;
        const getWebHookAttributes = async () => {
            const nonce = await signer.getNonce();
            setWebHookAttributes({
                ownerScw: signer.scwAddress || '',
                webHookAttributes: {
                    nonce,
                    signedNonce: await signer.signNonce(nonce),
                }
            })
        }
        getWebHookAttributes();
    }, [signer])

    return webHookAttributes;
}
