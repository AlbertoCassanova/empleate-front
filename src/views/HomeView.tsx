import CreatePost from "../components/home/CreatePost";

const HomeView = (): JSX.Element => {
    document.title = "Inicio";
    return (
        <div className="p-2">
            <CreatePost />
        </div>
    )
}

export default HomeView