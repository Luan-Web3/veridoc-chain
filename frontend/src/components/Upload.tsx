import { uploadFile, processPayment } from '@/pages/api';
import { useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { CgCreditCard } from 'react-icons/cg';
import { FaCloudUploadAlt, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function UploadSection() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');
  const [documentId, setDocumentId] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      const formData = new FormData();
      formData.append('file', selectedFile);

      console.log('File selected:', selectedFile.name);

      const form = e.target.form;
      toast.success('Arquivo carregado com sucesso!');

      if (form) {
        form.dispatchEvent(new Event('submit', { cancelable: true }));
      }
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setStatus('Enviando...');
    console.log(formData);

    try {
      const response = await uploadFile('/upload', formData);
      const data = await response.json();

      setDocumentId(data.id); // API deve retornar um ID do documento uploadado
      setStatus(data.message);

      toast.success('Arquivo enviado com sucesso!');

    } catch (error) {
      toast.error('Erro ao enviar arquivo');
      console.error(error);
    }
  };

  const handlePayment = async () => {
    if (!file) {
      toast.error('Documento não encontrado');
      return;
    }

    setIsProcessing(true);
    try {
      if (documentId !== null) {
        await processPayment(documentId);

        toast.success('Pagamento processado com sucesso!');

        setStatus('Pagamento confirmado');
      } else {
        toast.error('ID do documento não encontrado');
      }
    } catch (error) {
      toast.error('Erro ao processar pagamento');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section id="upload" className="py-10">
      <div className="container w-96 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Enviar Documento</h2>
        <form onSubmit={handleUpload} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-white rounded-lg cursor-pointer hover:bg-transparent transition duration-300">
              {!file ? <FaCloudUploadAlt className="text-4xl text-white mr-4" /> : <BiCheck className="text-4xl text-green-400 mr-4" />}
              <span className="text-white font-semibold">
                {!file ? "Selecione um arquivo" : `Arquivo: ${file.name}`}
              </span>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                required
                accept=".pdf,.doc,.docx,.txt"
              />
            </label>
          </div>
          {file && (
            <button
              type="button"
              onClick={handlePayment}
              disabled={isProcessing}
              className="mt-10 w-full flex items-center justify-center gap-2 bg-amber-400 text-gray-950 font-semibold py-3 rounded-lg hover:bg-amber-500 hover:text-gray-950 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <CgCreditCard />
                  Proceder para pagamento
                </>
              )}
            </button>
          )}
          {status && <p className="mt-4 text-center text-white">{status}</p>}
        </form>
      </div>
    </section>
  );
}