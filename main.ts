import{readFileSync,readdirSync,mkdirSync,writeFileSync}from'node:fs'
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output'
for(const d of readdirSync(I).sort()){
const P=readFileSync(I+'/'+d+'/program.bin'),N=readFileSync(I+'/'+d+'/input.bin'),n=P.length
const D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(65536)
let s=0,c=0,l=0,g=0,t=0,p=0,e=0
L:for(;;){
if(t==1e6){e=10;break L}
if(p<0||p>=n){e=9;break L}
const k=P[p]
if(!(k<8||(k>15&&k<35)||(k>47&&k<53)||k==64||k==65||(k>79&&k<84))){e=5;break L}
const m=k==1?1:k==2?4:k>47&&k<52?2:0
if(p+m>=n){e=9;break L}
t++
const y=p+1+m
let q=0,w=0
if(k<8){q=[0,0,0,1,1,2,2,3][k];w=[0,1,1,0,2,2,3,3][k]}
else if(k==23||k==27||k==64){q=1;w=1}
else if(k==82)w=1
else if(k==65)q=2
else if(k==49||k==50||k==80||k==81||k==83)q=1
else if(k==0||k==48||k==51||k==52){}
else{q=2;w=1}
if(s<q){e=2;break L}
if(s-q+w>256){e=3;break L}
p=y
switch(k){
case 0:break L
case 1:D[s++]=(P[y-1]<<24)>>24;break
case 2:D[s++]=P[y-4]|P[y-3]<<8|P[y-2]<<16|P[y-1]<<24;break
case 3:s--;break
case 4:D[s]=D[s-1];s++;break
case 5:{const a=D[s-1];D[s-1]=D[s-2];D[s-2]=a;break}
case 6:D[s]=D[s-2];s++;break
case 7:{const a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;break}
case 23:D[s-1]=-D[s-1]|0;break
case 27:D[s-1]=~D[s-1];break
case 48:case 49:case 50:{const r=((P[y-2]|P[y-1]<<8)<<16)>>16,v=k==48?0:D[--s];if(k==48||(k==49)==(v==0))p=y+r;break}
case 51:if(c==64){e=7;break L}C[c++]=y;p=P[y-2]|P[y-1]<<8;break
case 52:if(c==0){e=8;break L}p=C[--c];break
case 64:{const a=D[s-1];if(a<0||a>255){e=6;break L}D[s-1]=M[a];break}
case 65:{const a=D[s-1];if(a<0||a>255){e=6;break L}s-=2;M[a]=D[s];break}
case 80:{const B=Buffer.from(String(D[s-1]));if(l+B.length>65536){e=11;break L}s--;o.set(B,l);l+=B.length;break}
case 81:if(l+1>65536){e=11;break L}o[l++]=D[--s]&255;break
case 82:D[s++]=g<N.length?N[g++]:-1;break
case 83:e=D[--s]&255;break L
default:{const b=D[s-1],a=D[s-2];let r=0
switch(k){
case 16:r=a+b|0;break
case 17:r=a-b|0;break
case 18:r=Math.imul(a,b);break
case 19:if(!b){e=4;break L}r=(a/b)|0;break
case 20:if(!b){e=4;break L}r=a%b|0;break
case 21:if(!b){e=4;break L}r=Math.floor((a>>>0)/(b>>>0))|0;break
case 22:if(!b){e=4;break L}r=(a>>>0)%(b>>>0)|0;break
case 24:r=a&b;break
case 25:r=a|b;break
case 26:r=a^b;break
case 28:r=a<<(b&31);break
case 29:r=a>>(b&31);break
case 30:r=a>>>(b&31)|0;break
case 32:r=a==b?1:0;break
case 33:r=a<b?1:0;break
case 34:r=(a>>>0)<(b>>>0)?1:0;break
}
s-=2;D[s++]=r}
}
}
mkdirSync(O+'/'+d,{recursive:true})
writeFileSync(O+'/'+d+'/stdout.bin',o.subarray(0,l))
writeFileSync(O+'/'+d+'/exit.txt',e+'\n')
}
