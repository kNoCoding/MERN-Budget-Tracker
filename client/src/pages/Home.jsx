import AuthForm from "../components/AuthForm.jsx"

function Home() {
    return (
        <main className="container">
            <p className="special-coin">🪙</p>
            <h1>Money Tracker App</h1>
            <AuthForm />
        </main>
    )
}

export default Home