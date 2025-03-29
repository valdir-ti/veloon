import { useEffect, useState } from "react"
import { BsTrash3Fill, BsCheckCircleFill, BsFileExcelFill } from "react-icons/bs";

import { THistorico } from "../types/historico"
import Pagination from "../components/Pagination";

const historyData = [
    {
        id: '2123234234',
        numero1: 21211233,
        numero2: 43442323,
        resultado: false,
        timestamp: new Date
    },
    {
        id: '21232342333',
        numero1: 21211233,
        numero2: 43442323,
        resultado: false,
        timestamp: new Date
    },
    {
        id: '2123222224',
        numero1: 21211233,
        numero2: 43442323,
        resultado: false,
        timestamp: new Date
    },
    {
        id: '2123234000',
        numero1: 21211233,
        numero2: 21211233,
        resultado: true,
        timestamp: new Date
    },
    {
        id: '44423234234',
        numero1: 21211255,
        numero2: 43442300,
        resultado: false,
        timestamp: new Date
    },
    {
        id: '8883234231',
        numero1: 43442323,
        numero2: 43442323,
        resultado: true,
        timestamp: new Date
    },
    {
        id: '8883234232',
        numero1: 43442323,
        numero2: 43442321,
        resultado: false,
        timestamp: new Date
    },
    {
        id: '8883234233',
        numero1: 43442323,
        numero2: 43442323,
        resultado: true,
        timestamp: new Date
    },
    {
        id: '8883234235',
        numero1: 43442323,
        numero2: 43442322,
        resultado: false,
        timestamp: new Date
    }
]

function History() {

    const [loading, setLoading] = useState(false)
    const [history, setHistory] = useState<THistorico[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm("Deseja realmente excluir esse registro?")
        if (!confirmDelete) return

        try {
            const response = await fetch(`/api/historico/${id}]`, {
                method: 'DELETE'
            })

            if (!response.ok) {
                throw new Error("Erro ao excluir item")
            }

            alert("Item excluído com sucesso")
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        // Make an api call and fill the setHistory variable
        const fetchData = async () => {
            setLoading(true)
            try {
                setHistory(historyData)
                setLoading(false)
            } catch (error) {
                console.error(error)
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const totalPages = Math.ceil(history.length / itemsPerPage)
    const currentData = history.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    return <main className="flex flex-1 flex-col items-center p-5">
        <h1 className="text-4xl font-bold mb-8">Historico Pessoal de verificações</h1>
        <h4 className="text-1xl font-bold">Listagem das verificações realizadas</h4>
        {loading ? (
            <div className="text-lg font-medium to-gray-700">Loading...</div>
        ) :
            <>
                <div className="w-full max-w-4xl rounded-lg shadow-lg p-5">
                    <table className="table-auto w-full border-collapse border-gray-200">
                        <thead>
                            <tr className="bg-gray-50 text-black">
                                <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Número 1</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Número 2</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Resultado</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((item) => {
                                return (
                                    <tr key={item.id} className="hover:bg-red-50">
                                        <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                                        <td className="border border-gray-300 px-4 py-2">{item.numero1}</td>
                                        <td className="border border-gray-300 px-4 py-2">{item.numero2}</td>
                                        <td className="border border-gray-300 px-4 py-2">{item.resultado ? <BsCheckCircleFill className="text-green-500 block mx-auto" size={22} /> : <BsFileExcelFill className="text-red-500 block mx-auto" size={22} />}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                <BsTrash3Fill className="block mx-auto cursor-pointer" />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setPage={setCurrentPage}
                />
            </>
        }
    </main>
}

export default History
