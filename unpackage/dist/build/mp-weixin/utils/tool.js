"use strict";exports.timestampFormat=e=>{if(null==e)return;let t=new Date(1e3*e),l=t.getFullYear(),r=t.getMonth()+1;r=r<10?"0"+r:r;let n=t.getDate();n=n<10?"0"+n:n;let s=t.getHours();s=s<10?"0"+s:s;let u=t.getMinutes();u=u<10?"0"+u:u;let g=t.getSeconds();return g=g<10?"0"+g:g,l+"-"+r+"-"+n+" "+s+":"+u+":"+g};
