import axios from "axios";
import { useRouter } from 'next/router';

export default async function deleteData(data) {
    const router = useRouter();

    axios.delete(`/api/delete/${data.row.data._id}`)
        .then(router.reload(window.location.pathname));
}
