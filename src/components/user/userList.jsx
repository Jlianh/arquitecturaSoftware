export default function UserList(){
    return(
        <table>
            <thead>
                <tr>
                    <th>Identification</th>
                    <th>Name</th>
                    <th>LastName</th>
                    <th>Email</th>
                    <th>Avatar</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>2131231</td>
                    <td>Juan</td>
                    <td>Perez</td>
                    <td>juan@email.com</td>
                    <td><img src="https://hips.hearstapps.com/hmg-prod/images/singer-elvis-presley-news-photo-1590531497.jpg" style={{
                        width: 90, height: 90
                    }}/></td>
                </tr>
            </tbody>
        </table>
    )
}