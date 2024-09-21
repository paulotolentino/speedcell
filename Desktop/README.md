# Techbox Systems - Aplicação Desktop VOEC

## Descrição

Esta é a aplicação desktop do sistema **Techbox Systems - VOEC**, desenvolvida com **Electron.js**. A aplicação foi projetada para rodar com **Node 16** obrigatoriamente e utiliza **Yarn** como gerenciador de dependências.

## Pré-requisitos

- **Node.js** versão 16.x (não compatível com versões anteriores ou posteriores)
- **Yarn** como gerenciador de dependências
- **Windows** como ambiente de execução

## Comandos

- **Instalar dependências:**

  ```bash
  yarn
  ```

- **Rodar o ambiente de desenvolvimento:**

  ```bash
  yarn run dev
  ```

- **Gerar o pacote da aplicação desktop:**
  ```bash
  yarn run package
  ```

## Instalação na Máquina do Cliente

Após gerar o pacote com `yarn run package`, siga os passos abaixo para instalar e configurar a aplicação na máquina do cliente:

1. **Copiar os arquivos da aplicação**:

   - Copie todo o conteúdo gerado para a máquina do cliente. Geralmente, o pacote estará na pasta `dist/` ou em uma pasta gerada pelo Electron após o comando de `package`.

2. **Copiar a pasta `/build/static`**:

   - A pasta `/build/static` deve ser copiada para o diretório `C:/` do cliente. Este diretório pode ser necessário para armazenar arquivos estáticos utilizados pela aplicação.

3. **Criar Atalhos**:

   - Crie um atalho da aplicação na **Área de Trabalho** do cliente.
   - Adicione o atalho também no **Menu Iniciar** para facilitar o acesso do usuário.

4. **Testar a Aplicação**:
   - Após configurar os atalhos, execute a aplicação na máquina do cliente para garantir que tudo está funcionando corretamente.

---

## Notas

- Certifique-se de que a versão do **Node.js** na máquina do cliente seja exatamente a versão 16.x, pois o funcionamento da aplicação depende dessa versão.
- Teste a aplicação após configurar os atalhos e verificar que os arquivos foram copiados corretamente.
