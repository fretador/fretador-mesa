const bancosBrasileiros = [
  "Banco do Brasil",
  "Caixa Econômica Federal",
  "Bradesco",
  "Itaú Unibanco",
  "Santander",
  "Nubank",
  "Inter",
  "Banco Original",
  "Banco Pan",
  "BTG Pactual",
  "Banco Safra",
  "Banco C6",
  "Banco BS2",
  "Banco Neon",
  "Banco Next",
];

function selecionarBancoAleatorio(): string {
  const indiceAleatorio = Math.floor(Math.random() * bancosBrasileiros.length);
  return bancosBrasileiros[indiceAleatorio];
}

export function gerarDadosBancarios(cpf: string): {
  agencia: string;
  conta: string;
  banco: string;
} {
  const cpfLimpo = cpf.replace(/\D/g, "");

  const agencia = cpfLimpo.slice(0, 4).padStart(4, "0");

  const contaSemDigito = cpfLimpo.slice(4, 12).padStart(8, "0");
  const digitoVerificador = (parseInt(contaSemDigito) % 9).toString();
  const conta = `${contaSemDigito}-${digitoVerificador}`;

  const banco = selecionarBancoAleatorio();

  return { agencia, conta, banco };
}
