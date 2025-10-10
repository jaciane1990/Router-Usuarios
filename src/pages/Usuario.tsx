import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

function Usuario() {
  const { id } = useParams()
  const [usuario, setUsuario] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`https://fakestoreapi.com/users/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Usuário não encontrado')
        }
        return res.json()
      })
      .then(data => {
        setUsuario(data)
        setError(null)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p>Carregando usuário...</p>
  if (error) return <p>Erro: {error}</p>

  return (
    <div>
      <h1>Usuário ID: {usuario.id}</h1>
      <p>Nome: {usuario.name.firstname} {usuario.name.lastname}</p>
      <p>Username: {usuario.username}</p>
      <p>Email: {usuario.email}</p>
      {/* Aqui você pode mostrar mais informações que quiser */}
    </div>
  )
}

export default Usuario
