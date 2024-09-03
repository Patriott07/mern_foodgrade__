export const getUsers = async () : Promise<any[]> => {
    try {
        const res = await fetch("http://localhost:5072/getUsers");
        const data = await res.json();

        return data.users;
    } catch (error) {
        console.log(error)
        return [];
    }
}