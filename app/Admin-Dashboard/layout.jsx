import Sidebar from "../Admin-Ui/Dashboard/Sidebar/page";
import Navbar from "../Admin-Ui/Dashboard/Navbar/page";
import styles  from'../Admin-Ui/Dashboard/Dashboard.module.css';
export default function layout({ children }) {
  return(
<div className={styles.container}>
    <div className={styles.menu}>
        <Sidebar/>
    </div>
    <div className={styles.content}>
        <Navbar/>
        {children}
    </div>
</div>
  )
}