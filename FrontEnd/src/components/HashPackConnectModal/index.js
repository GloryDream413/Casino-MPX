import React from "react";

import { UilCopy } from '@iconscout/react-unicons'
import {
    Button,
    Row,
    Input
} from "reactstrap";
import QRCode from "react-qr-code";
import "./style.scss";



function HsahPackConnectModal ({ pairingString, connectedAccount, onClickConnectHashPack, onClickCopyPairingStr, onClickDisconnectHashPack }) {
    return (
        
    <div className="MasterLogin">
    
        <div className="hashpack-connect-container">
            {
                !connectedAccount &&
                <div className="hashpack-connect-wrapper">
                    <p className="modal-title">Pair Wallet</p>
                    <p className="modal-mini-title">Pair with Wallet</p>
                    <Button className="hashpack-connect-btn" onClick={() => onClickConnectHashPack()}>
                        <img alt="..." src="https://wallet.hashpack.app/assets/favicon/favicon.ico" />
                        <p>HashPack</p>
                    </Button>
                    <p className="modal-mini-title"> Pair with Code</p>
                    <Row className="pair-with-code-wrapper">
                        <Input value={pairingString} readOnly={true} />
                        <Button onClick={() => onClickCopyPairingStr()}><UilCopy/></Button>
                    </Row>
                    <p className="modal-mini-title">PAIR WITH QR CODE</p>
                    <QRCode value="aaabbbccc" />
                </div>
            }
            {
                connectedAccount &&
                <div className="hashpack-connect-wrapper">
                    <p className="modal-title">Disconnect Wallet</p>
                    <Button
                        className="hashpack-connect-btn"
                        onClick={() => onClickDisconnectHashPack()}
                        style={{ margin: "10px auto" }}>
                        Disconnect
                    </Button>
                </div>
            }
        </div>
        
        </div>
    );
}

export default HsahPackConnectModal;