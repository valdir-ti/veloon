import { useEffect, useState } from 'react'
import { BsTrash3Fill, BsCheckCircleFill, BsFileExcelFill } from 'react-icons/bs'
import { ToastContainer, toast } from 'react-toastify'

import { THistorico } from '../types/historico'
import Pagination from '../components/Pagination'
import { API_URL } from '../utils/apiUrl'
import { useAuthCheck } from '../hooks/useAuthCheck'
import ConfirmationDialog from '../components/ConfirmationDialog'

function History() {
    useAuthCheck()
    const token = localStorage.getItem('authToken')
    const [loading, setLoading] = useState(false)
    const [history, setHistory] = useState<THistorico[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [itemToDelete, setItemToDelete] = useState<string | null>(null)
    const itemsPerPage = 5

    const handleDelete = async (id: string) => {
        setItemToDelete(id)
        setIsDeleteDialogOpen(true)
    }

    const notify = () => toast('Item excluido com sucesso!')

    const confirmDelete = async () => {
        if (!itemToDelete) return

        try {
            const response = await fetch(`${API_URL}/historico/${itemToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao excluir item')
            }

            setHistory((prevData) => prevData.filter((item) => item.id !== itemToDelete))
            notify()
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${API_URL}/historico`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                })
                const historyData = await response.json()
                setHistory(historyData)
                setLoading(false)
            } catch (error) {
                console.error(error)
                setLoading(false)
            }
        }

        fetchData()
    }, [token])

    const totalPages = Math.ceil(history.length / itemsPerPage)
    const currentData = Array.isArray(history)
        ? history.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        : [];

    return <main className='flex flex-1 flex-col items-center px-6 md:px-0'>
        <h1 className='text-4xl font-bold mb-8'>Historico Pessoal de verificações</h1>
        <h4 className='text-1xl font-bold'>Listagem das verificações realizadas</h4>
        {loading ? (
            <div className='text-lg font-medium to-gray-700'>Loading...</div>
        ) :
            <>
                <div className='w-full max-w-4xl rounded-lg shadow-lg p-2'>
                    <div className='overflow-x-auto'>
                        <table className='table-auto w-full border-collapse border-gray-200'>
                            <thead>
                                <tr className='bg-gray-50 text-black'>
                                    <th className='border border-gray-300 px-4 py-2 text-left'>ID</th>
                                    <th className='border border-gray-300 px-4 py-2 text-left'>Número 1</th>
                                    <th className='border border-gray-300 px-4 py-2 text-left'>Número 2</th>
                                    <th className='border border-gray-300 px-4 py-2 text-left'>Resultado</th>
                                    <th className='border border-gray-300 px-4 py-2 text-left'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.map((item) => {
                                    return (
                                        <tr key={item.id} className='hover:bg-red-50'>
                                            <td className='border border-gray-300 px-4 py-2'>{item.id}</td>
                                            <td className='border border-gray-300 px-4 py-2'>{item.numero1}</td>
                                            <td className='border border-gray-300 px-4 py-2'>{item.numero2}</td>
                                            <td className='border border-gray-300 px-4 py-2'>{item.resultado ? <BsCheckCircleFill className='text-green-500 block mx-auto' size={22} /> : <BsFileExcelFill className='text-red-500 block mx-auto' size={22} />}</td>
                                            <td className='border border-gray-300 px-4 py-2 text-center'>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    <BsTrash3Fill className='block mx-auto cursor-pointer' />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setPage={setCurrentPage}
                />
            </>
        }
        <ConfirmationDialog
            isOpen={isDeleteDialogOpen}
            setIsOpen={setIsDeleteDialogOpen}
            onConfirm={confirmDelete}
            title='Excluir registro'
            message='Tem certeza que deseja excluir este registro? Esta ação não pode ser desfeita.'
        />
        <ToastContainer />
    </main>
}

export default History
