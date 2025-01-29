import Link from 'next/link';
import { FaBitcoin } from 'react-icons/fa';

const CallToAction = () => {
  return (
    <section className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-4xl font-bold mb-4">Pronto para proteger sua criação?</h2>
          <p className="text-xl">Registre sua propriedade intelectual com a tecnologia blockchain.</p>
        </div>
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <Link href="#upload">
            <span className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold 
                      hover:bg-opacity-90 transition duration-300 flex items-center justify-center gap-2">
              <FaBitcoin /> Registrar Documento
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
