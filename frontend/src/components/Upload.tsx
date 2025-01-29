import { uploadFile } from '@/pages/api';
import { useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { CgCreditCard } from 'react-icons/cg';
import { FaCloudUploadAlt } from 'react-icons/fa';

export default function UploadSection() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');

  // Novo handler para o input file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Criar e enviar o FormData automaticamente quando o arquivo é selecionado
      const formData = new FormData();
      formData.append('file', selectedFile);
      console.log('File selected:', selectedFile.name);
      console.log('FormData entries:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      
      // Chama handleUpload automaticamente
      const form = e.target.form;
      if (form) {
        form.dispatchEvent(new Event('submit', { cancelable: true }));
      }
    }
  };

  // Seu handleUpload original permanece inalterado
  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setStatus('Enviando...');
    console.log(formData);

    const response = await uploadFile('/upload', formData);
    const data = await response.json();
    
    setStatus(data.message);
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
          {status && <p className="mt-4 text-center text-white">{status}</p>}
        </form>
      </div>
    </section>
  );
}