import { useRootExports } from 'umi';
import Link from 'umi/link';
import axios from 'axios'
console.log(axios === window.axios)
export default function() {
  const rootExports = useRootExports();
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
