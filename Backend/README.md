# Techbox Systems - Backend VOEC

## Descrição

Este é o backend do sistema **Techbox Systems - VOEC**, desenvolvido em Node.js. O projeto foi projetado para rodar com **Node 16** obrigatoriamente e utiliza **Yarn** como gerenciador de dependências. Este projeto é responsável pelo backend da aplicação e deve ser instalado como um serviço no Windows.

## Pré-requisitos

- **Node.js** versão 16.x (não compatível com versões anteriores ou posteriores)
- **Yarn** como gerenciador de dependências
- **Windows** para rodar o serviço localmente ou na máquina de produção

## Comandos

- **Instalar dependências:**

  ```bash
  yarn
  ```

- **Rodar o ambiente de desenvolvimento:**

  ```bash
  yarn run dev
  ```

- **Gerar o pacote do backend para produção:**
  ```bash
  yarn run build
  ```

## Renomear Pasta de Distribuição

Após gerar o pacote, é necessário renomear a pasta `dist` para `dist-backend`:

```bash
mv dist dist-backend
```

## Configuração do Serviço no Windows

### Passos para Configuração/Atualização do Serviço

1. **Abrir o Gerenciador de Serviços**:
   - No menu iniciar, pesquisar por `services.msc` ou `Serviços` e abrir o gerenciador de serviços do Windows.
2. **Anotar as configurações do serviço existente (se aplicável)**:

   - Localize o serviço **Techbox Systems - Backend VOEC** e anote suas configurações.

3. **Atualização de Versão**:

   - Caso seja uma atualização, pare o serviço **Techbox Systems - Backend VOEC**.
   - Execute o comando abaixo para remover a versão anterior:
     ```bash
     node uninstall.js
     ```

4. **Mover a pasta do backend**:

   - Faça backup da versão anterior, principalmente do banco de dados em `C:/Arquivos de Programas/Techbox Systems/VOEC/Backend/dist-backend/src/database/db.sqlite`.
   - Mova a pasta `dist-backend` gerada para a máquina do cliente, no caminho `C:/Arquivos de Programas/Techbox Systems/VOEC/Backend`.

5. **Instalar o novo serviço**:

   - Na pasta onde o backend foi movido, rode o comando para instalação do serviço:
     ```bash
     node install.js
     ```

6. **Configurar o Serviço no Windows**:

   - Abra as propriedades do serviço **Techbox Systems - Backend VOEC** e ajuste as seguintes configurações:

     - **Aba Geral**:

       - Tipo de Inicialização: **Automático (Atraso na Inicialização)**

     - **Aba Recuperação**:
       - Primeira Falha: **Reiniciar o Serviço**
       - Segunda Falha: **Reiniciar o Serviço**
       - Falhas Posteriores: **Reiniciar o Serviço**
       - Reiniciar o Serviço após: **3 minutos**

7. **Aplicar as configurações**:
   - Após configurar, clique em **Aplicar** e depois em **OK**.

---

## Notas

- Sempre certifique-se de que o serviço **Techbox Systems - Backend VOEC** está parado antes de realizar atualizações.
- Utilize os comandos corretamente para garantir que o serviço funcione conforme o esperado.
