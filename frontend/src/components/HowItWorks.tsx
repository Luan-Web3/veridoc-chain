import { FaUpload, FaMoneyBillWave, FaCheckCircle } from 'react-icons/fa';

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-600">Como Funciona</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <FaUpload className="text-4xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-4 text-gray-700">1. Upload do Documento</h3>
            <p className="text-gray-500">Faça o upload do documento que deseja registrar.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <FaMoneyBillWave className="text-4xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-4 text-gray-700">2. Pagamento</h3>
            <p className="text-gray-500">Realize o pagamento para registrar o documento.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <FaCheckCircle className="text-4xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-4 text-gray-700">3. Confirmação</h3>
            <p className="text-gray-500">Receba a confirmação do registro na blockchain.</p>
          </div>
        </div>
      </div>
    </section>
  );
}