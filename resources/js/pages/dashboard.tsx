import {Link} from "@inertiajs/react";
import {logout} from "@/routes";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link href={logout()}>Logout</Link>
    </div>
  )
}
