import {Link} from "@inertiajs/react";
import {logout} from "@/routes";
import AppLayout from "@/layouts/app-layout";

export default function Dashboard() {
  return (
    <AppLayout title="Dashboard">
      <Link href={logout()}>Logout</Link>
    </AppLayout>
  )
}
