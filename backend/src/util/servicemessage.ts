import { ListaMensagem } from '../beans/mensagemretorno/listamensagem';
import { Mensagem } from '../beans/mensagemretorno/mensagem';
import { ServiceMessageType } from '../beans/mensagemretorno/servicemessagetype';


export class ServiceMessageUtil {

    public static mountServiceMessage(codigoRetorno?: number, codigo?: number, mensagem?: string): ServiceMessageType {
        let serviceMessage: ServiceMessageType = new ServiceMessageType();
        serviceMessage.codigoRetorno = (codigoRetorno? codigoRetorno : 0);

        const listaMensagem = new ListaMensagem();
        listaMensagem.mensagem = new Array();

        let mensagemRetorno: Mensagem = new Mensagem();
        mensagemRetorno.codigo = (codigo? codigo : 0);
        mensagemRetorno.mensagem = (mensagem? mensagem : 'Sucesso');
        listaMensagem.mensagem.push(mensagemRetorno);

        serviceMessage.serviceMessage = listaMensagem;
        return serviceMessage;
    }

}