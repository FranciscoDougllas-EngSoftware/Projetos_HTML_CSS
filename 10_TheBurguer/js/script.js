document.addEventListener('DOMContentLoaded', () => {
    // Menu Hambúrguer
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu ul');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });

    // Modal e Formulário
    const modal = document.getElementById('order-modal');
    const closeModal = document.querySelector('.close-modal');
    const orderButtons = document.querySelectorAll('.btn:not(.submit-btn)');
    const orderForm = document.getElementById('order-form');
    const itemNameInput = document.getElementById('item-name');
    const itemPriceInput = document.getElementById('item-price');

    // Abrir Modal ao clicar nos botões de pedido
    orderButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const item = button.getAttribute('data-item');
            const price = button.getAttribute('data-price');

            if (item && price) {
                itemNameInput.value = item;
                itemPriceInput.value = `R$ ${price}`;
                modal.style.display = 'flex';
                console.log('Modal aberto para:', item, price);
            } else {
                console.error('Botão sem data-item ou data-price:', button);
            }
        });
    });

    // Fechar Modal ao clicar no 'X'
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Fechar Modal ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Enviar Pedido ao WhatsApp
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Formulário submetido');

        const item = itemNameInput.value;
        const priceString = itemPriceInput.value.replace('R$ ', '');
        const price = parseFloat(priceString.replace(',', '.'));
        const quantity = parseInt(document.getElementById('quantity').value);
        const customerName = document.getElementById('customer-name').value;
        let customerPhone = document.getElementById('customer-phone').value;
        const notes = document.getElementById('notes').value;

        // Remove caracteres não numéricos do telefone do usuário
        customerPhone = customerPhone.replace(/\D/g, '');
        // Adiciona o código do país (55 para Brasil) se não estiver presente
        if (!customerPhone.startsWith('55')) {
            customerPhone = '55' + customerPhone;
        }

        // Verifica se todos os campos obrigatórios estão preenchidos
        if (!item || isNaN(price) || !quantity || !customerName || !customerPhone) {
            console.error('Campos inválidos:', { item, price, quantity, customerName, customerPhone });
            alert('Por favor, preencha todos os campos obrigatórios corretamente.');
            return;
        }

        // Calcula o total
        const total = (price * quantity).toFixed(2).replace('.', ',');
        console.log('Total calculado:', total);

        // Monta a mensagem
        const senderNumber = "5586981625526"; // Seu número como remetente
        const message = `Novo Pedido - TheBurguer\n\n` +
                        `De: TheBurguer (${senderNumber})\n` +
                        `Para: ${customerName} (${customerPhone})\n\n` +
                        `Item: ${item}\n` +
                        `Quantidade: ${quantity}\n` +
                        `Preço Total: R$ ${total}\n` +
                        `Observações: ${notes || 'Nenhuma'}\n\n` +
                        `Seu pedido foi recebido! Em breve, você receberá uma confirmação de ${senderNumber}.`;

        console.log('Mensagem:', message);

        // Número de destino (telefone do usuário)
        const whatsappNumber = customerPhone; // O número do usuário como destinatário
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        console.log('URL gerada:', whatsappURL);

        // Tenta abrir o WhatsApp
        try {
            const newWindow = window.open(whatsappURL, '_blank');
            if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                throw new Error('Bloqueio de pop-up detectado');
            }
            console.log('WhatsApp aberto com sucesso');
        } catch (error) {
            console.error('Erro ao abrir WhatsApp:', error);
            alert('Não foi possível abrir o WhatsApp. Verifique se pop-ups estão permitidos ou copie este link manualmente:\n' + whatsappURL);
            return;
        }

        // Fecha o modal e reseta o formulário
        modal.style.display = 'none';
        orderForm.reset();
    });
});