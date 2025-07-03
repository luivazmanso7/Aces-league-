
/**
 * Utility functions for WhatsApp integration
 */

// Número do WhatsApp da ACES LEAGUE (substitua pelo número real)
export const WHATSAPP_NUMBER = '558181991106942'; // Formato: código do país + DDD + número (Recife, PE)

/**
 * Gera um link do WhatsApp com mensagem pré-formatada
 * @param phoneNumber - Número do WhatsApp (incluindo código do país)
 * @param message - Mensagem pré-formatada
 * @returns URL do WhatsApp
 */
export const generateWhatsAppLink = (phoneNumber: string, message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

/**
 * Abre o WhatsApp para inscrição em torneio
 * @param tournamentName - Nome do torneio (opcional)
 */
export const openWhatsAppForTournament = (tournamentName?: string): void => {
  const message = tournamentName 
    ? `Olá! Gostaria de me inscrever no torneio "${tournamentName}" da ACES LEAGUE. 



Aguardo retorno!`
    : `Olá! Gostaria de me inscrever no próximo torneio da ACES LEAGUE.

Poderiam me fornecer mais informações sobre:
• Próximas datas disponíveis
• Local dos eventos
• Buy-in e estrutura dos torneios
• Como funciona o processo de inscrição

Muito obrigado!`;
  
  const whatsappUrl = generateWhatsAppLink(WHATSAPP_NUMBER, message);
  window.open(whatsappUrl, '_blank');
};

/**
 * Abre o WhatsApp para informações gerais
 */
export const openWhatsAppForInfo = (): void => {
  const message = `Olá! Gostaria de obter mais informações sobre a ACES LEAGUE e como participar dos torneios.`;
  const whatsappUrl = generateWhatsAppLink(WHATSAPP_NUMBER, message);
  window.open(whatsappUrl, '_blank');
};

/**
 * Abre o WhatsApp para suporte
 */
export const openWhatsAppForSupport = (): void => {
  const message = `Olá! Preciso de suporte relacionado à ACES LEAGUE. Poderiam me ajudar?`;
  const whatsappUrl = generateWhatsAppLink(WHATSAPP_NUMBER, message);
  window.open(whatsappUrl, '_blank');
};
