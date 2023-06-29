import axios from 'axios';
import QRCode from 'qrcode.react';
import React from 'react'

interface ICompra {
    nomeComprador: string;
    cpfComprador: string;
    dataCompra: Date;
    itens: string[];
}

interface IVoucherResponse {
    tokenJWT: string;
}

interface IScanQrCodeProps {
    idCompra: string;
}

function ScanQrCode({ idCompra }: IScanQrCodeProps) {
    const [tokenJWT, setTokenJWT] = React.useState<any>('');

    async function salvarCompra(compra: ICompra) {
        try {
            const response = await axios.post<ICompra>('URL_DO_BACKEND/compras', compra);
            // Lógica adicional após salvar a compra
            console.log('Compra salva com sucesso!', response.data);
        } catch (error) {
            console.error('Erro ao salvar a compra:', error);
        }
    }

    async function gerarVoucher(idCompra: string) {
        try {
            const response = await axios.post<IVoucherResponse>(
                `URL_DO_BACKEND/compras/${idCompra}/voucher`
            );
            const { tokenJWT } = response.data;
            // Lógica adicional após gerar o voucher
            console.log('Voucher gerado:', tokenJWT);
            setTokenJWT(tokenJWT);
        } catch (error) {
            console.error('Erro ao gerar o voucher:', error);
        }
    }

    function exibirQRCode(tokenJWT: string) {
        // Lógica adicional para exibir o QR Code
        return <QRCode value={tokenJWT} />;
    }

    return (
        <div>
            <button onClick={() => salvarCompra({ nomeComprador: 'Nome', cpfComprador: '123', dataCompra: new Date(), itens: ['item1', 'item2'] })}>
                Salvar Compra
            </button>
            <button onClick={() => gerarVoucher(idCompra)}>
                Gerar Voucher
            </button>
            {tokenJWT && exibirQRCode(tokenJWT)}
        </div>
    );
}

export default ScanQrCode;