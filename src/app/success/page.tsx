import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center text-center max-w-lg w-full gap-4">
        {/* ICON */}
        <CheckCircle className="text-green-600" size={80} />

        {/* TITLE */}
        <h1 className="text-2xl md:text-3xl font-bold text-green-700">
          Pagamento confirmado!
        </h1>

        {/* SUBTITLE */}
        <p className="text-gray-600">Seu pedido foi realizado com sucesso.</p>

        {/* DESCRIPTION */}
        <p className="text-gray-500 text-sm md:text-base">
          Estamos preparando tudo para envio e você receberá atualizações em
          breve.
        </p>

        <p className="text-gray-500 text-sm md:text-base">
          Você pode acompanhar o status do seu pedido na sua conta.
        </p>

        {/* ACTIONS */}
        <div className="flex gap-3 mt-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
            Ver pedido
          </button>

          <button className="border px-4 py-2 rounded hover:bg-gray-100 transition">
            Continuar comprando
          </button>
        </div>
      </div>
    </div>
  );
}
