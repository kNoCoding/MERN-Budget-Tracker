import AuthForm from "../components/AuthForm.jsx"

function Home() {
    return (
        <>
            <div>
                <h1>Welcome to my Money Tracker App! 🤩</h1>
                <p>Track your expenses and manage your budget on the go.</p>
            </div>

            <AuthForm />
        </>
    )
}

export default Home