(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Hr="170",qh=0,mc=1,Yh=2,ql=1,Yl=2,Yn=3,_i=0,Kt=1,At=2,gi=0,hs=1,gc=2,vc=3,yc=4,Zh=5,Ii=100,$h=101,jh=102,Kh=103,Jh=104,Qh=200,ed=201,td=202,nd=203,$a=204,ja=205,id=206,sd=207,od=208,ad=209,rd=210,cd=211,ld=212,hd=213,dd=214,Ka=0,Ja=1,Qa=2,ps=3,er=4,tr=5,nr=6,ir=7,Zl=0,ud=1,fd=2,vi=0,pd=1,md=2,gd=3,$l=4,vd=5,yd=6,_d=7,jl=300,ms=301,gs=302,sr=303,or=304,na=306,Gt=1e3,mi=1001,ar=1002,En=1003,Sd=1004,ho=1005,Dn=1006,ha=1007,Di=1008,ni=1009,Kl=1010,Jl=1011,js=1012,Wr=1013,zi=1014,Kn=1015,no=1016,Xr=1017,qr=1018,vs=1020,Ql=35902,eh=1021,th=1022,Tn=1023,nh=1024,ih=1025,ds=1026,ys=1027,sh=1028,Yr=1029,oh=1030,Zr=1031,$r=1033,Wo=33776,Xo=33777,qo=33778,Yo=33779,rr=35840,cr=35841,lr=35842,hr=35843,dr=36196,ur=37492,fr=37496,pr=37808,mr=37809,gr=37810,vr=37811,yr=37812,_r=37813,Sr=37814,xr=37815,Mr=37816,br=37817,wr=37818,Tr=37819,Er=37820,Ar=37821,Zo=36492,Cr=36494,Pr=36495,ah=36283,Rr=36284,Ir=36285,Lr=36286,xd=3200,Md=3201,rh=0,bd=1,pi="",et="srgb",Ss="srgb-linear",ia="linear",ft="srgb",Fi=7680,_c=519,wd=512,Td=513,Ed=514,ch=515,Ad=516,Cd=517,Pd=518,Rd=519,Dr=35044,Sc="300 es",Jn=2e3,Ko=2001;class xs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const o=s.indexOf(t);o!==-1&&s.splice(o,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let o=0,r=s.length;o<r;o++)s[o].call(this,e);e.target=null}}}const Ht=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let xc=1234567;const qs=Math.PI/180,Ks=180/Math.PI;function zn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ht[i&255]+Ht[i>>8&255]+Ht[i>>16&255]+Ht[i>>24&255]+"-"+Ht[e&255]+Ht[e>>8&255]+"-"+Ht[e>>16&15|64]+Ht[e>>24&255]+"-"+Ht[t&63|128]+Ht[t>>8&255]+"-"+Ht[t>>16&255]+Ht[t>>24&255]+Ht[n&255]+Ht[n>>8&255]+Ht[n>>16&255]+Ht[n>>24&255]).toLowerCase()}function Bt(i,e,t){return Math.max(e,Math.min(t,i))}function jr(i,e){return(i%e+e)%e}function Id(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Ld(i,e,t){return i!==e?(t-i)/(e-i):0}function Ys(i,e,t){return(1-t)*i+t*e}function Dd(i,e,t,n){return Ys(i,e,1-Math.exp(-t*n))}function kd(i,e=1){return e-Math.abs(jr(i,e*2)-e)}function zd(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Ud(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Nd(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Bd(i,e){return i+Math.random()*(e-i)}function Fd(i){return i*(.5-Math.random())}function Gd(i){i!==void 0&&(xc=i);let e=xc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Od(i){return i*qs}function Vd(i){return i*Ks}function Hd(i){return(i&i-1)===0&&i!==0}function Wd(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Xd(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function qd(i,e,t,n,s){const o=Math.cos,r=Math.sin,c=o(t/2),l=r(t/2),d=o((e+n)/2),h=r((e+n)/2),u=o((e-n)/2),f=r((e-n)/2),a=o((n-e)/2),p=r((n-e)/2);switch(s){case"XYX":i.set(c*h,l*u,l*f,c*d);break;case"YZY":i.set(l*f,c*h,l*u,c*d);break;case"ZXZ":i.set(l*u,l*f,c*h,c*d);break;case"XZX":i.set(c*h,l*p,l*a,c*d);break;case"YXY":i.set(l*a,c*h,l*p,c*d);break;case"ZYZ":i.set(l*p,l*a,c*h,c*d);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function wn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ut(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const ht={DEG2RAD:qs,RAD2DEG:Ks,generateUUID:zn,clamp:Bt,euclideanModulo:jr,mapLinear:Id,inverseLerp:Ld,lerp:Ys,damp:Dd,pingpong:kd,smoothstep:zd,smootherstep:Ud,randInt:Nd,randFloat:Bd,randFloatSpread:Fd,seededRandom:Gd,degToRad:Od,radToDeg:Vd,isPowerOfTwo:Hd,ceilPowerOfTwo:Wd,floorPowerOfTwo:Xd,setQuaternionFromProperEuler:qd,normalize:ut,denormalize:wn};class ge{constructor(e=0,t=0){ge.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Bt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),o=this.x-e.x,r=this.y-e.y;return this.x=o*n-r*s+e.x,this.y=o*s+r*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ke{constructor(e,t,n,s,o,r,c,l,d){Ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,o,r,c,l,d)}set(e,t,n,s,o,r,c,l,d){const h=this.elements;return h[0]=e,h[1]=s,h[2]=c,h[3]=t,h[4]=o,h[5]=l,h[6]=n,h[7]=r,h[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,o=this.elements,r=n[0],c=n[3],l=n[6],d=n[1],h=n[4],u=n[7],f=n[2],a=n[5],p=n[8],v=s[0],m=s[3],g=s[6],S=s[1],_=s[4],y=s[7],b=s[2],w=s[5],T=s[8];return o[0]=r*v+c*S+l*b,o[3]=r*m+c*_+l*w,o[6]=r*g+c*y+l*T,o[1]=d*v+h*S+u*b,o[4]=d*m+h*_+u*w,o[7]=d*g+h*y+u*T,o[2]=f*v+a*S+p*b,o[5]=f*m+a*_+p*w,o[8]=f*g+a*y+p*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],o=e[3],r=e[4],c=e[5],l=e[6],d=e[7],h=e[8];return t*r*h-t*c*d-n*o*h+n*c*l+s*o*d-s*r*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],o=e[3],r=e[4],c=e[5],l=e[6],d=e[7],h=e[8],u=h*r-c*d,f=c*l-h*o,a=d*o-r*l,p=t*u+n*f+s*a;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return e[0]=u*v,e[1]=(s*d-h*n)*v,e[2]=(c*n-s*r)*v,e[3]=f*v,e[4]=(h*t-s*l)*v,e[5]=(s*o-c*t)*v,e[6]=a*v,e[7]=(n*l-d*t)*v,e[8]=(r*t-n*o)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,o,r,c){const l=Math.cos(o),d=Math.sin(o);return this.set(n*l,n*d,-n*(l*r+d*c)+r+e,-s*d,s*l,-s*(-d*r+l*c)+c+t,0,0,1),this}scale(e,t){return this.premultiply(da.makeScale(e,t)),this}rotate(e){return this.premultiply(da.makeRotation(-e)),this}translate(e,t){return this.premultiply(da.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const da=new Ke;function lh(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Js(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Yd(){const i=Js("canvas");return i.style.display="block",i}const Mc={};function Vs(i){i in Mc||(Mc[i]=!0,console.warn(i))}function Zd(i,e,t){return new Promise(function(n,s){function o(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(o,t);break;default:n()}}setTimeout(o,t)})}function $d(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function jd(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const st={enabled:!0,workingColorSpace:Ss,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===ft&&(i.r=Qn(i.r),i.g=Qn(i.g),i.b=Qn(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===ft&&(i.r=us(i.r),i.g=us(i.g),i.b=us(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===pi?ia:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Qn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function us(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const bc=[.64,.33,.3,.6,.15,.06],wc=[.2126,.7152,.0722],Tc=[.3127,.329],Ec=new Ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ac=new Ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);st.define({[Ss]:{primaries:bc,whitePoint:Tc,transfer:ia,toXYZ:Ec,fromXYZ:Ac,luminanceCoefficients:wc,workingColorSpaceConfig:{unpackColorSpace:et},outputColorSpaceConfig:{drawingBufferColorSpace:et}},[et]:{primaries:bc,whitePoint:Tc,transfer:ft,toXYZ:Ec,fromXYZ:Ac,luminanceCoefficients:wc,outputColorSpaceConfig:{drawingBufferColorSpace:et}}});let Gi;class Kd{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Gi===void 0&&(Gi=Js("canvas")),Gi.width=e.width,Gi.height=e.height;const n=Gi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Gi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Js("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),o=s.data;for(let r=0;r<o.length;r++)o[r]=Qn(o[r]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Qn(t[n]/255)*255):t[n]=Qn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Jd=0;class hh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Jd++}),this.uuid=zn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let o;if(Array.isArray(s)){o=[];for(let r=0,c=s.length;r<c;r++)s[r].isDataTexture?o.push(ua(s[r].image)):o.push(ua(s[r]))}else o=ua(s);n.url=o}return t||(e.images[this.uuid]=n),n}}function ua(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Kd.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Qd=0;class qt extends xs{constructor(e=qt.DEFAULT_IMAGE,t=qt.DEFAULT_MAPPING,n=mi,s=mi,o=Dn,r=Di,c=Tn,l=ni,d=qt.DEFAULT_ANISOTROPY,h=pi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Qd++}),this.uuid=zn(),this.name="",this.source=new hh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=o,this.minFilter=r,this.anisotropy=d,this.format=c,this.internalFormat=null,this.type=l,this.offset=new ge(0,0),this.repeat=new ge(1,1),this.center=new ge(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==jl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Gt:e.x=e.x-Math.floor(e.x);break;case mi:e.x=e.x<0?0:1;break;case ar:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Gt:e.y=e.y-Math.floor(e.y);break;case mi:e.y=e.y<0?0:1;break;case ar:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}qt.DEFAULT_IMAGE=null;qt.DEFAULT_MAPPING=jl;qt.DEFAULT_ANISOTROPY=1;class Ct{constructor(e=0,t=0,n=0,s=1){Ct.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,o=this.w,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s+r[12]*o,this.y=r[1]*t+r[5]*n+r[9]*s+r[13]*o,this.z=r[2]*t+r[6]*n+r[10]*s+r[14]*o,this.w=r[3]*t+r[7]*n+r[11]*s+r[15]*o,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,o;const l=e.elements,d=l[0],h=l[4],u=l[8],f=l[1],a=l[5],p=l[9],v=l[2],m=l[6],g=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-v)<.01&&Math.abs(p-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+v)<.1&&Math.abs(p+m)<.1&&Math.abs(d+a+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const _=(d+1)/2,y=(a+1)/2,b=(g+1)/2,w=(h+f)/4,T=(u+v)/4,E=(p+m)/4;return _>y&&_>b?_<.01?(n=0,s=.707106781,o=.707106781):(n=Math.sqrt(_),s=w/n,o=T/n):y>b?y<.01?(n=.707106781,s=0,o=.707106781):(s=Math.sqrt(y),n=w/s,o=E/s):b<.01?(n=.707106781,s=.707106781,o=0):(o=Math.sqrt(b),n=T/o,s=E/o),this.set(n,s,o,t),this}let S=Math.sqrt((m-p)*(m-p)+(u-v)*(u-v)+(f-h)*(f-h));return Math.abs(S)<.001&&(S=1),this.x=(m-p)/S,this.y=(u-v)/S,this.z=(f-h)/S,this.w=Math.acos((d+a+g-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class eu extends xs{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ct(0,0,e,t),this.scissorTest=!1,this.viewport=new Ct(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Dn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const o=new qt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);o.flipY=!1,o.generateMipmaps=n.generateMipmaps,o.internalFormat=n.internalFormat,this.textures=[];const r=n.count;for(let c=0;c<r;c++)this.textures[c]=o.clone(),this.textures[c].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,o=this.textures.length;s<o;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new hh(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ui extends eu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class dh extends qt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=En,this.minFilter=En,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class tu extends qt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=En,this.minFilter=En,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ms{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,o,r,c){let l=n[s+0],d=n[s+1],h=n[s+2],u=n[s+3];const f=o[r+0],a=o[r+1],p=o[r+2],v=o[r+3];if(c===0){e[t+0]=l,e[t+1]=d,e[t+2]=h,e[t+3]=u;return}if(c===1){e[t+0]=f,e[t+1]=a,e[t+2]=p,e[t+3]=v;return}if(u!==v||l!==f||d!==a||h!==p){let m=1-c;const g=l*f+d*a+h*p+u*v,S=g>=0?1:-1,_=1-g*g;if(_>Number.EPSILON){const b=Math.sqrt(_),w=Math.atan2(b,g*S);m=Math.sin(m*w)/b,c=Math.sin(c*w)/b}const y=c*S;if(l=l*m+f*y,d=d*m+a*y,h=h*m+p*y,u=u*m+v*y,m===1-c){const b=1/Math.sqrt(l*l+d*d+h*h+u*u);l*=b,d*=b,h*=b,u*=b}}e[t]=l,e[t+1]=d,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,o,r){const c=n[s],l=n[s+1],d=n[s+2],h=n[s+3],u=o[r],f=o[r+1],a=o[r+2],p=o[r+3];return e[t]=c*p+h*u+l*a-d*f,e[t+1]=l*p+h*f+d*u-c*a,e[t+2]=d*p+h*a+c*f-l*u,e[t+3]=h*p-c*u-l*f-d*a,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,o=e._z,r=e._order,c=Math.cos,l=Math.sin,d=c(n/2),h=c(s/2),u=c(o/2),f=l(n/2),a=l(s/2),p=l(o/2);switch(r){case"XYZ":this._x=f*h*u+d*a*p,this._y=d*a*u-f*h*p,this._z=d*h*p+f*a*u,this._w=d*h*u-f*a*p;break;case"YXZ":this._x=f*h*u+d*a*p,this._y=d*a*u-f*h*p,this._z=d*h*p-f*a*u,this._w=d*h*u+f*a*p;break;case"ZXY":this._x=f*h*u-d*a*p,this._y=d*a*u+f*h*p,this._z=d*h*p+f*a*u,this._w=d*h*u-f*a*p;break;case"ZYX":this._x=f*h*u-d*a*p,this._y=d*a*u+f*h*p,this._z=d*h*p-f*a*u,this._w=d*h*u+f*a*p;break;case"YZX":this._x=f*h*u+d*a*p,this._y=d*a*u+f*h*p,this._z=d*h*p-f*a*u,this._w=d*h*u-f*a*p;break;case"XZY":this._x=f*h*u-d*a*p,this._y=d*a*u-f*h*p,this._z=d*h*p+f*a*u,this._w=d*h*u+f*a*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],o=t[8],r=t[1],c=t[5],l=t[9],d=t[2],h=t[6],u=t[10],f=n+c+u;if(f>0){const a=.5/Math.sqrt(f+1);this._w=.25/a,this._x=(h-l)*a,this._y=(o-d)*a,this._z=(r-s)*a}else if(n>c&&n>u){const a=2*Math.sqrt(1+n-c-u);this._w=(h-l)/a,this._x=.25*a,this._y=(s+r)/a,this._z=(o+d)/a}else if(c>u){const a=2*Math.sqrt(1+c-n-u);this._w=(o-d)/a,this._x=(s+r)/a,this._y=.25*a,this._z=(l+h)/a}else{const a=2*Math.sqrt(1+u-n-c);this._w=(r-s)/a,this._x=(o+d)/a,this._y=(l+h)/a,this._z=.25*a}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Bt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,o=e._z,r=e._w,c=t._x,l=t._y,d=t._z,h=t._w;return this._x=n*h+r*c+s*d-o*l,this._y=s*h+r*l+o*c-n*d,this._z=o*h+r*d+n*l-s*c,this._w=r*h-n*c-s*l-o*d,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,o=this._z,r=this._w;let c=r*e._w+n*e._x+s*e._y+o*e._z;if(c<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,c=-c):this.copy(e),c>=1)return this._w=r,this._x=n,this._y=s,this._z=o,this;const l=1-c*c;if(l<=Number.EPSILON){const a=1-t;return this._w=a*r+t*this._w,this._x=a*n+t*this._x,this._y=a*s+t*this._y,this._z=a*o+t*this._z,this.normalize(),this}const d=Math.sqrt(l),h=Math.atan2(d,c),u=Math.sin((1-t)*h)/d,f=Math.sin(t*h)/d;return this._w=r*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=o*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),o=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),o*Math.sin(t),o*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class z{constructor(e=0,t=0,n=0){z.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Cc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Cc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,o=e.elements;return this.x=o[0]*t+o[3]*n+o[6]*s,this.y=o[1]*t+o[4]*n+o[7]*s,this.z=o[2]*t+o[5]*n+o[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,o=e.elements,r=1/(o[3]*t+o[7]*n+o[11]*s+o[15]);return this.x=(o[0]*t+o[4]*n+o[8]*s+o[12])*r,this.y=(o[1]*t+o[5]*n+o[9]*s+o[13])*r,this.z=(o[2]*t+o[6]*n+o[10]*s+o[14])*r,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,o=e.x,r=e.y,c=e.z,l=e.w,d=2*(r*s-c*n),h=2*(c*t-o*s),u=2*(o*n-r*t);return this.x=t+l*d+r*u-c*h,this.y=n+l*h+c*d-o*u,this.z=s+l*u+o*h-r*d,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s,this.y=o[1]*t+o[5]*n+o[9]*s,this.z=o[2]*t+o[6]*n+o[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,o=e.z,r=t.x,c=t.y,l=t.z;return this.x=s*l-o*c,this.y=o*r-n*l,this.z=n*c-s*r,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return fa.copy(this).projectOnVector(e),this.sub(fa)}reflect(e){return this.sub(fa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Bt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const fa=new z,Cc=new Ms;class io{constructor(e=new z(1/0,1/0,1/0),t=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(vn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(vn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=vn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const o=n.getAttribute("position");if(t===!0&&o!==void 0&&e.isInstancedMesh!==!0)for(let r=0,c=o.count;r<c;r++)e.isMesh===!0?e.getVertexPosition(r,vn):vn.fromBufferAttribute(o,r),vn.applyMatrix4(e.matrixWorld),this.expandByPoint(vn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),uo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),uo.copy(n.boundingBox)),uo.applyMatrix4(e.matrixWorld),this.union(uo)}const s=e.children;for(let o=0,r=s.length;o<r;o++)this.expandByObject(s[o],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,vn),vn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(As),fo.subVectors(this.max,As),Oi.subVectors(e.a,As),Vi.subVectors(e.b,As),Hi.subVectors(e.c,As),oi.subVectors(Vi,Oi),ai.subVectors(Hi,Vi),Mi.subVectors(Oi,Hi);let t=[0,-oi.z,oi.y,0,-ai.z,ai.y,0,-Mi.z,Mi.y,oi.z,0,-oi.x,ai.z,0,-ai.x,Mi.z,0,-Mi.x,-oi.y,oi.x,0,-ai.y,ai.x,0,-Mi.y,Mi.x,0];return!pa(t,Oi,Vi,Hi,fo)||(t=[1,0,0,0,1,0,0,0,1],!pa(t,Oi,Vi,Hi,fo))?!1:(po.crossVectors(oi,ai),t=[po.x,po.y,po.z],pa(t,Oi,Vi,Hi,fo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,vn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(vn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(On[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),On[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),On[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),On[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),On[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),On[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),On[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),On[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(On),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const On=[new z,new z,new z,new z,new z,new z,new z,new z],vn=new z,uo=new io,Oi=new z,Vi=new z,Hi=new z,oi=new z,ai=new z,Mi=new z,As=new z,fo=new z,po=new z,bi=new z;function pa(i,e,t,n,s){for(let o=0,r=i.length-3;o<=r;o+=3){bi.fromArray(i,o);const c=s.x*Math.abs(bi.x)+s.y*Math.abs(bi.y)+s.z*Math.abs(bi.z),l=e.dot(bi),d=t.dot(bi),h=n.dot(bi);if(Math.max(-Math.max(l,d,h),Math.min(l,d,h))>c)return!1}return!0}const nu=new io,Cs=new z,ma=new z;class Kr{constructor(e=new z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):nu.setFromPoints(e).getCenter(n);let s=0;for(let o=0,r=e.length;o<r;o++)s=Math.max(s,n.distanceToSquared(e[o]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Cs.subVectors(e,this.center);const t=Cs.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Cs,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ma.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Cs.copy(e.center).add(ma)),this.expandByPoint(Cs.copy(e.center).sub(ma))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Vn=new z,ga=new z,mo=new z,ri=new z,va=new z,go=new z,ya=new z;class iu{constructor(e=new z,t=new z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Vn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Vn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Vn.copy(this.origin).addScaledVector(this.direction,t),Vn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ga.copy(e).add(t).multiplyScalar(.5),mo.copy(t).sub(e).normalize(),ri.copy(this.origin).sub(ga);const o=e.distanceTo(t)*.5,r=-this.direction.dot(mo),c=ri.dot(this.direction),l=-ri.dot(mo),d=ri.lengthSq(),h=Math.abs(1-r*r);let u,f,a,p;if(h>0)if(u=r*l-c,f=r*c-l,p=o*h,u>=0)if(f>=-p)if(f<=p){const v=1/h;u*=v,f*=v,a=u*(u+r*f+2*c)+f*(r*u+f+2*l)+d}else f=o,u=Math.max(0,-(r*f+c)),a=-u*u+f*(f+2*l)+d;else f=-o,u=Math.max(0,-(r*f+c)),a=-u*u+f*(f+2*l)+d;else f<=-p?(u=Math.max(0,-(-r*o+c)),f=u>0?-o:Math.min(Math.max(-o,-l),o),a=-u*u+f*(f+2*l)+d):f<=p?(u=0,f=Math.min(Math.max(-o,-l),o),a=f*(f+2*l)+d):(u=Math.max(0,-(r*o+c)),f=u>0?o:Math.min(Math.max(-o,-l),o),a=-u*u+f*(f+2*l)+d);else f=r>0?-o:o,u=Math.max(0,-(r*f+c)),a=-u*u+f*(f+2*l)+d;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(ga).addScaledVector(mo,f),a}intersectSphere(e,t){Vn.subVectors(e.center,this.origin);const n=Vn.dot(this.direction),s=Vn.dot(Vn)-n*n,o=e.radius*e.radius;if(s>o)return null;const r=Math.sqrt(o-s),c=n-r,l=n+r;return l<0?null:c<0?this.at(l,t):this.at(c,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,o,r,c,l;const d=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return d>=0?(n=(e.min.x-f.x)*d,s=(e.max.x-f.x)*d):(n=(e.max.x-f.x)*d,s=(e.min.x-f.x)*d),h>=0?(o=(e.min.y-f.y)*h,r=(e.max.y-f.y)*h):(o=(e.max.y-f.y)*h,r=(e.min.y-f.y)*h),n>r||o>s||((o>n||isNaN(n))&&(n=o),(r<s||isNaN(s))&&(s=r),u>=0?(c=(e.min.z-f.z)*u,l=(e.max.z-f.z)*u):(c=(e.max.z-f.z)*u,l=(e.min.z-f.z)*u),n>l||c>s)||((c>n||n!==n)&&(n=c),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Vn)!==null}intersectTriangle(e,t,n,s,o){va.subVectors(t,e),go.subVectors(n,e),ya.crossVectors(va,go);let r=this.direction.dot(ya),c;if(r>0){if(s)return null;c=1}else if(r<0)c=-1,r=-r;else return null;ri.subVectors(this.origin,e);const l=c*this.direction.dot(go.crossVectors(ri,go));if(l<0)return null;const d=c*this.direction.dot(va.cross(ri));if(d<0||l+d>r)return null;const h=-c*ri.dot(ya);return h<0?null:this.at(h/r,o)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class _t{constructor(e,t,n,s,o,r,c,l,d,h,u,f,a,p,v,m){_t.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,o,r,c,l,d,h,u,f,a,p,v,m)}set(e,t,n,s,o,r,c,l,d,h,u,f,a,p,v,m){const g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=s,g[1]=o,g[5]=r,g[9]=c,g[13]=l,g[2]=d,g[6]=h,g[10]=u,g[14]=f,g[3]=a,g[7]=p,g[11]=v,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new _t().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Wi.setFromMatrixColumn(e,0).length(),o=1/Wi.setFromMatrixColumn(e,1).length(),r=1/Wi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*o,t[5]=n[5]*o,t[6]=n[6]*o,t[7]=0,t[8]=n[8]*r,t[9]=n[9]*r,t[10]=n[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,o=e.z,r=Math.cos(n),c=Math.sin(n),l=Math.cos(s),d=Math.sin(s),h=Math.cos(o),u=Math.sin(o);if(e.order==="XYZ"){const f=r*h,a=r*u,p=c*h,v=c*u;t[0]=l*h,t[4]=-l*u,t[8]=d,t[1]=a+p*d,t[5]=f-v*d,t[9]=-c*l,t[2]=v-f*d,t[6]=p+a*d,t[10]=r*l}else if(e.order==="YXZ"){const f=l*h,a=l*u,p=d*h,v=d*u;t[0]=f+v*c,t[4]=p*c-a,t[8]=r*d,t[1]=r*u,t[5]=r*h,t[9]=-c,t[2]=a*c-p,t[6]=v+f*c,t[10]=r*l}else if(e.order==="ZXY"){const f=l*h,a=l*u,p=d*h,v=d*u;t[0]=f-v*c,t[4]=-r*u,t[8]=p+a*c,t[1]=a+p*c,t[5]=r*h,t[9]=v-f*c,t[2]=-r*d,t[6]=c,t[10]=r*l}else if(e.order==="ZYX"){const f=r*h,a=r*u,p=c*h,v=c*u;t[0]=l*h,t[4]=p*d-a,t[8]=f*d+v,t[1]=l*u,t[5]=v*d+f,t[9]=a*d-p,t[2]=-d,t[6]=c*l,t[10]=r*l}else if(e.order==="YZX"){const f=r*l,a=r*d,p=c*l,v=c*d;t[0]=l*h,t[4]=v-f*u,t[8]=p*u+a,t[1]=u,t[5]=r*h,t[9]=-c*h,t[2]=-d*h,t[6]=a*u+p,t[10]=f-v*u}else if(e.order==="XZY"){const f=r*l,a=r*d,p=c*l,v=c*d;t[0]=l*h,t[4]=-u,t[8]=d*h,t[1]=f*u+v,t[5]=r*h,t[9]=a*u-p,t[2]=p*u-a,t[6]=c*h,t[10]=v*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(su,e,ou)}lookAt(e,t,n){const s=this.elements;return nn.subVectors(e,t),nn.lengthSq()===0&&(nn.z=1),nn.normalize(),ci.crossVectors(n,nn),ci.lengthSq()===0&&(Math.abs(n.z)===1?nn.x+=1e-4:nn.z+=1e-4,nn.normalize(),ci.crossVectors(n,nn)),ci.normalize(),vo.crossVectors(nn,ci),s[0]=ci.x,s[4]=vo.x,s[8]=nn.x,s[1]=ci.y,s[5]=vo.y,s[9]=nn.y,s[2]=ci.z,s[6]=vo.z,s[10]=nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,o=this.elements,r=n[0],c=n[4],l=n[8],d=n[12],h=n[1],u=n[5],f=n[9],a=n[13],p=n[2],v=n[6],m=n[10],g=n[14],S=n[3],_=n[7],y=n[11],b=n[15],w=s[0],T=s[4],E=s[8],M=s[12],x=s[1],P=s[5],k=s[9],U=s[13],L=s[2],B=s[6],F=s[10],G=s[14],O=s[3],N=s[7],V=s[11],$=s[15];return o[0]=r*w+c*x+l*L+d*O,o[4]=r*T+c*P+l*B+d*N,o[8]=r*E+c*k+l*F+d*V,o[12]=r*M+c*U+l*G+d*$,o[1]=h*w+u*x+f*L+a*O,o[5]=h*T+u*P+f*B+a*N,o[9]=h*E+u*k+f*F+a*V,o[13]=h*M+u*U+f*G+a*$,o[2]=p*w+v*x+m*L+g*O,o[6]=p*T+v*P+m*B+g*N,o[10]=p*E+v*k+m*F+g*V,o[14]=p*M+v*U+m*G+g*$,o[3]=S*w+_*x+y*L+b*O,o[7]=S*T+_*P+y*B+b*N,o[11]=S*E+_*k+y*F+b*V,o[15]=S*M+_*U+y*G+b*$,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],o=e[12],r=e[1],c=e[5],l=e[9],d=e[13],h=e[2],u=e[6],f=e[10],a=e[14],p=e[3],v=e[7],m=e[11],g=e[15];return p*(+o*l*u-s*d*u-o*c*f+n*d*f+s*c*a-n*l*a)+v*(+t*l*a-t*d*f+o*r*f-s*r*a+s*d*h-o*l*h)+m*(+t*d*u-t*c*a-o*r*u+n*r*a+o*c*h-n*d*h)+g*(-s*c*h-t*l*u+t*c*f+s*r*u-n*r*f+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],o=e[3],r=e[4],c=e[5],l=e[6],d=e[7],h=e[8],u=e[9],f=e[10],a=e[11],p=e[12],v=e[13],m=e[14],g=e[15],S=u*m*d-v*f*d+v*l*a-c*m*a-u*l*g+c*f*g,_=p*f*d-h*m*d-p*l*a+r*m*a+h*l*g-r*f*g,y=h*v*d-p*u*d+p*c*a-r*v*a-h*c*g+r*u*g,b=p*u*l-h*v*l-p*c*f+r*v*f+h*c*m-r*u*m,w=t*S+n*_+s*y+o*b;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/w;return e[0]=S*T,e[1]=(v*f*o-u*m*o-v*s*a+n*m*a+u*s*g-n*f*g)*T,e[2]=(c*m*o-v*l*o+v*s*d-n*m*d-c*s*g+n*l*g)*T,e[3]=(u*l*o-c*f*o-u*s*d+n*f*d+c*s*a-n*l*a)*T,e[4]=_*T,e[5]=(h*m*o-p*f*o+p*s*a-t*m*a-h*s*g+t*f*g)*T,e[6]=(p*l*o-r*m*o-p*s*d+t*m*d+r*s*g-t*l*g)*T,e[7]=(r*f*o-h*l*o+h*s*d-t*f*d-r*s*a+t*l*a)*T,e[8]=y*T,e[9]=(p*u*o-h*v*o-p*n*a+t*v*a+h*n*g-t*u*g)*T,e[10]=(r*v*o-p*c*o+p*n*d-t*v*d-r*n*g+t*c*g)*T,e[11]=(h*c*o-r*u*o-h*n*d+t*u*d+r*n*a-t*c*a)*T,e[12]=b*T,e[13]=(h*v*s-p*u*s+p*n*f-t*v*f-h*n*m+t*u*m)*T,e[14]=(p*c*s-r*v*s-p*n*l+t*v*l+r*n*m-t*c*m)*T,e[15]=(r*u*s-h*c*s+h*n*l-t*u*l-r*n*f+t*c*f)*T,this}scale(e){const t=this.elements,n=e.x,s=e.y,o=e.z;return t[0]*=n,t[4]*=s,t[8]*=o,t[1]*=n,t[5]*=s,t[9]*=o,t[2]*=n,t[6]*=s,t[10]*=o,t[3]*=n,t[7]*=s,t[11]*=o,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),o=1-n,r=e.x,c=e.y,l=e.z,d=o*r,h=o*c;return this.set(d*r+n,d*c-s*l,d*l+s*c,0,d*c+s*l,h*c+n,h*l-s*r,0,d*l-s*c,h*l+s*r,o*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,o,r){return this.set(1,n,o,0,e,1,r,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,o=t._x,r=t._y,c=t._z,l=t._w,d=o+o,h=r+r,u=c+c,f=o*d,a=o*h,p=o*u,v=r*h,m=r*u,g=c*u,S=l*d,_=l*h,y=l*u,b=n.x,w=n.y,T=n.z;return s[0]=(1-(v+g))*b,s[1]=(a+y)*b,s[2]=(p-_)*b,s[3]=0,s[4]=(a-y)*w,s[5]=(1-(f+g))*w,s[6]=(m+S)*w,s[7]=0,s[8]=(p+_)*T,s[9]=(m-S)*T,s[10]=(1-(f+v))*T,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let o=Wi.set(s[0],s[1],s[2]).length();const r=Wi.set(s[4],s[5],s[6]).length(),c=Wi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(o=-o),e.x=s[12],e.y=s[13],e.z=s[14],yn.copy(this);const d=1/o,h=1/r,u=1/c;return yn.elements[0]*=d,yn.elements[1]*=d,yn.elements[2]*=d,yn.elements[4]*=h,yn.elements[5]*=h,yn.elements[6]*=h,yn.elements[8]*=u,yn.elements[9]*=u,yn.elements[10]*=u,t.setFromRotationMatrix(yn),n.x=o,n.y=r,n.z=c,this}makePerspective(e,t,n,s,o,r,c=Jn){const l=this.elements,d=2*o/(t-e),h=2*o/(n-s),u=(t+e)/(t-e),f=(n+s)/(n-s);let a,p;if(c===Jn)a=-(r+o)/(r-o),p=-2*r*o/(r-o);else if(c===Ko)a=-r/(r-o),p=-r*o/(r-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return l[0]=d,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=a,l[14]=p,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,o,r,c=Jn){const l=this.elements,d=1/(t-e),h=1/(n-s),u=1/(r-o),f=(t+e)*d,a=(n+s)*h;let p,v;if(c===Jn)p=(r+o)*u,v=-2*u;else if(c===Ko)p=o*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return l[0]=2*d,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-a,l[2]=0,l[6]=0,l[10]=v,l[14]=-p,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Wi=new z,yn=new _t,su=new z(0,0,0),ou=new z(1,1,1),ci=new z,vo=new z,nn=new z,Pc=new _t,Rc=new Ms;class Un{constructor(e=0,t=0,n=0,s=Un.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,o=s[0],r=s[4],c=s[8],l=s[1],d=s[5],h=s[9],u=s[2],f=s[6],a=s[10];switch(t){case"XYZ":this._y=Math.asin(Bt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,a),this._z=Math.atan2(-r,o)):(this._x=Math.atan2(f,d),this._z=0);break;case"YXZ":this._x=Math.asin(-Bt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(c,a),this._z=Math.atan2(l,d)):(this._y=Math.atan2(-u,o),this._z=0);break;case"ZXY":this._x=Math.asin(Bt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,a),this._z=Math.atan2(-r,d)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-Bt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,a),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-r,d));break;case"YZX":this._z=Math.asin(Bt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,d),this._y=Math.atan2(-u,o)):(this._x=0,this._y=Math.atan2(c,a));break;case"XZY":this._z=Math.asin(-Bt(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(f,d),this._y=Math.atan2(c,o)):(this._x=Math.atan2(-h,a),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Pc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Pc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Rc.setFromEuler(this),this.setFromQuaternion(Rc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Un.DEFAULT_ORDER="XYZ";class uh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let au=0;const Ic=new z,Xi=new Ms,Hn=new _t,yo=new z,Ps=new z,ru=new z,cu=new Ms,Lc=new z(1,0,0),Dc=new z(0,1,0),kc=new z(0,0,1),zc={type:"added"},lu={type:"removed"},qi={type:"childadded",child:null},_a={type:"childremoved",child:null};class Ft extends xs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:au++}),this.uuid=zn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ft.DEFAULT_UP.clone();const e=new z,t=new Un,n=new Ms,s=new z(1,1,1);function o(){n.setFromEuler(t,!1)}function r(){t.setFromQuaternion(n,void 0,!1)}t._onChange(o),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new _t},normalMatrix:{value:new Ke}}),this.matrix=new _t,this.matrixWorld=new _t,this.matrixAutoUpdate=Ft.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new uh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Xi.setFromAxisAngle(e,t),this.quaternion.multiply(Xi),this}rotateOnWorldAxis(e,t){return Xi.setFromAxisAngle(e,t),this.quaternion.premultiply(Xi),this}rotateX(e){return this.rotateOnAxis(Lc,e)}rotateY(e){return this.rotateOnAxis(Dc,e)}rotateZ(e){return this.rotateOnAxis(kc,e)}translateOnAxis(e,t){return Ic.copy(e).applyQuaternion(this.quaternion),this.position.add(Ic.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Lc,e)}translateY(e){return this.translateOnAxis(Dc,e)}translateZ(e){return this.translateOnAxis(kc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Hn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?yo.copy(e):yo.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ps.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Hn.lookAt(Ps,yo,this.up):Hn.lookAt(yo,Ps,this.up),this.quaternion.setFromRotationMatrix(Hn),s&&(Hn.extractRotation(s.matrixWorld),Xi.setFromRotationMatrix(Hn),this.quaternion.premultiply(Xi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(zc),qi.child=e,this.dispatchEvent(qi),qi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(lu),_a.child=e,this.dispatchEvent(_a),_a.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Hn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Hn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Hn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(zc),qi.child=e,this.dispatchEvent(qi),qi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let o=0,r=s.length;o<r;o++)s[o].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ps,e,ru),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ps,cu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let o=0,r=s.length;o<r;o++)s[o].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(c=>({boxInitialized:c.boxInitialized,boxMin:c.box.min.toArray(),boxMax:c.box.max.toArray(),sphereInitialized:c.sphereInitialized,sphereRadius:c.sphere.radius,sphereCenter:c.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function o(c,l){return c[l.uuid]===void 0&&(c[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=o(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const l=c.shapes;if(Array.isArray(l))for(let d=0,h=l.length;d<h;d++){const u=l[d];o(e.shapes,u)}else o(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let l=0,d=this.material.length;l<d;l++)c.push(o(e.materials,this.material[l]));s.material=c}else s.material=o(e.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){const l=this.animations[c];s.animations.push(o(e.animations,l))}}if(t){const c=r(e.geometries),l=r(e.materials),d=r(e.textures),h=r(e.images),u=r(e.shapes),f=r(e.skeletons),a=r(e.animations),p=r(e.nodes);c.length>0&&(n.geometries=c),l.length>0&&(n.materials=l),d.length>0&&(n.textures=d),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),a.length>0&&(n.animations=a),p.length>0&&(n.nodes=p)}return n.object=s,n;function r(c){const l=[];for(const d in c){const h=c[d];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Ft.DEFAULT_UP=new z(0,1,0);Ft.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const _n=new z,Wn=new z,Sa=new z,Xn=new z,Yi=new z,Zi=new z,Uc=new z,xa=new z,Ma=new z,ba=new z,wa=new Ct,Ta=new Ct,Ea=new Ct;class fn{constructor(e=new z,t=new z,n=new z){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),_n.subVectors(e,t),s.cross(_n);const o=s.lengthSq();return o>0?s.multiplyScalar(1/Math.sqrt(o)):s.set(0,0,0)}static getBarycoord(e,t,n,s,o){_n.subVectors(s,t),Wn.subVectors(n,t),Sa.subVectors(e,t);const r=_n.dot(_n),c=_n.dot(Wn),l=_n.dot(Sa),d=Wn.dot(Wn),h=Wn.dot(Sa),u=r*d-c*c;if(u===0)return o.set(0,0,0),null;const f=1/u,a=(d*l-c*h)*f,p=(r*h-c*l)*f;return o.set(1-a-p,p,a)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Xn)===null?!1:Xn.x>=0&&Xn.y>=0&&Xn.x+Xn.y<=1}static getInterpolation(e,t,n,s,o,r,c,l){return this.getBarycoord(e,t,n,s,Xn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(o,Xn.x),l.addScaledVector(r,Xn.y),l.addScaledVector(c,Xn.z),l)}static getInterpolatedAttribute(e,t,n,s,o,r){return wa.setScalar(0),Ta.setScalar(0),Ea.setScalar(0),wa.fromBufferAttribute(e,t),Ta.fromBufferAttribute(e,n),Ea.fromBufferAttribute(e,s),r.setScalar(0),r.addScaledVector(wa,o.x),r.addScaledVector(Ta,o.y),r.addScaledVector(Ea,o.z),r}static isFrontFacing(e,t,n,s){return _n.subVectors(n,t),Wn.subVectors(e,t),_n.cross(Wn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return _n.subVectors(this.c,this.b),Wn.subVectors(this.a,this.b),_n.cross(Wn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return fn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return fn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,o){return fn.getInterpolation(e,this.a,this.b,this.c,t,n,s,o)}containsPoint(e){return fn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return fn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,o=this.c;let r,c;Yi.subVectors(s,n),Zi.subVectors(o,n),xa.subVectors(e,n);const l=Yi.dot(xa),d=Zi.dot(xa);if(l<=0&&d<=0)return t.copy(n);Ma.subVectors(e,s);const h=Yi.dot(Ma),u=Zi.dot(Ma);if(h>=0&&u<=h)return t.copy(s);const f=l*u-h*d;if(f<=0&&l>=0&&h<=0)return r=l/(l-h),t.copy(n).addScaledVector(Yi,r);ba.subVectors(e,o);const a=Yi.dot(ba),p=Zi.dot(ba);if(p>=0&&a<=p)return t.copy(o);const v=a*d-l*p;if(v<=0&&d>=0&&p<=0)return c=d/(d-p),t.copy(n).addScaledVector(Zi,c);const m=h*p-a*u;if(m<=0&&u-h>=0&&a-p>=0)return Uc.subVectors(o,s),c=(u-h)/(u-h+(a-p)),t.copy(s).addScaledVector(Uc,c);const g=1/(m+v+f);return r=v*g,c=f*g,t.copy(n).addScaledVector(Yi,r).addScaledVector(Zi,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const fh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},li={h:0,s:0,l:0},_o={h:0,s:0,l:0};function Aa(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ye{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=et){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,st.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=st.workingColorSpace){return this.r=e,this.g=t,this.b=n,st.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=st.workingColorSpace){if(e=jr(e,1),t=Bt(t,0,1),n=Bt(n,0,1),t===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+t):n+t-n*t,r=2*n-o;this.r=Aa(r,o,e+1/3),this.g=Aa(r,o,e),this.b=Aa(r,o,e-1/3)}return st.toWorkingColorSpace(this,s),this}setStyle(e,t=et){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let o;const r=s[1],c=s[2];switch(r){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,t);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,t);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const o=s[1],r=o.length;if(r===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(o,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=et){const n=fh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Qn(e.r),this.g=Qn(e.g),this.b=Qn(e.b),this}copyLinearToSRGB(e){return this.r=us(e.r),this.g=us(e.g),this.b=us(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=et){return st.fromWorkingColorSpace(Wt.copy(this),e),Math.round(Bt(Wt.r*255,0,255))*65536+Math.round(Bt(Wt.g*255,0,255))*256+Math.round(Bt(Wt.b*255,0,255))}getHexString(e=et){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=st.workingColorSpace){st.fromWorkingColorSpace(Wt.copy(this),t);const n=Wt.r,s=Wt.g,o=Wt.b,r=Math.max(n,s,o),c=Math.min(n,s,o);let l,d;const h=(c+r)/2;if(c===r)l=0,d=0;else{const u=r-c;switch(d=h<=.5?u/(r+c):u/(2-r-c),r){case n:l=(s-o)/u+(s<o?6:0);break;case s:l=(o-n)/u+2;break;case o:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=d,e.l=h,e}getRGB(e,t=st.workingColorSpace){return st.fromWorkingColorSpace(Wt.copy(this),t),e.r=Wt.r,e.g=Wt.g,e.b=Wt.b,e}getStyle(e=et){st.fromWorkingColorSpace(Wt.copy(this),e);const t=Wt.r,n=Wt.g,s=Wt.b;return e!==et?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(li),this.setHSL(li.h+e,li.s+t,li.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(li),e.getHSL(_o);const n=Ys(li.h,_o.h,t),s=Ys(li.s,_o.s,t),o=Ys(li.l,_o.l,t);return this.setHSL(n,s,o),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,o=e.elements;return this.r=o[0]*t+o[3]*n+o[6]*s,this.g=o[1]*t+o[4]*n+o[7]*s,this.b=o[2]*t+o[5]*n+o[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Wt=new Ye;Ye.NAMES=fh;let hu=0;class bs extends xs{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:hu++}),this.uuid=zn(),this.name="",this.blending=hs,this.side=_i,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=$a,this.blendDst=ja,this.blendEquation=Ii,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ye(0,0,0),this.blendAlpha=0,this.depthFunc=ps,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_c,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Fi,this.stencilZFail=Fi,this.stencilZPass=Fi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==hs&&(n.blending=this.blending),this.side!==_i&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==$a&&(n.blendSrc=this.blendSrc),this.blendDst!==ja&&(n.blendDst=this.blendDst),this.blendEquation!==Ii&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ps&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==_c&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Fi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Fi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Fi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(o){const r=[];for(const c in o){const l=o[c];delete l.metadata,r.push(l)}return r}if(t){const o=s(e.textures),r=s(e.images);o.length>0&&(n.textures=o),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let o=0;o!==s;++o)n[o]=t[o].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class so extends bs{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.combine=Zl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const It=new z,So=new ge;class An{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Dr,this.updateRanges=[],this.gpuType=Kn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,o=this.itemSize;s<o;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)So.fromBufferAttribute(this,t),So.applyMatrix3(e),this.setXY(t,So.x,So.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyMatrix3(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyMatrix4(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyNormalMatrix(e),this.setXYZ(t,It.x,It.y,It.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.transformDirection(e),this.setXYZ(t,It.x,It.y,It.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=wn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ut(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=wn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=wn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=wn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=wn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,o){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array),o=ut(o,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=o,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Dr&&(e.usage=this.usage),e}}class ph extends An{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class mh extends An{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class tt extends An{constructor(e,t,n){super(new Float32Array(e),t,n)}}let du=0;const hn=new _t,Ca=new Ft,$i=new z,sn=new io,Rs=new io,Ut=new z;class Ot extends xs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:du++}),this.uuid=zn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(lh(e)?mh:ph)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new Ke().getNormalMatrix(e);n.applyNormalMatrix(o),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return hn.makeRotationFromQuaternion(e),this.applyMatrix4(hn),this}rotateX(e){return hn.makeRotationX(e),this.applyMatrix4(hn),this}rotateY(e){return hn.makeRotationY(e),this.applyMatrix4(hn),this}rotateZ(e){return hn.makeRotationZ(e),this.applyMatrix4(hn),this}translate(e,t,n){return hn.makeTranslation(e,t,n),this.applyMatrix4(hn),this}scale(e,t,n){return hn.makeScale(e,t,n),this.applyMatrix4(hn),this}lookAt(e){return Ca.lookAt(e),Ca.updateMatrix(),this.applyMatrix4(Ca.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter($i).negate(),this.translate($i.x,$i.y,$i.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,o=e.length;s<o;s++){const r=e[s];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new tt(n,3))}else{for(let n=0,s=t.count;n<s;n++){const o=e[n];t.setXYZ(n,o.x,o.y,o.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new io);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const o=t[n];sn.setFromBufferAttribute(o),this.morphTargetsRelative?(Ut.addVectors(this.boundingBox.min,sn.min),this.boundingBox.expandByPoint(Ut),Ut.addVectors(this.boundingBox.max,sn.max),this.boundingBox.expandByPoint(Ut)):(this.boundingBox.expandByPoint(sn.min),this.boundingBox.expandByPoint(sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Kr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(e){const n=this.boundingSphere.center;if(sn.setFromBufferAttribute(e),t)for(let o=0,r=t.length;o<r;o++){const c=t[o];Rs.setFromBufferAttribute(c),this.morphTargetsRelative?(Ut.addVectors(sn.min,Rs.min),sn.expandByPoint(Ut),Ut.addVectors(sn.max,Rs.max),sn.expandByPoint(Ut)):(sn.expandByPoint(Rs.min),sn.expandByPoint(Rs.max))}sn.getCenter(n);let s=0;for(let o=0,r=e.count;o<r;o++)Ut.fromBufferAttribute(e,o),s=Math.max(s,n.distanceToSquared(Ut));if(t)for(let o=0,r=t.length;o<r;o++){const c=t[o],l=this.morphTargetsRelative;for(let d=0,h=c.count;d<h;d++)Ut.fromBufferAttribute(c,d),l&&($i.fromBufferAttribute(e,d),Ut.add($i)),s=Math.max(s,n.distanceToSquared(Ut))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,o=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new An(new Float32Array(4*n.count),4));const r=this.getAttribute("tangent"),c=[],l=[];for(let E=0;E<n.count;E++)c[E]=new z,l[E]=new z;const d=new z,h=new z,u=new z,f=new ge,a=new ge,p=new ge,v=new z,m=new z;function g(E,M,x){d.fromBufferAttribute(n,E),h.fromBufferAttribute(n,M),u.fromBufferAttribute(n,x),f.fromBufferAttribute(o,E),a.fromBufferAttribute(o,M),p.fromBufferAttribute(o,x),h.sub(d),u.sub(d),a.sub(f),p.sub(f);const P=1/(a.x*p.y-p.x*a.y);isFinite(P)&&(v.copy(h).multiplyScalar(p.y).addScaledVector(u,-a.y).multiplyScalar(P),m.copy(u).multiplyScalar(a.x).addScaledVector(h,-p.x).multiplyScalar(P),c[E].add(v),c[M].add(v),c[x].add(v),l[E].add(m),l[M].add(m),l[x].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let E=0,M=S.length;E<M;++E){const x=S[E],P=x.start,k=x.count;for(let U=P,L=P+k;U<L;U+=3)g(e.getX(U+0),e.getX(U+1),e.getX(U+2))}const _=new z,y=new z,b=new z,w=new z;function T(E){b.fromBufferAttribute(s,E),w.copy(b);const M=c[E];_.copy(M),_.sub(b.multiplyScalar(b.dot(M))).normalize(),y.crossVectors(w,M);const P=y.dot(l[E])<0?-1:1;r.setXYZW(E,_.x,_.y,_.z,P)}for(let E=0,M=S.length;E<M;++E){const x=S[E],P=x.start,k=x.count;for(let U=P,L=P+k;U<L;U+=3)T(e.getX(U+0)),T(e.getX(U+1)),T(e.getX(U+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new An(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,a=n.count;f<a;f++)n.setXYZ(f,0,0,0);const s=new z,o=new z,r=new z,c=new z,l=new z,d=new z,h=new z,u=new z;if(e)for(let f=0,a=e.count;f<a;f+=3){const p=e.getX(f+0),v=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,p),o.fromBufferAttribute(t,v),r.fromBufferAttribute(t,m),h.subVectors(r,o),u.subVectors(s,o),h.cross(u),c.fromBufferAttribute(n,p),l.fromBufferAttribute(n,v),d.fromBufferAttribute(n,m),c.add(h),l.add(h),d.add(h),n.setXYZ(p,c.x,c.y,c.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,d.x,d.y,d.z)}else for(let f=0,a=t.count;f<a;f+=3)s.fromBufferAttribute(t,f+0),o.fromBufferAttribute(t,f+1),r.fromBufferAttribute(t,f+2),h.subVectors(r,o),u.subVectors(s,o),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ut.fromBufferAttribute(e,t),Ut.normalize(),e.setXYZ(t,Ut.x,Ut.y,Ut.z)}toNonIndexed(){function e(c,l){const d=c.array,h=c.itemSize,u=c.normalized,f=new d.constructor(l.length*h);let a=0,p=0;for(let v=0,m=l.length;v<m;v++){c.isInterleavedBufferAttribute?a=l[v]*c.data.stride+c.offset:a=l[v]*h;for(let g=0;g<h;g++)f[p++]=d[a++]}return new An(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ot,n=this.index.array,s=this.attributes;for(const c in s){const l=s[c],d=e(l,n);t.setAttribute(c,d)}const o=this.morphAttributes;for(const c in o){const l=[],d=o[c];for(let h=0,u=d.length;h<u;h++){const f=d[h],a=e(f,n);l.push(a)}t.morphAttributes[c]=l}t.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let c=0,l=r.length;c<l;c++){const d=r[c];t.addGroup(d.start,d.count,d.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const d in l)l[d]!==void 0&&(e[d]=l[d]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const d=n[l];e.data.attributes[l]=d.toJSON(e.data)}const s={};let o=!1;for(const l in this.morphAttributes){const d=this.morphAttributes[l],h=[];for(let u=0,f=d.length;u<f;u++){const a=d[u];h.push(a.toJSON(e.data))}h.length>0&&(s[l]=h,o=!0)}o&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere={center:c.center.toArray(),radius:c.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const d in s){const h=s[d];this.setAttribute(d,h.clone(t))}const o=e.morphAttributes;for(const d in o){const h=[],u=o[d];for(let f=0,a=u.length;f<a;f++)h.push(u[f].clone(t));this.morphAttributes[d]=h}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let d=0,h=r.length;d<h;d++){const u=r[d];this.addGroup(u.start,u.count,u.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Nc=new _t,wi=new iu,xo=new Kr,Bc=new z,Mo=new z,bo=new z,wo=new z,Pa=new z,To=new z,Fc=new z,Eo=new z;class C extends Ft{constructor(e=new Ot,t=new so){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=s.length;o<r;o++){const c=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=o}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,o=n.morphAttributes.position,r=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const c=this.morphTargetInfluences;if(o&&c){To.set(0,0,0);for(let l=0,d=o.length;l<d;l++){const h=c[l],u=o[l];h!==0&&(Pa.fromBufferAttribute(u,e),r?To.addScaledVector(Pa,h):To.addScaledVector(Pa.sub(t),h))}t.add(To)}return t}raycast(e,t){const n=this.geometry,s=this.material,o=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),xo.copy(n.boundingSphere),xo.applyMatrix4(o),wi.copy(e.ray).recast(e.near),!(xo.containsPoint(wi.origin)===!1&&(wi.intersectSphere(xo,Bc)===null||wi.origin.distanceToSquared(Bc)>(e.far-e.near)**2))&&(Nc.copy(o).invert(),wi.copy(e.ray).applyMatrix4(Nc),!(n.boundingBox!==null&&wi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,wi)))}_computeIntersections(e,t,n){let s;const o=this.geometry,r=this.material,c=o.index,l=o.attributes.position,d=o.attributes.uv,h=o.attributes.uv1,u=o.attributes.normal,f=o.groups,a=o.drawRange;if(c!==null)if(Array.isArray(r))for(let p=0,v=f.length;p<v;p++){const m=f[p],g=r[m.materialIndex],S=Math.max(m.start,a.start),_=Math.min(c.count,Math.min(m.start+m.count,a.start+a.count));for(let y=S,b=_;y<b;y+=3){const w=c.getX(y),T=c.getX(y+1),E=c.getX(y+2);s=Ao(this,g,e,n,d,h,u,w,T,E),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const p=Math.max(0,a.start),v=Math.min(c.count,a.start+a.count);for(let m=p,g=v;m<g;m+=3){const S=c.getX(m),_=c.getX(m+1),y=c.getX(m+2);s=Ao(this,r,e,n,d,h,u,S,_,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(r))for(let p=0,v=f.length;p<v;p++){const m=f[p],g=r[m.materialIndex],S=Math.max(m.start,a.start),_=Math.min(l.count,Math.min(m.start+m.count,a.start+a.count));for(let y=S,b=_;y<b;y+=3){const w=y,T=y+1,E=y+2;s=Ao(this,g,e,n,d,h,u,w,T,E),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const p=Math.max(0,a.start),v=Math.min(l.count,a.start+a.count);for(let m=p,g=v;m<g;m+=3){const S=m,_=m+1,y=m+2;s=Ao(this,r,e,n,d,h,u,S,_,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function uu(i,e,t,n,s,o,r,c){let l;if(e.side===Kt?l=n.intersectTriangle(r,o,s,!0,c):l=n.intersectTriangle(s,o,r,e.side===_i,c),l===null)return null;Eo.copy(c),Eo.applyMatrix4(i.matrixWorld);const d=t.ray.origin.distanceTo(Eo);return d<t.near||d>t.far?null:{distance:d,point:Eo.clone(),object:i}}function Ao(i,e,t,n,s,o,r,c,l,d){i.getVertexPosition(c,Mo),i.getVertexPosition(l,bo),i.getVertexPosition(d,wo);const h=uu(i,e,t,n,Mo,bo,wo,Fc);if(h){const u=new z;fn.getBarycoord(Fc,Mo,bo,wo,u),s&&(h.uv=fn.getInterpolatedAttribute(s,c,l,d,u,new ge)),o&&(h.uv1=fn.getInterpolatedAttribute(o,c,l,d,u,new ge)),r&&(h.normal=fn.getInterpolatedAttribute(r,c,l,d,u,new z),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a:c,b:l,c:d,normal:new z,materialIndex:0};fn.getNormal(Mo,bo,wo,f.normal),h.face=f,h.barycoord=u}return h}class Ue extends Ot{constructor(e=1,t=1,n=1,s=1,o=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:o,depthSegments:r};const c=this;s=Math.floor(s),o=Math.floor(o),r=Math.floor(r);const l=[],d=[],h=[],u=[];let f=0,a=0;p("z","y","x",-1,-1,n,t,e,r,o,0),p("z","y","x",1,-1,n,t,-e,r,o,1),p("x","z","y",1,1,e,n,t,s,r,2),p("x","z","y",1,-1,e,n,-t,s,r,3),p("x","y","z",1,-1,e,t,n,s,o,4),p("x","y","z",-1,-1,e,t,-n,s,o,5),this.setIndex(l),this.setAttribute("position",new tt(d,3)),this.setAttribute("normal",new tt(h,3)),this.setAttribute("uv",new tt(u,2));function p(v,m,g,S,_,y,b,w,T,E,M){const x=y/T,P=b/E,k=y/2,U=b/2,L=w/2,B=T+1,F=E+1;let G=0,O=0;const N=new z;for(let V=0;V<F;V++){const $=V*P-U;for(let he=0;he<B;he++){const _e=he*x-k;N[v]=_e*S,N[m]=$*_,N[g]=L,d.push(N.x,N.y,N.z),N[v]=0,N[m]=0,N[g]=w>0?1:-1,h.push(N.x,N.y,N.z),u.push(he/T),u.push(1-V/E),G+=1}}for(let V=0;V<E;V++)for(let $=0;$<T;$++){const he=f+$+B*V,_e=f+$+B*(V+1),Z=f+($+1)+B*(V+1),ne=f+($+1)+B*V;l.push(he,_e,ne),l.push(_e,Z,ne),O+=6}c.addGroup(a,O,M),a+=O,f+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ue(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function _s(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function $t(i){const e={};for(let t=0;t<i.length;t++){const n=_s(i[t]);for(const s in n)e[s]=n[s]}return e}function fu(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function gh(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:st.workingColorSpace}const pu={clone:_s,merge:$t};var mu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,gu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Nn extends bs{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=mu,this.fragmentShader=gu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=_s(e.uniforms),this.uniformsGroups=fu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const r=this.uniforms[s].value;r&&r.isTexture?t.uniforms[s]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[s]={type:"m4",value:r.toArray()}:t.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class vh extends Ft{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new _t,this.projectionMatrix=new _t,this.projectionMatrixInverse=new _t,this.coordinateSystem=Jn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const hi=new z,Gc=new ge,Oc=new ge;class rn extends vh{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ks*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(qs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ks*2*Math.atan(Math.tan(qs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){hi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(hi.x,hi.y).multiplyScalar(-e/hi.z),hi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(hi.x,hi.y).multiplyScalar(-e/hi.z)}getViewSize(e,t){return this.getViewBounds(e,Gc,Oc),t.subVectors(Oc,Gc)}setViewOffset(e,t,n,s,o,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(qs*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,o=-.5*s;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,d=r.fullHeight;o+=r.offsetX*s/l,t-=r.offsetY*n/d,s*=r.width/l,n*=r.height/d}const c=this.filmOffset;c!==0&&(o+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ji=-90,Ki=1;class vu extends Ft{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new rn(ji,Ki,e,t);s.layers=this.layers,this.add(s);const o=new rn(ji,Ki,e,t);o.layers=this.layers,this.add(o);const r=new rn(ji,Ki,e,t);r.layers=this.layers,this.add(r);const c=new rn(ji,Ki,e,t);c.layers=this.layers,this.add(c);const l=new rn(ji,Ki,e,t);l.layers=this.layers,this.add(l);const d=new rn(ji,Ki,e,t);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,o,r,c,l]=t;for(const d of t)this.remove(d);if(e===Jn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ko)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const d of t)this.add(d),d.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[o,r,c,l,d,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),a=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,o),e.setRenderTarget(n,1,s),e.render(t,r),e.setRenderTarget(n,2,s),e.render(t,c),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,d),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,f,a),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class yh extends qt{constructor(e,t,n,s,o,r,c,l,d,h){e=e!==void 0?e:[],t=t!==void 0?t:ms,super(e,t,n,s,o,r,c,l,d,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class yu extends Ui{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new yh(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Dn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ue(5,5,5),o=new Nn({name:"CubemapFromEquirect",uniforms:_s(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Kt,blending:gi});o.uniforms.tEquirect.value=t;const r=new C(s,o),c=t.minFilter;return t.minFilter===Di&&(t.minFilter=Dn),new vu(1,10,this).update(e,r),t.minFilter=c,r.geometry.dispose(),r.material.dispose(),this}clear(e,t,n,s){const o=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,n,s);e.setRenderTarget(o)}}const Ra=new z,_u=new z,Su=new Ke;class Pi{constructor(e=new z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Ra.subVectors(n,t).cross(_u.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Ra),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/s;return o<0||o>1?null:t.copy(e.start).addScaledVector(n,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Su.getNormalMatrix(e),s=this.coplanarPoint(Ra).applyMatrix4(e),o=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(o),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ti=new Kr,Co=new z;class Jr{constructor(e=new Pi,t=new Pi,n=new Pi,s=new Pi,o=new Pi,r=new Pi){this.planes=[e,t,n,s,o,r]}set(e,t,n,s,o,r){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(n),c[3].copy(s),c[4].copy(o),c[5].copy(r),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Jn){const n=this.planes,s=e.elements,o=s[0],r=s[1],c=s[2],l=s[3],d=s[4],h=s[5],u=s[6],f=s[7],a=s[8],p=s[9],v=s[10],m=s[11],g=s[12],S=s[13],_=s[14],y=s[15];if(n[0].setComponents(l-o,f-d,m-a,y-g).normalize(),n[1].setComponents(l+o,f+d,m+a,y+g).normalize(),n[2].setComponents(l+r,f+h,m+p,y+S).normalize(),n[3].setComponents(l-r,f-h,m-p,y-S).normalize(),n[4].setComponents(l-c,f-u,m-v,y-_).normalize(),t===Jn)n[5].setComponents(l+c,f+u,m+v,y+_).normalize();else if(t===Ko)n[5].setComponents(c,u,v,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ti.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ti.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ti)}intersectsSprite(e){return Ti.center.set(0,0,0),Ti.radius=.7071067811865476,Ti.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ti)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let o=0;o<6;o++)if(t[o].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Co.x=s.normal.x>0?e.max.x:e.min.x,Co.y=s.normal.y>0?e.max.y:e.min.y,Co.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Co)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function _h(){let i=null,e=!1,t=null,n=null;function s(o,r){t(o,r),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(o){t=o},setContext:function(o){i=o}}}function xu(i){const e=new WeakMap;function t(c,l){const d=c.array,h=c.usage,u=d.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,d,h),c.onUploadCallback();let a;if(d instanceof Float32Array)a=i.FLOAT;else if(d instanceof Uint16Array)c.isFloat16BufferAttribute?a=i.HALF_FLOAT:a=i.UNSIGNED_SHORT;else if(d instanceof Int16Array)a=i.SHORT;else if(d instanceof Uint32Array)a=i.UNSIGNED_INT;else if(d instanceof Int32Array)a=i.INT;else if(d instanceof Int8Array)a=i.BYTE;else if(d instanceof Uint8Array)a=i.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)a=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:f,type:a,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:u}}function n(c,l,d){const h=l.array,u=l.updateRanges;if(i.bindBuffer(d,c),u.length===0)i.bufferSubData(d,0,h);else{u.sort((a,p)=>a.start-p.start);let f=0;for(let a=1;a<u.length;a++){const p=u[f],v=u[a];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++f,u[f]=v)}u.length=f+1;for(let a=0,p=u.length;a<p;a++){const v=u[a];i.bufferSubData(d,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(c){return c.isInterleavedBufferAttribute&&(c=c.data),e.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const l=e.get(c);l&&(i.deleteBuffer(l.buffer),e.delete(c))}function r(c,l){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const h=e.get(c);(!h||h.version<c.version)&&e.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const d=e.get(c);if(d===void 0)e.set(c,t(c,l));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(d.buffer,c,l),d.version=c.version}}return{get:s,remove:o,update:r}}class Jt extends Ot{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const o=e/2,r=t/2,c=Math.floor(n),l=Math.floor(s),d=c+1,h=l+1,u=e/c,f=t/l,a=[],p=[],v=[],m=[];for(let g=0;g<h;g++){const S=g*f-r;for(let _=0;_<d;_++){const y=_*u-o;p.push(y,-S,0),v.push(0,0,1),m.push(_/c),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let S=0;S<c;S++){const _=S+d*g,y=S+d*(g+1),b=S+1+d*(g+1),w=S+1+d*g;a.push(_,y,w),a.push(y,b,w)}this.setIndex(a),this.setAttribute("position",new tt(p,3)),this.setAttribute("normal",new tt(v,3)),this.setAttribute("uv",new tt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jt(e.width,e.height,e.widthSegments,e.heightSegments)}}var Mu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,bu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,wu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Tu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Eu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Au=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Cu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Pu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ru=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Iu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Lu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Du=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ku=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,zu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Uu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Nu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Bu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Fu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Gu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ou=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Vu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Hu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Wu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Xu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,qu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Yu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Zu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$u=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ju=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ku=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ju="gl_FragColor = linearToOutputTexel( gl_FragColor );",Qu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ef=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,tf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,nf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,sf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,of=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,af=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,rf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,cf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,lf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,hf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,df=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,uf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ff=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,pf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,mf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,gf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,vf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,yf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_f=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Sf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,xf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Mf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,bf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,wf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Tf=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ef=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Af=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Pf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Rf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,If=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Lf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Df=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,kf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,zf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Uf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Nf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Ff=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Gf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Of=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Vf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Xf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,qf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Yf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Zf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,$f=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,jf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Kf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Jf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Qf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ep=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,tp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,np=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ip=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,sp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,op=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ap=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,rp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,cp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,lp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,hp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,dp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,up=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,fp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,pp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,mp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,gp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,vp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,yp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,_p=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Sp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,xp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Mp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ep=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ap=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Pp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Rp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Ip=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Lp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Dp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,zp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Up=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Np=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Op=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Hp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Wp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Yp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$p=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Kp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Jp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,e0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,t0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Qe={alphahash_fragment:Mu,alphahash_pars_fragment:bu,alphamap_fragment:wu,alphamap_pars_fragment:Tu,alphatest_fragment:Eu,alphatest_pars_fragment:Au,aomap_fragment:Cu,aomap_pars_fragment:Pu,batching_pars_vertex:Ru,batching_vertex:Iu,begin_vertex:Lu,beginnormal_vertex:Du,bsdfs:ku,iridescence_fragment:zu,bumpmap_pars_fragment:Uu,clipping_planes_fragment:Nu,clipping_planes_pars_fragment:Bu,clipping_planes_pars_vertex:Fu,clipping_planes_vertex:Gu,color_fragment:Ou,color_pars_fragment:Vu,color_pars_vertex:Hu,color_vertex:Wu,common:Xu,cube_uv_reflection_fragment:qu,defaultnormal_vertex:Yu,displacementmap_pars_vertex:Zu,displacementmap_vertex:$u,emissivemap_fragment:ju,emissivemap_pars_fragment:Ku,colorspace_fragment:Ju,colorspace_pars_fragment:Qu,envmap_fragment:ef,envmap_common_pars_fragment:tf,envmap_pars_fragment:nf,envmap_pars_vertex:sf,envmap_physical_pars_fragment:mf,envmap_vertex:of,fog_vertex:af,fog_pars_vertex:rf,fog_fragment:cf,fog_pars_fragment:lf,gradientmap_pars_fragment:hf,lightmap_pars_fragment:df,lights_lambert_fragment:uf,lights_lambert_pars_fragment:ff,lights_pars_begin:pf,lights_toon_fragment:gf,lights_toon_pars_fragment:vf,lights_phong_fragment:yf,lights_phong_pars_fragment:_f,lights_physical_fragment:Sf,lights_physical_pars_fragment:xf,lights_fragment_begin:Mf,lights_fragment_maps:bf,lights_fragment_end:wf,logdepthbuf_fragment:Tf,logdepthbuf_pars_fragment:Ef,logdepthbuf_pars_vertex:Af,logdepthbuf_vertex:Cf,map_fragment:Pf,map_pars_fragment:Rf,map_particle_fragment:If,map_particle_pars_fragment:Lf,metalnessmap_fragment:Df,metalnessmap_pars_fragment:kf,morphinstance_vertex:zf,morphcolor_vertex:Uf,morphnormal_vertex:Nf,morphtarget_pars_vertex:Bf,morphtarget_vertex:Ff,normal_fragment_begin:Gf,normal_fragment_maps:Of,normal_pars_fragment:Vf,normal_pars_vertex:Hf,normal_vertex:Wf,normalmap_pars_fragment:Xf,clearcoat_normal_fragment_begin:qf,clearcoat_normal_fragment_maps:Yf,clearcoat_pars_fragment:Zf,iridescence_pars_fragment:$f,opaque_fragment:jf,packing:Kf,premultiplied_alpha_fragment:Jf,project_vertex:Qf,dithering_fragment:ep,dithering_pars_fragment:tp,roughnessmap_fragment:np,roughnessmap_pars_fragment:ip,shadowmap_pars_fragment:sp,shadowmap_pars_vertex:op,shadowmap_vertex:ap,shadowmask_pars_fragment:rp,skinbase_vertex:cp,skinning_pars_vertex:lp,skinning_vertex:hp,skinnormal_vertex:dp,specularmap_fragment:up,specularmap_pars_fragment:fp,tonemapping_fragment:pp,tonemapping_pars_fragment:mp,transmission_fragment:gp,transmission_pars_fragment:vp,uv_pars_fragment:yp,uv_pars_vertex:_p,uv_vertex:Sp,worldpos_vertex:xp,background_vert:Mp,background_frag:bp,backgroundCube_vert:wp,backgroundCube_frag:Tp,cube_vert:Ep,cube_frag:Ap,depth_vert:Cp,depth_frag:Pp,distanceRGBA_vert:Rp,distanceRGBA_frag:Ip,equirect_vert:Lp,equirect_frag:Dp,linedashed_vert:kp,linedashed_frag:zp,meshbasic_vert:Up,meshbasic_frag:Np,meshlambert_vert:Bp,meshlambert_frag:Fp,meshmatcap_vert:Gp,meshmatcap_frag:Op,meshnormal_vert:Vp,meshnormal_frag:Hp,meshphong_vert:Wp,meshphong_frag:Xp,meshphysical_vert:qp,meshphysical_frag:Yp,meshtoon_vert:Zp,meshtoon_frag:$p,points_vert:jp,points_frag:Kp,shadow_vert:Jp,shadow_frag:Qp,sprite_vert:e0,sprite_frag:t0},Ce={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new ge(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new ge(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},Rn={basic:{uniforms:$t([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.fog]),vertexShader:Qe.meshbasic_vert,fragmentShader:Qe.meshbasic_frag},lambert:{uniforms:$t([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new Ye(0)}}]),vertexShader:Qe.meshlambert_vert,fragmentShader:Qe.meshlambert_frag},phong:{uniforms:$t([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30}}]),vertexShader:Qe.meshphong_vert,fragmentShader:Qe.meshphong_frag},standard:{uniforms:$t([Ce.common,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.roughnessmap,Ce.metalnessmap,Ce.fog,Ce.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag},toon:{uniforms:$t([Ce.common,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.gradientmap,Ce.fog,Ce.lights,{emissive:{value:new Ye(0)}}]),vertexShader:Qe.meshtoon_vert,fragmentShader:Qe.meshtoon_frag},matcap:{uniforms:$t([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,{matcap:{value:null}}]),vertexShader:Qe.meshmatcap_vert,fragmentShader:Qe.meshmatcap_frag},points:{uniforms:$t([Ce.points,Ce.fog]),vertexShader:Qe.points_vert,fragmentShader:Qe.points_frag},dashed:{uniforms:$t([Ce.common,Ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qe.linedashed_vert,fragmentShader:Qe.linedashed_frag},depth:{uniforms:$t([Ce.common,Ce.displacementmap]),vertexShader:Qe.depth_vert,fragmentShader:Qe.depth_frag},normal:{uniforms:$t([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,{opacity:{value:1}}]),vertexShader:Qe.meshnormal_vert,fragmentShader:Qe.meshnormal_frag},sprite:{uniforms:$t([Ce.sprite,Ce.fog]),vertexShader:Qe.sprite_vert,fragmentShader:Qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qe.background_vert,fragmentShader:Qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:Qe.backgroundCube_vert,fragmentShader:Qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qe.cube_vert,fragmentShader:Qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qe.equirect_vert,fragmentShader:Qe.equirect_frag},distanceRGBA:{uniforms:$t([Ce.common,Ce.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qe.distanceRGBA_vert,fragmentShader:Qe.distanceRGBA_frag},shadow:{uniforms:$t([Ce.lights,Ce.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:Qe.shadow_vert,fragmentShader:Qe.shadow_frag}};Rn.physical={uniforms:$t([Rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new ge(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new ge},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new ge},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag};const Po={r:0,b:0,g:0},Ei=new Un,n0=new _t;function i0(i,e,t,n,s,o,r){const c=new Ye(0);let l=o===!0?0:1,d,h,u=null,f=0,a=null;function p(S){let _=S.isScene===!0?S.background:null;return _&&_.isTexture&&(_=(S.backgroundBlurriness>0?t:e).get(_)),_}function v(S){let _=!1;const y=p(S);y===null?g(c,l):y&&y.isColor&&(g(y,1),_=!0);const b=i.xr.getEnvironmentBlendMode();b==="additive"?n.buffers.color.setClear(0,0,0,1,r):b==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(i.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(S,_){const y=p(_);y&&(y.isCubeTexture||y.mapping===na)?(h===void 0&&(h=new C(new Ue(1,1,1),new Nn({name:"BackgroundCubeMaterial",uniforms:_s(Rn.backgroundCube.uniforms),vertexShader:Rn.backgroundCube.vertexShader,fragmentShader:Rn.backgroundCube.fragmentShader,side:Kt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(b,w,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Ei.copy(_.backgroundRotation),Ei.x*=-1,Ei.y*=-1,Ei.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Ei.y*=-1,Ei.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(n0.makeRotationFromEuler(Ei)),h.material.toneMapped=st.getTransfer(y.colorSpace)!==ft,(u!==y||f!==y.version||a!==i.toneMapping)&&(h.material.needsUpdate=!0,u=y,f=y.version,a=i.toneMapping),h.layers.enableAll(),S.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(d===void 0&&(d=new C(new Jt(2,2),new Nn({name:"BackgroundMaterial",uniforms:_s(Rn.background.uniforms),vertexShader:Rn.background.vertexShader,fragmentShader:Rn.background.fragmentShader,side:_i,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),Object.defineProperty(d.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(d)),d.material.uniforms.t2D.value=y,d.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,d.material.toneMapped=st.getTransfer(y.colorSpace)!==ft,y.matrixAutoUpdate===!0&&y.updateMatrix(),d.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||f!==y.version||a!==i.toneMapping)&&(d.material.needsUpdate=!0,u=y,f=y.version,a=i.toneMapping),d.layers.enableAll(),S.unshift(d,d.geometry,d.material,0,0,null))}function g(S,_){S.getRGB(Po,gh(i)),n.buffers.color.setClear(Po.r,Po.g,Po.b,_,r)}return{getClearColor:function(){return c},setClearColor:function(S,_=1){c.set(S),l=_,g(c,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,g(c,l)},render:v,addToRenderList:m}}function s0(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let o=s,r=!1;function c(x,P,k,U,L){let B=!1;const F=u(U,k,P);o!==F&&(o=F,d(o.object)),B=a(x,U,k,L),B&&p(x,U,k,L),L!==null&&e.update(L,i.ELEMENT_ARRAY_BUFFER),(B||r)&&(r=!1,y(x,P,k,U),L!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(L).buffer))}function l(){return i.createVertexArray()}function d(x){return i.bindVertexArray(x)}function h(x){return i.deleteVertexArray(x)}function u(x,P,k){const U=k.wireframe===!0;let L=n[x.id];L===void 0&&(L={},n[x.id]=L);let B=L[P.id];B===void 0&&(B={},L[P.id]=B);let F=B[U];return F===void 0&&(F=f(l()),B[U]=F),F}function f(x){const P=[],k=[],U=[];for(let L=0;L<t;L++)P[L]=0,k[L]=0,U[L]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:k,attributeDivisors:U,object:x,attributes:{},index:null}}function a(x,P,k,U){const L=o.attributes,B=P.attributes;let F=0;const G=k.getAttributes();for(const O in G)if(G[O].location>=0){const V=L[O];let $=B[O];if($===void 0&&(O==="instanceMatrix"&&x.instanceMatrix&&($=x.instanceMatrix),O==="instanceColor"&&x.instanceColor&&($=x.instanceColor)),V===void 0||V.attribute!==$||$&&V.data!==$.data)return!0;F++}return o.attributesNum!==F||o.index!==U}function p(x,P,k,U){const L={},B=P.attributes;let F=0;const G=k.getAttributes();for(const O in G)if(G[O].location>=0){let V=B[O];V===void 0&&(O==="instanceMatrix"&&x.instanceMatrix&&(V=x.instanceMatrix),O==="instanceColor"&&x.instanceColor&&(V=x.instanceColor));const $={};$.attribute=V,V&&V.data&&($.data=V.data),L[O]=$,F++}o.attributes=L,o.attributesNum=F,o.index=U}function v(){const x=o.newAttributes;for(let P=0,k=x.length;P<k;P++)x[P]=0}function m(x){g(x,0)}function g(x,P){const k=o.newAttributes,U=o.enabledAttributes,L=o.attributeDivisors;k[x]=1,U[x]===0&&(i.enableVertexAttribArray(x),U[x]=1),L[x]!==P&&(i.vertexAttribDivisor(x,P),L[x]=P)}function S(){const x=o.newAttributes,P=o.enabledAttributes;for(let k=0,U=P.length;k<U;k++)P[k]!==x[k]&&(i.disableVertexAttribArray(k),P[k]=0)}function _(x,P,k,U,L,B,F){F===!0?i.vertexAttribIPointer(x,P,k,L,B):i.vertexAttribPointer(x,P,k,U,L,B)}function y(x,P,k,U){v();const L=U.attributes,B=k.getAttributes(),F=P.defaultAttributeValues;for(const G in B){const O=B[G];if(O.location>=0){let N=L[G];if(N===void 0&&(G==="instanceMatrix"&&x.instanceMatrix&&(N=x.instanceMatrix),G==="instanceColor"&&x.instanceColor&&(N=x.instanceColor)),N!==void 0){const V=N.normalized,$=N.itemSize,he=e.get(N);if(he===void 0)continue;const _e=he.buffer,Z=he.type,ne=he.bytesPerElement,fe=Z===i.INT||Z===i.UNSIGNED_INT||N.gpuType===Wr;if(N.isInterleavedBufferAttribute){const q=N.data,ee=q.stride,K=N.offset;if(q.isInstancedInterleavedBuffer){for(let oe=0;oe<O.locationSize;oe++)g(O.location+oe,q.meshPerAttribute);x.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let oe=0;oe<O.locationSize;oe++)m(O.location+oe);i.bindBuffer(i.ARRAY_BUFFER,_e);for(let oe=0;oe<O.locationSize;oe++)_(O.location+oe,$/O.locationSize,Z,V,ee*ne,(K+$/O.locationSize*oe)*ne,fe)}else{if(N.isInstancedBufferAttribute){for(let q=0;q<O.locationSize;q++)g(O.location+q,N.meshPerAttribute);x.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=N.meshPerAttribute*N.count)}else for(let q=0;q<O.locationSize;q++)m(O.location+q);i.bindBuffer(i.ARRAY_BUFFER,_e);for(let q=0;q<O.locationSize;q++)_(O.location+q,$/O.locationSize,Z,V,$*ne,$/O.locationSize*q*ne,fe)}}else if(F!==void 0){const V=F[G];if(V!==void 0)switch(V.length){case 2:i.vertexAttrib2fv(O.location,V);break;case 3:i.vertexAttrib3fv(O.location,V);break;case 4:i.vertexAttrib4fv(O.location,V);break;default:i.vertexAttrib1fv(O.location,V)}}}}S()}function b(){E();for(const x in n){const P=n[x];for(const k in P){const U=P[k];for(const L in U)h(U[L].object),delete U[L];delete P[k]}delete n[x]}}function w(x){if(n[x.id]===void 0)return;const P=n[x.id];for(const k in P){const U=P[k];for(const L in U)h(U[L].object),delete U[L];delete P[k]}delete n[x.id]}function T(x){for(const P in n){const k=n[P];if(k[x.id]===void 0)continue;const U=k[x.id];for(const L in U)h(U[L].object),delete U[L];delete k[x.id]}}function E(){M(),r=!0,o!==s&&(o=s,d(o.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:c,reset:E,resetDefaultState:M,dispose:b,releaseStatesOfGeometry:w,releaseStatesOfProgram:T,initAttributes:v,enableAttribute:m,disableUnusedAttributes:S}}function o0(i,e,t){let n;function s(d){n=d}function o(d,h){i.drawArrays(n,d,h),t.update(h,n,1)}function r(d,h,u){u!==0&&(i.drawArraysInstanced(n,d,h,u),t.update(h,n,u))}function c(d,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,d,0,h,0,u);let a=0;for(let p=0;p<u;p++)a+=h[p];t.update(a,n,1)}function l(d,h,u,f){if(u===0)return;const a=e.get("WEBGL_multi_draw");if(a===null)for(let p=0;p<d.length;p++)r(d[p],h[p],f[p]);else{a.multiDrawArraysInstancedWEBGL(n,d,0,h,0,f,0,u);let p=0;for(let v=0;v<u;v++)p+=h[v]*f[v];t.update(p,n,1)}}this.setMode=s,this.render=o,this.renderInstances=r,this.renderMultiDraw=c,this.renderMultiDrawInstances=l}function a0(i,e,t,n){let s;function o(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(T){return!(T!==Tn&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(T){const E=T===no&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==ni&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==Kn&&!E)}function l(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let d=t.precision!==void 0?t.precision:"highp";const h=l(d);h!==d&&(console.warn("THREE.WebGLRenderer:",d,"not supported, using",h,"instead."),d=h);const u=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),a=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),_=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),b=p>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:c,precision:d,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:a,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:S,maxVaryings:_,maxFragmentUniforms:y,vertexTextures:b,maxSamples:w}}function r0(i){const e=this;let t=null,n=0,s=!1,o=!1;const r=new Pi,c=new Ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const a=u.length!==0||f||n!==0||s;return s=f,n=u.length,a},this.beginShadows=function(){o=!0,h(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,a){const p=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,g=i.get(u);if(!s||p===null||p.length===0||o&&!m)o?h(null):d();else{const S=o?0:n,_=S*4;let y=g.clippingState||null;l.value=y,y=h(p,f,_,a);for(let b=0;b!==_;++b)y[b]=t[b];g.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=S}};function d(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,a,p){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,p!==!0||m===null){const g=a+v*4,S=f.matrixWorldInverse;c.getNormalMatrix(S),(m===null||m.length<g)&&(m=new Float32Array(g));for(let _=0,y=a;_!==v;++_,y+=4)r.copy(u[_]).applyMatrix4(S,c),r.normal.toArray(m,y),m[y+3]=r.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function c0(i){let e=new WeakMap;function t(r,c){return c===sr?r.mapping=ms:c===or&&(r.mapping=gs),r}function n(r){if(r&&r.isTexture){const c=r.mapping;if(c===sr||c===or)if(e.has(r)){const l=e.get(r).texture;return t(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const d=new yu(l.height);return d.fromEquirectangularTexture(i,r),e.set(r,d),r.addEventListener("dispose",s),t(d.texture,r.mapping)}else return null}}return r}function s(r){const c=r.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap}return{get:n,dispose:o}}class Sh extends vh{constructor(e=-1,t=1,n=1,s=-1,o=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=o,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,o,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let o=n-e,r=n+e,c=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=d*this.view.offsetX,r=o+d*this.view.width,c-=h*this.view.offsetY,l=c-h*this.view.height}this.projectionMatrix.makeOrthographic(o,r,c,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const cs=4,Vc=[.125,.215,.35,.446,.526,.582],Li=20,Ia=new Sh,Hc=new Ye;let La=null,Da=0,ka=0,za=!1;const Ri=(1+Math.sqrt(5))/2,Ji=1/Ri,Wc=[new z(-Ri,Ji,0),new z(Ri,Ji,0),new z(-Ji,0,Ri),new z(Ji,0,Ri),new z(0,Ri,-Ji),new z(0,Ri,Ji),new z(-1,1,-1),new z(1,1,-1),new z(-1,1,1),new z(1,1,1)];class Xc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){La=this._renderer.getRenderTarget(),Da=this._renderer.getActiveCubeFace(),ka=this._renderer.getActiveMipmapLevel(),za=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,n,s,o),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Zc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Yc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(La,Da,ka),this._renderer.xr.enabled=za,e.scissorTest=!1,Ro(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ms||e.mapping===gs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),La=this._renderer.getRenderTarget(),Da=this._renderer.getActiveCubeFace(),ka=this._renderer.getActiveMipmapLevel(),za=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Dn,minFilter:Dn,generateMipmaps:!1,type:no,format:Tn,colorSpace:Ss,depthBuffer:!1},s=qc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=qc(e,t,n);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=l0(o)),this._blurMaterial=h0(o,e,t)}return s}_compileMaterial(e){const t=new C(this._lodPlanes[0],e);this._renderer.compile(t,Ia)}_sceneToCubeUV(e,t,n,s){const c=new rn(90,1,t,n),l=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Hc),h.toneMapping=vi,h.autoClear=!1;const a=new so({name:"PMREM.Background",side:Kt,depthWrite:!1,depthTest:!1}),p=new C(new Ue,a);let v=!1;const m=e.background;m?m.isColor&&(a.color.copy(m),e.background=null,v=!0):(a.color.copy(Hc),v=!0);for(let g=0;g<6;g++){const S=g%3;S===0?(c.up.set(0,l[g],0),c.lookAt(d[g],0,0)):S===1?(c.up.set(0,0,l[g]),c.lookAt(0,d[g],0)):(c.up.set(0,l[g],0),c.lookAt(0,0,d[g]));const _=this._cubeSize;Ro(s,S*_,g>2?_:0,_,_),h.setRenderTarget(s),v&&h.render(p,c),h.render(e,c)}p.geometry.dispose(),p.material.dispose(),h.toneMapping=f,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===ms||e.mapping===gs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Zc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Yc());const o=s?this._cubemapMaterial:this._equirectMaterial,r=new C(this._lodPlanes[0],o),c=o.uniforms;c.envMap.value=e;const l=this._cubeSize;Ro(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(r,Ia)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let o=1;o<s;o++){const r=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),c=Wc[(s-o-1)%Wc.length];this._blur(e,o-1,o,r,c)}t.autoClear=n}_blur(e,t,n,s,o){const r=this._pingPongRenderTarget;this._halfBlur(e,r,t,n,s,"latitudinal",o),this._halfBlur(r,e,n,n,s,"longitudinal",o)}_halfBlur(e,t,n,s,o,r,c){const l=this._renderer,d=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new C(this._lodPlanes[s],d),f=d.uniforms,a=this._sizeLods[n]-1,p=isFinite(o)?Math.PI/(2*a):2*Math.PI/(2*Li-1),v=o/p,m=isFinite(o)?1+Math.floor(h*v):Li;m>Li&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Li}`);const g=[];let S=0;for(let T=0;T<Li;++T){const E=T/v,M=Math.exp(-E*E/2);g.push(M),T===0?S+=M:T<m&&(S+=2*M)}for(let T=0;T<g.length;T++)g[T]=g[T]/S;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=g,f.latitudinal.value=r==="latitudinal",c&&(f.poleAxis.value=c);const{_lodMax:_}=this;f.dTheta.value=p,f.mipInt.value=_-n;const y=this._sizeLods[s],b=3*y*(s>_-cs?s-_+cs:0),w=4*(this._cubeSize-y);Ro(t,b,w,3*y,2*y),l.setRenderTarget(t),l.render(u,Ia)}}function l0(i){const e=[],t=[],n=[];let s=i;const o=i-cs+1+Vc.length;for(let r=0;r<o;r++){const c=Math.pow(2,s);t.push(c);let l=1/c;r>i-cs?l=Vc[r-i+cs-1]:r===0&&(l=0),n.push(l);const d=1/(c-2),h=-d,u=1+d,f=[h,h,u,h,u,u,h,h,u,u,h,u],a=6,p=6,v=3,m=2,g=1,S=new Float32Array(v*p*a),_=new Float32Array(m*p*a),y=new Float32Array(g*p*a);for(let w=0;w<a;w++){const T=w%3*2/3-1,E=w>2?0:-1,M=[T,E,0,T+2/3,E,0,T+2/3,E+1,0,T,E,0,T+2/3,E+1,0,T,E+1,0];S.set(M,v*p*w),_.set(f,m*p*w);const x=[w,w,w,w,w,w];y.set(x,g*p*w)}const b=new Ot;b.setAttribute("position",new An(S,v)),b.setAttribute("uv",new An(_,m)),b.setAttribute("faceIndex",new An(y,g)),e.push(b),s>cs&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function qc(i,e,t){const n=new Ui(i,e,t);return n.texture.mapping=na,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ro(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function h0(i,e,t){const n=new Float32Array(Li),s=new z(0,1,0);return new Nn({name:"SphericalGaussianBlur",defines:{n:Li,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Qr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Yc(){return new Nn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Qr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Zc(){return new Nn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Qr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Qr(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function d0(i){let e=new WeakMap,t=null;function n(c){if(c&&c.isTexture){const l=c.mapping,d=l===sr||l===or,h=l===ms||l===gs;if(d||h){let u=e.get(c);const f=u!==void 0?u.texture.pmremVersion:0;if(c.isRenderTargetTexture&&c.pmremVersion!==f)return t===null&&(t=new Xc(i)),u=d?t.fromEquirectangular(c,u):t.fromCubemap(c,u),u.texture.pmremVersion=c.pmremVersion,e.set(c,u),u.texture;if(u!==void 0)return u.texture;{const a=c.image;return d&&a&&a.height>0||h&&a&&s(a)?(t===null&&(t=new Xc(i)),u=d?t.fromEquirectangular(c):t.fromCubemap(c),u.texture.pmremVersion=c.pmremVersion,e.set(c,u),c.addEventListener("dispose",o),u.texture):null}}}return c}function s(c){let l=0;const d=6;for(let h=0;h<d;h++)c[h]!==void 0&&l++;return l===d}function o(c){const l=c.target;l.removeEventListener("dispose",o);const d=e.get(l);d!==void 0&&(e.delete(l),d.dispose())}function r(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:r}}function u0(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Vs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function f0(i,e,t,n){const s={},o=new WeakMap;function r(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const p in f.attributes)e.remove(f.attributes[p]);for(const p in f.morphAttributes){const v=f.morphAttributes[p];for(let m=0,g=v.length;m<g;m++)e.remove(v[m])}f.removeEventListener("dispose",r),delete s[f.id];const a=o.get(f);a&&(e.remove(a),o.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function c(u,f){return s[f.id]===!0||(f.addEventListener("dispose",r),s[f.id]=!0,t.memory.geometries++),f}function l(u){const f=u.attributes;for(const p in f)e.update(f[p],i.ARRAY_BUFFER);const a=u.morphAttributes;for(const p in a){const v=a[p];for(let m=0,g=v.length;m<g;m++)e.update(v[m],i.ARRAY_BUFFER)}}function d(u){const f=[],a=u.index,p=u.attributes.position;let v=0;if(a!==null){const S=a.array;v=a.version;for(let _=0,y=S.length;_<y;_+=3){const b=S[_+0],w=S[_+1],T=S[_+2];f.push(b,w,w,T,T,b)}}else if(p!==void 0){const S=p.array;v=p.version;for(let _=0,y=S.length/3-1;_<y;_+=3){const b=_+0,w=_+1,T=_+2;f.push(b,w,w,T,T,b)}}else return;const m=new(lh(f)?mh:ph)(f,1);m.version=v;const g=o.get(u);g&&e.remove(g),o.set(u,m)}function h(u){const f=o.get(u);if(f){const a=u.index;a!==null&&f.version<a.version&&d(u)}else d(u);return o.get(u)}return{get:c,update:l,getWireframeAttribute:h}}function p0(i,e,t){let n;function s(f){n=f}let o,r;function c(f){o=f.type,r=f.bytesPerElement}function l(f,a){i.drawElements(n,a,o,f*r),t.update(a,n,1)}function d(f,a,p){p!==0&&(i.drawElementsInstanced(n,a,o,f*r,p),t.update(a,n,p))}function h(f,a,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,a,0,o,f,0,p);let m=0;for(let g=0;g<p;g++)m+=a[g];t.update(m,n,1)}function u(f,a,p,v){if(p===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<f.length;g++)d(f[g]/r,a[g],v[g]);else{m.multiDrawElementsInstancedWEBGL(n,a,0,o,f,0,v,0,p);let g=0;for(let S=0;S<p;S++)g+=a[S]*v[S];t.update(g,n,1)}}this.setMode=s,this.setIndex=c,this.render=l,this.renderInstances=d,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function m0(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,r,c){switch(t.calls++,r){case i.TRIANGLES:t.triangles+=c*(o/3);break;case i.LINES:t.lines+=c*(o/2);break;case i.LINE_STRIP:t.lines+=c*(o-1);break;case i.LINE_LOOP:t.lines+=c*o;break;case i.POINTS:t.points+=c*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function g0(i,e,t){const n=new WeakMap,s=new Ct;function o(r,c,l){const d=r.morphTargetInfluences,h=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(c);if(f===void 0||f.count!==u){let x=function(){E.dispose(),n.delete(c),c.removeEventListener("dispose",x)};var a=x;f!==void 0&&f.texture.dispose();const p=c.morphAttributes.position!==void 0,v=c.morphAttributes.normal!==void 0,m=c.morphAttributes.color!==void 0,g=c.morphAttributes.position||[],S=c.morphAttributes.normal||[],_=c.morphAttributes.color||[];let y=0;p===!0&&(y=1),v===!0&&(y=2),m===!0&&(y=3);let b=c.attributes.position.count*y,w=1;b>e.maxTextureSize&&(w=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const T=new Float32Array(b*w*4*u),E=new dh(T,b,w,u);E.type=Kn,E.needsUpdate=!0;const M=y*4;for(let P=0;P<u;P++){const k=g[P],U=S[P],L=_[P],B=b*w*4*P;for(let F=0;F<k.count;F++){const G=F*M;p===!0&&(s.fromBufferAttribute(k,F),T[B+G+0]=s.x,T[B+G+1]=s.y,T[B+G+2]=s.z,T[B+G+3]=0),v===!0&&(s.fromBufferAttribute(U,F),T[B+G+4]=s.x,T[B+G+5]=s.y,T[B+G+6]=s.z,T[B+G+7]=0),m===!0&&(s.fromBufferAttribute(L,F),T[B+G+8]=s.x,T[B+G+9]=s.y,T[B+G+10]=s.z,T[B+G+11]=L.itemSize===4?s.w:1)}}f={count:u,texture:E,size:new ge(b,w)},n.set(c,f),c.addEventListener("dispose",x)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",r.morphTexture,t);else{let p=0;for(let m=0;m<d.length;m++)p+=d[m];const v=c.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",d)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:o}}function v0(i,e,t,n){let s=new WeakMap;function o(l){const d=n.render.frame,h=l.geometry,u=e.get(l,h);if(s.get(u)!==d&&(e.update(u),s.set(u,d)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==d&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,d))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==d&&(f.update(),s.set(f,d))}return u}function r(){s=new WeakMap}function c(l){const d=l.target;d.removeEventListener("dispose",c),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:o,dispose:r}}class xh extends qt{constructor(e,t,n,s,o,r,c,l,d,h=ds){if(h!==ds&&h!==ys)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===ds&&(n=zi),n===void 0&&h===ys&&(n=vs),super(null,s,o,r,c,l,h,n,d),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=c!==void 0?c:En,this.minFilter=l!==void 0?l:En,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Mh=new qt,$c=new xh(1,1),bh=new dh,wh=new tu,Th=new yh,jc=[],Kc=[],Jc=new Float32Array(16),Qc=new Float32Array(9),el=new Float32Array(4);function ws(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let o=jc[s];if(o===void 0&&(o=new Float32Array(s),jc[s]=o),e!==0){n.toArray(o,0);for(let r=1,c=0;r!==e;++r)c+=t,i[r].toArray(o,c)}return o}function kt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function zt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function sa(i,e){let t=Kc[e];t===void 0&&(t=new Int32Array(e),Kc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function y0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function _0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2fv(this.addr,e),zt(t,e)}}function S0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(kt(t,e))return;i.uniform3fv(this.addr,e),zt(t,e)}}function x0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4fv(this.addr,e),zt(t,e)}}function M0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),zt(t,e)}else{if(kt(t,n))return;el.set(n),i.uniformMatrix2fv(this.addr,!1,el),zt(t,n)}}function b0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),zt(t,e)}else{if(kt(t,n))return;Qc.set(n),i.uniformMatrix3fv(this.addr,!1,Qc),zt(t,n)}}function w0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),zt(t,e)}else{if(kt(t,n))return;Jc.set(n),i.uniformMatrix4fv(this.addr,!1,Jc),zt(t,n)}}function T0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function E0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2iv(this.addr,e),zt(t,e)}}function A0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3iv(this.addr,e),zt(t,e)}}function C0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4iv(this.addr,e),zt(t,e)}}function P0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function R0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2uiv(this.addr,e),zt(t,e)}}function I0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3uiv(this.addr,e),zt(t,e)}}function L0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4uiv(this.addr,e),zt(t,e)}}function D0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let o;this.type===i.SAMPLER_2D_SHADOW?($c.compareFunction=ch,o=$c):o=Mh,t.setTexture2D(e||o,s)}function k0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||wh,s)}function z0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Th,s)}function U0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||bh,s)}function N0(i){switch(i){case 5126:return y0;case 35664:return _0;case 35665:return S0;case 35666:return x0;case 35674:return M0;case 35675:return b0;case 35676:return w0;case 5124:case 35670:return T0;case 35667:case 35671:return E0;case 35668:case 35672:return A0;case 35669:case 35673:return C0;case 5125:return P0;case 36294:return R0;case 36295:return I0;case 36296:return L0;case 35678:case 36198:case 36298:case 36306:case 35682:return D0;case 35679:case 36299:case 36307:return k0;case 35680:case 36300:case 36308:case 36293:return z0;case 36289:case 36303:case 36311:case 36292:return U0}}function B0(i,e){i.uniform1fv(this.addr,e)}function F0(i,e){const t=ws(e,this.size,2);i.uniform2fv(this.addr,t)}function G0(i,e){const t=ws(e,this.size,3);i.uniform3fv(this.addr,t)}function O0(i,e){const t=ws(e,this.size,4);i.uniform4fv(this.addr,t)}function V0(i,e){const t=ws(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function H0(i,e){const t=ws(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function W0(i,e){const t=ws(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function X0(i,e){i.uniform1iv(this.addr,e)}function q0(i,e){i.uniform2iv(this.addr,e)}function Y0(i,e){i.uniform3iv(this.addr,e)}function Z0(i,e){i.uniform4iv(this.addr,e)}function $0(i,e){i.uniform1uiv(this.addr,e)}function j0(i,e){i.uniform2uiv(this.addr,e)}function K0(i,e){i.uniform3uiv(this.addr,e)}function J0(i,e){i.uniform4uiv(this.addr,e)}function Q0(i,e,t){const n=this.cache,s=e.length,o=sa(t,s);kt(n,o)||(i.uniform1iv(this.addr,o),zt(n,o));for(let r=0;r!==s;++r)t.setTexture2D(e[r]||Mh,o[r])}function em(i,e,t){const n=this.cache,s=e.length,o=sa(t,s);kt(n,o)||(i.uniform1iv(this.addr,o),zt(n,o));for(let r=0;r!==s;++r)t.setTexture3D(e[r]||wh,o[r])}function tm(i,e,t){const n=this.cache,s=e.length,o=sa(t,s);kt(n,o)||(i.uniform1iv(this.addr,o),zt(n,o));for(let r=0;r!==s;++r)t.setTextureCube(e[r]||Th,o[r])}function nm(i,e,t){const n=this.cache,s=e.length,o=sa(t,s);kt(n,o)||(i.uniform1iv(this.addr,o),zt(n,o));for(let r=0;r!==s;++r)t.setTexture2DArray(e[r]||bh,o[r])}function im(i){switch(i){case 5126:return B0;case 35664:return F0;case 35665:return G0;case 35666:return O0;case 35674:return V0;case 35675:return H0;case 35676:return W0;case 5124:case 35670:return X0;case 35667:case 35671:return q0;case 35668:case 35672:return Y0;case 35669:case 35673:return Z0;case 5125:return $0;case 36294:return j0;case 36295:return K0;case 36296:return J0;case 35678:case 36198:case 36298:case 36306:case 35682:return Q0;case 35679:case 36299:case 36307:return em;case 35680:case 36300:case 36308:case 36293:return tm;case 36289:case 36303:case 36311:case 36292:return nm}}class sm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=N0(t.type)}}class om{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=im(t.type)}}class am{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let o=0,r=s.length;o!==r;++o){const c=s[o];c.setValue(e,t[c.id],n)}}}const Ua=/(\w+)(\])?(\[|\.)?/g;function tl(i,e){i.seq.push(e),i.map[e.id]=e}function rm(i,e,t){const n=i.name,s=n.length;for(Ua.lastIndex=0;;){const o=Ua.exec(n),r=Ua.lastIndex;let c=o[1];const l=o[2]==="]",d=o[3];if(l&&(c=c|0),d===void 0||d==="["&&r+2===s){tl(t,d===void 0?new sm(c,i,e):new om(c,i,e));break}else{let u=t.map[c];u===void 0&&(u=new am(c),tl(t,u)),t=u}}}class $o{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const o=e.getActiveUniform(t,s),r=e.getUniformLocation(t,o.name);rm(o,r,this)}}setValue(e,t,n,s){const o=this.map[t];o!==void 0&&o.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let o=0,r=t.length;o!==r;++o){const c=t[o],l=n[c.id];l.needsUpdate!==!1&&c.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,o=e.length;s!==o;++s){const r=e[s];r.id in t&&n.push(r)}return n}}function nl(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const cm=37297;let lm=0;function hm(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),o=Math.min(e+6,t.length);for(let r=s;r<o;r++){const c=r+1;n.push(`${c===e?">":" "} ${c}: ${t[r]}`)}return n.join(`
`)}const il=new Ke;function dm(i){st._getMatrix(il,st.workingColorSpace,i);const e=`mat3( ${il.elements.map(t=>t.toFixed(4))} )`;switch(st.getTransfer(i)){case ia:return[e,"LinearTransferOETF"];case ft:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function sl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const r=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+hm(i.getShaderSource(e),r)}else return s}function um(i,e){const t=dm(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function fm(i,e){let t;switch(e){case pd:t="Linear";break;case md:t="Reinhard";break;case gd:t="Cineon";break;case $l:t="ACESFilmic";break;case yd:t="AgX";break;case _d:t="Neutral";break;case vd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Io=new z;function pm(){st.getLuminanceCoefficients(Io);const i=Io.x.toFixed(4),e=Io.y.toFixed(4),t=Io.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function mm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Hs).join(`
`)}function gm(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function vm(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const o=i.getActiveAttrib(e,s),r=o.name;let c=1;o.type===i.FLOAT_MAT2&&(c=2),o.type===i.FLOAT_MAT3&&(c=3),o.type===i.FLOAT_MAT4&&(c=4),t[r]={type:o.type,location:i.getAttribLocation(e,r),locationSize:c}}return t}function Hs(i){return i!==""}function ol(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function al(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const ym=/^[ \t]*#include +<([\w\d./]+)>/gm;function kr(i){return i.replace(ym,Sm)}const _m=new Map;function Sm(i,e){let t=Qe[e];if(t===void 0){const n=_m.get(e);if(n!==void 0)t=Qe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return kr(t)}const xm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rl(i){return i.replace(xm,Mm)}function Mm(i,e,t,n){let s="";for(let o=parseInt(e);o<parseInt(t);o++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return s}function cl(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function bm(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ql?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Yl?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Yn&&(e="SHADOWMAP_TYPE_VSM"),e}function wm(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ms:case gs:e="ENVMAP_TYPE_CUBE";break;case na:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Tm(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case gs:e="ENVMAP_MODE_REFRACTION";break}return e}function Em(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Zl:e="ENVMAP_BLENDING_MULTIPLY";break;case ud:e="ENVMAP_BLENDING_MIX";break;case fd:e="ENVMAP_BLENDING_ADD";break}return e}function Am(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Cm(i,e,t,n){const s=i.getContext(),o=t.defines;let r=t.vertexShader,c=t.fragmentShader;const l=bm(t),d=wm(t),h=Tm(t),u=Em(t),f=Am(t),a=mm(t),p=gm(o),v=s.createProgram();let m,g,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Hs).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Hs).join(`
`),g.length>0&&(g+=`
`)):(m=[cl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Hs).join(`
`),g=[cl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==vi?"#define TONE_MAPPING":"",t.toneMapping!==vi?Qe.tonemapping_pars_fragment:"",t.toneMapping!==vi?fm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Qe.colorspace_pars_fragment,um("linearToOutputTexel",t.outputColorSpace),pm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Hs).join(`
`)),r=kr(r),r=ol(r,t),r=al(r,t),c=kr(c),c=ol(c,t),c=al(c,t),r=rl(r),c=rl(c),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[a,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",t.glslVersion===Sc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Sc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const _=S+m+r,y=S+g+c,b=nl(s,s.VERTEX_SHADER,_),w=nl(s,s.FRAGMENT_SHADER,y);s.attachShader(v,b),s.attachShader(v,w),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function T(P){if(i.debug.checkShaderErrors){const k=s.getProgramInfoLog(v).trim(),U=s.getShaderInfoLog(b).trim(),L=s.getShaderInfoLog(w).trim();let B=!0,F=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(B=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,b,w);else{const G=sl(s,b,"vertex"),O=sl(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+k+`
`+G+`
`+O)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(U===""||L==="")&&(F=!1);F&&(P.diagnostics={runnable:B,programLog:k,vertexShader:{log:U,prefix:m},fragmentShader:{log:L,prefix:g}})}s.deleteShader(b),s.deleteShader(w),E=new $o(s,v),M=vm(s,v)}let E;this.getUniforms=function(){return E===void 0&&T(this),E};let M;this.getAttributes=function(){return M===void 0&&T(this),M};let x=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(v,cm)),x},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=lm++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=b,this.fragmentShader=w,this}let Pm=0;class Rm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),o=this._getShaderStage(n),r=this._getShaderCacheForMaterial(e);return r.has(s)===!1&&(r.add(s),s.usedTimes++),r.has(o)===!1&&(r.add(o),o.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Im(e),t.set(e,n)),n}}class Im{constructor(e){this.id=Pm++,this.code=e,this.usedTimes=0}}function Lm(i,e,t,n,s,o,r){const c=new uh,l=new Rm,d=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let a=s.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(M){return d.add(M),M===0?"uv":`uv${M}`}function m(M,x,P,k,U){const L=k.fog,B=U.geometry,F=M.isMeshStandardMaterial?k.environment:null,G=(M.isMeshStandardMaterial?t:e).get(M.envMap||F),O=G&&G.mapping===na?G.image.height:null,N=p[M.type];M.precision!==null&&(a=s.getMaxPrecision(M.precision),a!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",a,"instead."));const V=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,$=V!==void 0?V.length:0;let he=0;B.morphAttributes.position!==void 0&&(he=1),B.morphAttributes.normal!==void 0&&(he=2),B.morphAttributes.color!==void 0&&(he=3);let _e,Z,ne,fe;if(N){const dt=Rn[N];_e=dt.vertexShader,Z=dt.fragmentShader}else _e=M.vertexShader,Z=M.fragmentShader,l.update(M),ne=l.getVertexShaderID(M),fe=l.getFragmentShaderID(M);const q=i.getRenderTarget(),ee=i.state.buffers.depth.getReversed(),K=U.isInstancedMesh===!0,oe=U.isBatchedMesh===!0,be=!!M.map,Y=!!M.matcap,ie=!!G,D=!!M.aoMap,re=!!M.lightMap,te=!!M.bumpMap,pe=!!M.normalMap,ae=!!M.displacementMap,xe=!!M.emissiveMap,we=!!M.metalnessMap,I=!!M.roughnessMap,A=M.anisotropy>0,j=M.clearcoat>0,ce=M.dispersion>0,ue=M.iridescence>0,le=M.sheen>0,Ne=M.transmission>0,Ae=A&&!!M.anisotropyMap,Me=j&&!!M.clearcoatMap,We=j&&!!M.clearcoatNormalMap,me=j&&!!M.clearcoatRoughnessMap,De=ue&&!!M.iridescenceMap,Ve=ue&&!!M.iridescenceThicknessMap,He=le&&!!M.sheenColorMap,ke=le&&!!M.sheenRoughnessMap,it=!!M.specularMap,Je=!!M.specularColorMap,mt=!!M.specularIntensityMap,H=Ne&&!!M.transmissionMap,Pe=Ne&&!!M.thicknessMap,se=!!M.gradientMap,de=!!M.alphaMap,Le=M.alphaTest>0,Re=!!M.alphaHash,$e=!!M.extensions;let bt=vi;M.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(bt=i.toneMapping);const Vt={shaderID:N,shaderType:M.type,shaderName:M.name,vertexShader:_e,fragmentShader:Z,defines:M.defines,customVertexShaderID:ne,customFragmentShaderID:fe,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:a,batching:oe,batchingColor:oe&&U._colorsTexture!==null,instancing:K,instancingColor:K&&U.instanceColor!==null,instancingMorph:K&&U.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:q===null?i.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:Ss,alphaToCoverage:!!M.alphaToCoverage,map:be,matcap:Y,envMap:ie,envMapMode:ie&&G.mapping,envMapCubeUVHeight:O,aoMap:D,lightMap:re,bumpMap:te,normalMap:pe,displacementMap:f&&ae,emissiveMap:xe,normalMapObjectSpace:pe&&M.normalMapType===bd,normalMapTangentSpace:pe&&M.normalMapType===rh,metalnessMap:we,roughnessMap:I,anisotropy:A,anisotropyMap:Ae,clearcoat:j,clearcoatMap:Me,clearcoatNormalMap:We,clearcoatRoughnessMap:me,dispersion:ce,iridescence:ue,iridescenceMap:De,iridescenceThicknessMap:Ve,sheen:le,sheenColorMap:He,sheenRoughnessMap:ke,specularMap:it,specularColorMap:Je,specularIntensityMap:mt,transmission:Ne,transmissionMap:H,thicknessMap:Pe,gradientMap:se,opaque:M.transparent===!1&&M.blending===hs&&M.alphaToCoverage===!1,alphaMap:de,alphaTest:Le,alphaHash:Re,combine:M.combine,mapUv:be&&v(M.map.channel),aoMapUv:D&&v(M.aoMap.channel),lightMapUv:re&&v(M.lightMap.channel),bumpMapUv:te&&v(M.bumpMap.channel),normalMapUv:pe&&v(M.normalMap.channel),displacementMapUv:ae&&v(M.displacementMap.channel),emissiveMapUv:xe&&v(M.emissiveMap.channel),metalnessMapUv:we&&v(M.metalnessMap.channel),roughnessMapUv:I&&v(M.roughnessMap.channel),anisotropyMapUv:Ae&&v(M.anisotropyMap.channel),clearcoatMapUv:Me&&v(M.clearcoatMap.channel),clearcoatNormalMapUv:We&&v(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:me&&v(M.clearcoatRoughnessMap.channel),iridescenceMapUv:De&&v(M.iridescenceMap.channel),iridescenceThicknessMapUv:Ve&&v(M.iridescenceThicknessMap.channel),sheenColorMapUv:He&&v(M.sheenColorMap.channel),sheenRoughnessMapUv:ke&&v(M.sheenRoughnessMap.channel),specularMapUv:it&&v(M.specularMap.channel),specularColorMapUv:Je&&v(M.specularColorMap.channel),specularIntensityMapUv:mt&&v(M.specularIntensityMap.channel),transmissionMapUv:H&&v(M.transmissionMap.channel),thicknessMapUv:Pe&&v(M.thicknessMap.channel),alphaMapUv:de&&v(M.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(pe||A),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!B.attributes.uv&&(be||de),fog:!!L,useFog:M.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:ee,skinning:U.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:$,morphTextureStride:he,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:bt,decodeVideoTexture:be&&M.map.isVideoTexture===!0&&st.getTransfer(M.map.colorSpace)===ft,decodeVideoTextureEmissive:xe&&M.emissiveMap.isVideoTexture===!0&&st.getTransfer(M.emissiveMap.colorSpace)===ft,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===At,flipSided:M.side===Kt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:$e&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:($e&&M.extensions.multiDraw===!0||oe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Vt.vertexUv1s=d.has(1),Vt.vertexUv2s=d.has(2),Vt.vertexUv3s=d.has(3),d.clear(),Vt}function g(M){const x=[];if(M.shaderID?x.push(M.shaderID):(x.push(M.customVertexShaderID),x.push(M.customFragmentShaderID)),M.defines!==void 0)for(const P in M.defines)x.push(P),x.push(M.defines[P]);return M.isRawShaderMaterial===!1&&(S(x,M),_(x,M),x.push(i.outputColorSpace)),x.push(M.customProgramCacheKey),x.join()}function S(M,x){M.push(x.precision),M.push(x.outputColorSpace),M.push(x.envMapMode),M.push(x.envMapCubeUVHeight),M.push(x.mapUv),M.push(x.alphaMapUv),M.push(x.lightMapUv),M.push(x.aoMapUv),M.push(x.bumpMapUv),M.push(x.normalMapUv),M.push(x.displacementMapUv),M.push(x.emissiveMapUv),M.push(x.metalnessMapUv),M.push(x.roughnessMapUv),M.push(x.anisotropyMapUv),M.push(x.clearcoatMapUv),M.push(x.clearcoatNormalMapUv),M.push(x.clearcoatRoughnessMapUv),M.push(x.iridescenceMapUv),M.push(x.iridescenceThicknessMapUv),M.push(x.sheenColorMapUv),M.push(x.sheenRoughnessMapUv),M.push(x.specularMapUv),M.push(x.specularColorMapUv),M.push(x.specularIntensityMapUv),M.push(x.transmissionMapUv),M.push(x.thicknessMapUv),M.push(x.combine),M.push(x.fogExp2),M.push(x.sizeAttenuation),M.push(x.morphTargetsCount),M.push(x.morphAttributeCount),M.push(x.numDirLights),M.push(x.numPointLights),M.push(x.numSpotLights),M.push(x.numSpotLightMaps),M.push(x.numHemiLights),M.push(x.numRectAreaLights),M.push(x.numDirLightShadows),M.push(x.numPointLightShadows),M.push(x.numSpotLightShadows),M.push(x.numSpotLightShadowsWithMaps),M.push(x.numLightProbes),M.push(x.shadowMapType),M.push(x.toneMapping),M.push(x.numClippingPlanes),M.push(x.numClipIntersection),M.push(x.depthPacking)}function _(M,x){c.disableAll(),x.supportsVertexTextures&&c.enable(0),x.instancing&&c.enable(1),x.instancingColor&&c.enable(2),x.instancingMorph&&c.enable(3),x.matcap&&c.enable(4),x.envMap&&c.enable(5),x.normalMapObjectSpace&&c.enable(6),x.normalMapTangentSpace&&c.enable(7),x.clearcoat&&c.enable(8),x.iridescence&&c.enable(9),x.alphaTest&&c.enable(10),x.vertexColors&&c.enable(11),x.vertexAlphas&&c.enable(12),x.vertexUv1s&&c.enable(13),x.vertexUv2s&&c.enable(14),x.vertexUv3s&&c.enable(15),x.vertexTangents&&c.enable(16),x.anisotropy&&c.enable(17),x.alphaHash&&c.enable(18),x.batching&&c.enable(19),x.dispersion&&c.enable(20),x.batchingColor&&c.enable(21),M.push(c.mask),c.disableAll(),x.fog&&c.enable(0),x.useFog&&c.enable(1),x.flatShading&&c.enable(2),x.logarithmicDepthBuffer&&c.enable(3),x.reverseDepthBuffer&&c.enable(4),x.skinning&&c.enable(5),x.morphTargets&&c.enable(6),x.morphNormals&&c.enable(7),x.morphColors&&c.enable(8),x.premultipliedAlpha&&c.enable(9),x.shadowMapEnabled&&c.enable(10),x.doubleSided&&c.enable(11),x.flipSided&&c.enable(12),x.useDepthPacking&&c.enable(13),x.dithering&&c.enable(14),x.transmission&&c.enable(15),x.sheen&&c.enable(16),x.opaque&&c.enable(17),x.pointsUvs&&c.enable(18),x.decodeVideoTexture&&c.enable(19),x.decodeVideoTextureEmissive&&c.enable(20),x.alphaToCoverage&&c.enable(21),M.push(c.mask)}function y(M){const x=p[M.type];let P;if(x){const k=Rn[x];P=pu.clone(k.uniforms)}else P=M.uniforms;return P}function b(M,x){let P;for(let k=0,U=h.length;k<U;k++){const L=h[k];if(L.cacheKey===x){P=L,++P.usedTimes;break}}return P===void 0&&(P=new Cm(i,x,M,o),h.push(P)),P}function w(M){if(--M.usedTimes===0){const x=h.indexOf(M);h[x]=h[h.length-1],h.pop(),M.destroy()}}function T(M){l.remove(M)}function E(){l.dispose()}return{getParameters:m,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:w,releaseShaderCache:T,programs:h,dispose:E}}function Dm(){let i=new WeakMap;function e(r){return i.has(r)}function t(r){let c=i.get(r);return c===void 0&&(c={},i.set(r,c)),c}function n(r){i.delete(r)}function s(r,c,l){i.get(r)[c]=l}function o(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:o}}function km(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function ll(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function hl(){const i=[];let e=0;const t=[],n=[],s=[];function o(){e=0,t.length=0,n.length=0,s.length=0}function r(u,f,a,p,v,m){let g=i[e];return g===void 0?(g={id:u.id,object:u,geometry:f,material:a,groupOrder:p,renderOrder:u.renderOrder,z:v,group:m},i[e]=g):(g.id=u.id,g.object=u,g.geometry=f,g.material=a,g.groupOrder=p,g.renderOrder=u.renderOrder,g.z=v,g.group=m),e++,g}function c(u,f,a,p,v,m){const g=r(u,f,a,p,v,m);a.transmission>0?n.push(g):a.transparent===!0?s.push(g):t.push(g)}function l(u,f,a,p,v,m){const g=r(u,f,a,p,v,m);a.transmission>0?n.unshift(g):a.transparent===!0?s.unshift(g):t.unshift(g)}function d(u,f){t.length>1&&t.sort(u||km),n.length>1&&n.sort(f||ll),s.length>1&&s.sort(f||ll)}function h(){for(let u=e,f=i.length;u<f;u++){const a=i[u];if(a.id===null)break;a.id=null,a.object=null,a.geometry=null,a.material=null,a.group=null}}return{opaque:t,transmissive:n,transparent:s,init:o,push:c,unshift:l,finish:h,sort:d}}function zm(){let i=new WeakMap;function e(n,s){const o=i.get(n);let r;return o===void 0?(r=new hl,i.set(n,[r])):s>=o.length?(r=new hl,o.push(r)):r=o[s],r}function t(){i=new WeakMap}return{get:e,dispose:t}}function Um(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new z,color:new Ye};break;case"SpotLight":t={position:new z,direction:new z,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new z,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new z,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":t={color:new Ye,position:new z,halfWidth:new z,halfHeight:new z};break}return i[e.id]=t,t}}}function Nm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Bm=0;function Fm(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Gm(i){const e=new Um,t=Nm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)n.probe.push(new z);const s=new z,o=new _t,r=new _t;function c(d){let h=0,u=0,f=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let a=0,p=0,v=0,m=0,g=0,S=0,_=0,y=0,b=0,w=0,T=0;d.sort(Fm);for(let M=0,x=d.length;M<x;M++){const P=d[M],k=P.color,U=P.intensity,L=P.distance,B=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=k.r*U,u+=k.g*U,f+=k.b*U;else if(P.isLightProbe){for(let F=0;F<9;F++)n.probe[F].addScaledVector(P.sh.coefficients[F],U);T++}else if(P.isDirectionalLight){const F=e.get(P);if(F.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const G=P.shadow,O=t.get(P);O.shadowIntensity=G.intensity,O.shadowBias=G.bias,O.shadowNormalBias=G.normalBias,O.shadowRadius=G.radius,O.shadowMapSize=G.mapSize,n.directionalShadow[a]=O,n.directionalShadowMap[a]=B,n.directionalShadowMatrix[a]=P.shadow.matrix,S++}n.directional[a]=F,a++}else if(P.isSpotLight){const F=e.get(P);F.position.setFromMatrixPosition(P.matrixWorld),F.color.copy(k).multiplyScalar(U),F.distance=L,F.coneCos=Math.cos(P.angle),F.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),F.decay=P.decay,n.spot[v]=F;const G=P.shadow;if(P.map&&(n.spotLightMap[b]=P.map,b++,G.updateMatrices(P),P.castShadow&&w++),n.spotLightMatrix[v]=G.matrix,P.castShadow){const O=t.get(P);O.shadowIntensity=G.intensity,O.shadowBias=G.bias,O.shadowNormalBias=G.normalBias,O.shadowRadius=G.radius,O.shadowMapSize=G.mapSize,n.spotShadow[v]=O,n.spotShadowMap[v]=B,y++}v++}else if(P.isRectAreaLight){const F=e.get(P);F.color.copy(k).multiplyScalar(U),F.halfWidth.set(P.width*.5,0,0),F.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=F,m++}else if(P.isPointLight){const F=e.get(P);if(F.color.copy(P.color).multiplyScalar(P.intensity),F.distance=P.distance,F.decay=P.decay,P.castShadow){const G=P.shadow,O=t.get(P);O.shadowIntensity=G.intensity,O.shadowBias=G.bias,O.shadowNormalBias=G.normalBias,O.shadowRadius=G.radius,O.shadowMapSize=G.mapSize,O.shadowCameraNear=G.camera.near,O.shadowCameraFar=G.camera.far,n.pointShadow[p]=O,n.pointShadowMap[p]=B,n.pointShadowMatrix[p]=P.shadow.matrix,_++}n.point[p]=F,p++}else if(P.isHemisphereLight){const F=e.get(P);F.skyColor.copy(P.color).multiplyScalar(U),F.groundColor.copy(P.groundColor).multiplyScalar(U),n.hemi[g]=F,g++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ce.LTC_FLOAT_1,n.rectAreaLTC2=Ce.LTC_FLOAT_2):(n.rectAreaLTC1=Ce.LTC_HALF_1,n.rectAreaLTC2=Ce.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const E=n.hash;(E.directionalLength!==a||E.pointLength!==p||E.spotLength!==v||E.rectAreaLength!==m||E.hemiLength!==g||E.numDirectionalShadows!==S||E.numPointShadows!==_||E.numSpotShadows!==y||E.numSpotMaps!==b||E.numLightProbes!==T)&&(n.directional.length=a,n.spot.length=v,n.rectArea.length=m,n.point.length=p,n.hemi.length=g,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=_,n.pointShadowMap.length=_,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=_,n.spotLightMatrix.length=y+b-w,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=T,E.directionalLength=a,E.pointLength=p,E.spotLength=v,E.rectAreaLength=m,E.hemiLength=g,E.numDirectionalShadows=S,E.numPointShadows=_,E.numSpotShadows=y,E.numSpotMaps=b,E.numLightProbes=T,n.version=Bm++)}function l(d,h){let u=0,f=0,a=0,p=0,v=0;const m=h.matrixWorldInverse;for(let g=0,S=d.length;g<S;g++){const _=d[g];if(_.isDirectionalLight){const y=n.directional[u];y.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),u++}else if(_.isSpotLight){const y=n.spot[a];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),a++}else if(_.isRectAreaLight){const y=n.rectArea[p];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(m),r.identity(),o.copy(_.matrixWorld),o.premultiply(m),r.extractRotation(o),y.halfWidth.set(_.width*.5,0,0),y.halfHeight.set(0,_.height*.5,0),y.halfWidth.applyMatrix4(r),y.halfHeight.applyMatrix4(r),p++}else if(_.isPointLight){const y=n.point[f];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(m),f++}else if(_.isHemisphereLight){const y=n.hemi[v];y.direction.setFromMatrixPosition(_.matrixWorld),y.direction.transformDirection(m),v++}}}return{setup:c,setupView:l,state:n}}function dl(i){const e=new Gm(i),t=[],n=[];function s(h){d.camera=h,t.length=0,n.length=0}function o(h){t.push(h)}function r(h){n.push(h)}function c(){e.setup(t)}function l(h){e.setupView(t,h)}const d={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:d,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:r}}function Om(i){let e=new WeakMap;function t(s,o=0){const r=e.get(s);let c;return r===void 0?(c=new dl(i),e.set(s,[c])):o>=r.length?(c=new dl(i),r.push(c)):c=r[o],c}function n(){e=new WeakMap}return{get:t,dispose:n}}class Vm extends bs{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=xd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Hm extends bs{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Wm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Xm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function qm(i,e,t){let n=new Jr;const s=new ge,o=new ge,r=new Ct,c=new Vm({depthPacking:Md}),l=new Hm,d={},h=t.maxTextureSize,u={[_i]:Kt,[Kt]:_i,[At]:At},f=new Nn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ge},radius:{value:4}},vertexShader:Wm,fragmentShader:Xm}),a=f.clone();a.defines.HORIZONTAL_PASS=1;const p=new Ot;p.setAttribute("position",new An(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new C(p,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ql;let g=this.type;this.render=function(w,T,E){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const M=i.getRenderTarget(),x=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),k=i.state;k.setBlending(gi),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const U=g!==Yn&&this.type===Yn,L=g===Yn&&this.type!==Yn;for(let B=0,F=w.length;B<F;B++){const G=w[B],O=G.shadow;if(O===void 0){console.warn("THREE.WebGLShadowMap:",G,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;s.copy(O.mapSize);const N=O.getFrameExtents();if(s.multiply(N),o.copy(O.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(o.x=Math.floor(h/N.x),s.x=o.x*N.x,O.mapSize.x=o.x),s.y>h&&(o.y=Math.floor(h/N.y),s.y=o.y*N.y,O.mapSize.y=o.y)),O.map===null||U===!0||L===!0){const $=this.type!==Yn?{minFilter:En,magFilter:En}:{};O.map!==null&&O.map.dispose(),O.map=new Ui(s.x,s.y,$),O.map.texture.name=G.name+".shadowMap",O.camera.updateProjectionMatrix()}i.setRenderTarget(O.map),i.clear();const V=O.getViewportCount();for(let $=0;$<V;$++){const he=O.getViewport($);r.set(o.x*he.x,o.y*he.y,o.x*he.z,o.y*he.w),k.viewport(r),O.updateMatrices(G,$),n=O.getFrustum(),y(T,E,O.camera,G,this.type)}O.isPointLightShadow!==!0&&this.type===Yn&&S(O,E),O.needsUpdate=!1}g=this.type,m.needsUpdate=!1,i.setRenderTarget(M,x,P)};function S(w,T){const E=e.update(v);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,a.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,a.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Ui(s.x,s.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(T,null,E,f,v,null),a.uniforms.shadow_pass.value=w.mapPass.texture,a.uniforms.resolution.value=w.mapSize,a.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(T,null,E,a,v,null)}function _(w,T,E,M){let x=null;const P=E.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(P!==void 0)x=P;else if(x=E.isPointLight===!0?l:c,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const k=x.uuid,U=T.uuid;let L=d[k];L===void 0&&(L={},d[k]=L);let B=L[U];B===void 0&&(B=x.clone(),L[U]=B,T.addEventListener("dispose",b)),x=B}if(x.visible=T.visible,x.wireframe=T.wireframe,M===Yn?x.side=T.shadowSide!==null?T.shadowSide:T.side:x.side=T.shadowSide!==null?T.shadowSide:u[T.side],x.alphaMap=T.alphaMap,x.alphaTest=T.alphaTest,x.map=T.map,x.clipShadows=T.clipShadows,x.clippingPlanes=T.clippingPlanes,x.clipIntersection=T.clipIntersection,x.displacementMap=T.displacementMap,x.displacementScale=T.displacementScale,x.displacementBias=T.displacementBias,x.wireframeLinewidth=T.wireframeLinewidth,x.linewidth=T.linewidth,E.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const k=i.properties.get(x);k.light=E}return x}function y(w,T,E,M,x){if(w.visible===!1)return;if(w.layers.test(T.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&x===Yn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,w.matrixWorld);const U=e.update(w),L=w.material;if(Array.isArray(L)){const B=U.groups;for(let F=0,G=B.length;F<G;F++){const O=B[F],N=L[O.materialIndex];if(N&&N.visible){const V=_(w,N,M,x);w.onBeforeShadow(i,w,T,E,U,V,O),i.renderBufferDirect(E,null,U,V,w,O),w.onAfterShadow(i,w,T,E,U,V,O)}}}else if(L.visible){const B=_(w,L,M,x);w.onBeforeShadow(i,w,T,E,U,B,null),i.renderBufferDirect(E,null,U,B,w,null),w.onAfterShadow(i,w,T,E,U,B,null)}}const k=w.children;for(let U=0,L=k.length;U<L;U++)y(k[U],T,E,M,x)}function b(w){w.target.removeEventListener("dispose",b);for(const E in d){const M=d[E],x=w.target.uuid;x in M&&(M[x].dispose(),delete M[x])}}}const Ym={[Ka]:Ja,[Qa]:nr,[er]:ir,[ps]:tr,[Ja]:Ka,[nr]:Qa,[ir]:er,[tr]:ps};function Zm(i,e){function t(){let H=!1;const Pe=new Ct;let se=null;const de=new Ct(0,0,0,0);return{setMask:function(Le){se!==Le&&!H&&(i.colorMask(Le,Le,Le,Le),se=Le)},setLocked:function(Le){H=Le},setClear:function(Le,Re,$e,bt,Vt){Vt===!0&&(Le*=bt,Re*=bt,$e*=bt),Pe.set(Le,Re,$e,bt),de.equals(Pe)===!1&&(i.clearColor(Le,Re,$e,bt),de.copy(Pe))},reset:function(){H=!1,se=null,de.set(-1,0,0,0)}}}function n(){let H=!1,Pe=!1,se=null,de=null,Le=null;return{setReversed:function(Re){if(Pe!==Re){const $e=e.get("EXT_clip_control");Pe?$e.clipControlEXT($e.LOWER_LEFT_EXT,$e.ZERO_TO_ONE_EXT):$e.clipControlEXT($e.LOWER_LEFT_EXT,$e.NEGATIVE_ONE_TO_ONE_EXT);const bt=Le;Le=null,this.setClear(bt)}Pe=Re},getReversed:function(){return Pe},setTest:function(Re){Re?q(i.DEPTH_TEST):ee(i.DEPTH_TEST)},setMask:function(Re){se!==Re&&!H&&(i.depthMask(Re),se=Re)},setFunc:function(Re){if(Pe&&(Re=Ym[Re]),de!==Re){switch(Re){case Ka:i.depthFunc(i.NEVER);break;case Ja:i.depthFunc(i.ALWAYS);break;case Qa:i.depthFunc(i.LESS);break;case ps:i.depthFunc(i.LEQUAL);break;case er:i.depthFunc(i.EQUAL);break;case tr:i.depthFunc(i.GEQUAL);break;case nr:i.depthFunc(i.GREATER);break;case ir:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}de=Re}},setLocked:function(Re){H=Re},setClear:function(Re){Le!==Re&&(Pe&&(Re=1-Re),i.clearDepth(Re),Le=Re)},reset:function(){H=!1,se=null,de=null,Le=null,Pe=!1}}}function s(){let H=!1,Pe=null,se=null,de=null,Le=null,Re=null,$e=null,bt=null,Vt=null;return{setTest:function(dt){H||(dt?q(i.STENCIL_TEST):ee(i.STENCIL_TEST))},setMask:function(dt){Pe!==dt&&!H&&(i.stencilMask(dt),Pe=dt)},setFunc:function(dt,mn,Fn){(se!==dt||de!==mn||Le!==Fn)&&(i.stencilFunc(dt,mn,Fn),se=dt,de=mn,Le=Fn)},setOp:function(dt,mn,Fn){(Re!==dt||$e!==mn||bt!==Fn)&&(i.stencilOp(dt,mn,Fn),Re=dt,$e=mn,bt=Fn)},setLocked:function(dt){H=dt},setClear:function(dt){Vt!==dt&&(i.clearStencil(dt),Vt=dt)},reset:function(){H=!1,Pe=null,se=null,de=null,Le=null,Re=null,$e=null,bt=null,Vt=null}}}const o=new t,r=new n,c=new s,l=new WeakMap,d=new WeakMap;let h={},u={},f=new WeakMap,a=[],p=null,v=!1,m=null,g=null,S=null,_=null,y=null,b=null,w=null,T=new Ye(0,0,0),E=0,M=!1,x=null,P=null,k=null,U=null,L=null;const B=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,G=0;const O=i.getParameter(i.VERSION);O.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(O)[1]),F=G>=1):O.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),F=G>=2);let N=null,V={};const $=i.getParameter(i.SCISSOR_BOX),he=i.getParameter(i.VIEWPORT),_e=new Ct().fromArray($),Z=new Ct().fromArray(he);function ne(H,Pe,se,de){const Le=new Uint8Array(4),Re=i.createTexture();i.bindTexture(H,Re),i.texParameteri(H,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(H,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let $e=0;$e<se;$e++)H===i.TEXTURE_3D||H===i.TEXTURE_2D_ARRAY?i.texImage3D(Pe,0,i.RGBA,1,1,de,0,i.RGBA,i.UNSIGNED_BYTE,Le):i.texImage2D(Pe+$e,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Le);return Re}const fe={};fe[i.TEXTURE_2D]=ne(i.TEXTURE_2D,i.TEXTURE_2D,1),fe[i.TEXTURE_CUBE_MAP]=ne(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),fe[i.TEXTURE_2D_ARRAY]=ne(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),fe[i.TEXTURE_3D]=ne(i.TEXTURE_3D,i.TEXTURE_3D,1,1),o.setClear(0,0,0,1),r.setClear(1),c.setClear(0),q(i.DEPTH_TEST),r.setFunc(ps),te(!1),pe(mc),q(i.CULL_FACE),D(gi);function q(H){h[H]!==!0&&(i.enable(H),h[H]=!0)}function ee(H){h[H]!==!1&&(i.disable(H),h[H]=!1)}function K(H,Pe){return u[H]!==Pe?(i.bindFramebuffer(H,Pe),u[H]=Pe,H===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=Pe),H===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=Pe),!0):!1}function oe(H,Pe){let se=a,de=!1;if(H){se=f.get(Pe),se===void 0&&(se=[],f.set(Pe,se));const Le=H.textures;if(se.length!==Le.length||se[0]!==i.COLOR_ATTACHMENT0){for(let Re=0,$e=Le.length;Re<$e;Re++)se[Re]=i.COLOR_ATTACHMENT0+Re;se.length=Le.length,de=!0}}else se[0]!==i.BACK&&(se[0]=i.BACK,de=!0);de&&i.drawBuffers(se)}function be(H){return p!==H?(i.useProgram(H),p=H,!0):!1}const Y={[Ii]:i.FUNC_ADD,[$h]:i.FUNC_SUBTRACT,[jh]:i.FUNC_REVERSE_SUBTRACT};Y[Kh]=i.MIN,Y[Jh]=i.MAX;const ie={[Qh]:i.ZERO,[ed]:i.ONE,[td]:i.SRC_COLOR,[$a]:i.SRC_ALPHA,[rd]:i.SRC_ALPHA_SATURATE,[od]:i.DST_COLOR,[id]:i.DST_ALPHA,[nd]:i.ONE_MINUS_SRC_COLOR,[ja]:i.ONE_MINUS_SRC_ALPHA,[ad]:i.ONE_MINUS_DST_COLOR,[sd]:i.ONE_MINUS_DST_ALPHA,[cd]:i.CONSTANT_COLOR,[ld]:i.ONE_MINUS_CONSTANT_COLOR,[hd]:i.CONSTANT_ALPHA,[dd]:i.ONE_MINUS_CONSTANT_ALPHA};function D(H,Pe,se,de,Le,Re,$e,bt,Vt,dt){if(H===gi){v===!0&&(ee(i.BLEND),v=!1);return}if(v===!1&&(q(i.BLEND),v=!0),H!==Zh){if(H!==m||dt!==M){if((g!==Ii||y!==Ii)&&(i.blendEquation(i.FUNC_ADD),g=Ii,y=Ii),dt)switch(H){case hs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case gc:i.blendFunc(i.ONE,i.ONE);break;case vc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case yc:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}else switch(H){case hs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case gc:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case vc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case yc:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}S=null,_=null,b=null,w=null,T.set(0,0,0),E=0,m=H,M=dt}return}Le=Le||Pe,Re=Re||se,$e=$e||de,(Pe!==g||Le!==y)&&(i.blendEquationSeparate(Y[Pe],Y[Le]),g=Pe,y=Le),(se!==S||de!==_||Re!==b||$e!==w)&&(i.blendFuncSeparate(ie[se],ie[de],ie[Re],ie[$e]),S=se,_=de,b=Re,w=$e),(bt.equals(T)===!1||Vt!==E)&&(i.blendColor(bt.r,bt.g,bt.b,Vt),T.copy(bt),E=Vt),m=H,M=!1}function re(H,Pe){H.side===At?ee(i.CULL_FACE):q(i.CULL_FACE);let se=H.side===Kt;Pe&&(se=!se),te(se),H.blending===hs&&H.transparent===!1?D(gi):D(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),r.setFunc(H.depthFunc),r.setTest(H.depthTest),r.setMask(H.depthWrite),o.setMask(H.colorWrite);const de=H.stencilWrite;c.setTest(de),de&&(c.setMask(H.stencilWriteMask),c.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),c.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),xe(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?q(i.SAMPLE_ALPHA_TO_COVERAGE):ee(i.SAMPLE_ALPHA_TO_COVERAGE)}function te(H){x!==H&&(H?i.frontFace(i.CW):i.frontFace(i.CCW),x=H)}function pe(H){H!==qh?(q(i.CULL_FACE),H!==P&&(H===mc?i.cullFace(i.BACK):H===Yh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ee(i.CULL_FACE),P=H}function ae(H){H!==k&&(F&&i.lineWidth(H),k=H)}function xe(H,Pe,se){H?(q(i.POLYGON_OFFSET_FILL),(U!==Pe||L!==se)&&(i.polygonOffset(Pe,se),U=Pe,L=se)):ee(i.POLYGON_OFFSET_FILL)}function we(H){H?q(i.SCISSOR_TEST):ee(i.SCISSOR_TEST)}function I(H){H===void 0&&(H=i.TEXTURE0+B-1),N!==H&&(i.activeTexture(H),N=H)}function A(H,Pe,se){se===void 0&&(N===null?se=i.TEXTURE0+B-1:se=N);let de=V[se];de===void 0&&(de={type:void 0,texture:void 0},V[se]=de),(de.type!==H||de.texture!==Pe)&&(N!==se&&(i.activeTexture(se),N=se),i.bindTexture(H,Pe||fe[H]),de.type=H,de.texture=Pe)}function j(){const H=V[N];H!==void 0&&H.type!==void 0&&(i.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function ce(){try{i.compressedTexImage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ue(){try{i.compressedTexImage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function le(){try{i.texSubImage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Ne(){try{i.texSubImage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Ae(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Me(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function We(){try{i.texStorage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function me(){try{i.texStorage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function De(){try{i.texImage2D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Ve(){try{i.texImage3D.apply(i,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function He(H){_e.equals(H)===!1&&(i.scissor(H.x,H.y,H.z,H.w),_e.copy(H))}function ke(H){Z.equals(H)===!1&&(i.viewport(H.x,H.y,H.z,H.w),Z.copy(H))}function it(H,Pe){let se=d.get(Pe);se===void 0&&(se=new WeakMap,d.set(Pe,se));let de=se.get(H);de===void 0&&(de=i.getUniformBlockIndex(Pe,H.name),se.set(H,de))}function Je(H,Pe){const de=d.get(Pe).get(H);l.get(Pe)!==de&&(i.uniformBlockBinding(Pe,de,H.__bindingPointIndex),l.set(Pe,de))}function mt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),r.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},N=null,V={},u={},f=new WeakMap,a=[],p=null,v=!1,m=null,g=null,S=null,_=null,y=null,b=null,w=null,T=new Ye(0,0,0),E=0,M=!1,x=null,P=null,k=null,U=null,L=null,_e.set(0,0,i.canvas.width,i.canvas.height),Z.set(0,0,i.canvas.width,i.canvas.height),o.reset(),r.reset(),c.reset()}return{buffers:{color:o,depth:r,stencil:c},enable:q,disable:ee,bindFramebuffer:K,drawBuffers:oe,useProgram:be,setBlending:D,setMaterial:re,setFlipSided:te,setCullFace:pe,setLineWidth:ae,setPolygonOffset:xe,setScissorTest:we,activeTexture:I,bindTexture:A,unbindTexture:j,compressedTexImage2D:ce,compressedTexImage3D:ue,texImage2D:De,texImage3D:Ve,updateUBOMapping:it,uniformBlockBinding:Je,texStorage2D:We,texStorage3D:me,texSubImage2D:le,texSubImage3D:Ne,compressedTexSubImage2D:Ae,compressedTexSubImage3D:Me,scissor:He,viewport:ke,reset:mt}}function ul(i,e,t,n){const s=$m(n);switch(t){case eh:return i*e;case nh:return i*e;case ih:return i*e*2;case sh:return i*e/s.components*s.byteLength;case Yr:return i*e/s.components*s.byteLength;case oh:return i*e*2/s.components*s.byteLength;case Zr:return i*e*2/s.components*s.byteLength;case th:return i*e*3/s.components*s.byteLength;case Tn:return i*e*4/s.components*s.byteLength;case $r:return i*e*4/s.components*s.byteLength;case Wo:case Xo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case qo:case Yo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case cr:case hr:return Math.max(i,16)*Math.max(e,8)/4;case rr:case lr:return Math.max(i,8)*Math.max(e,8)/2;case dr:case ur:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case fr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case pr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case mr:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case gr:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case vr:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case yr:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case _r:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Sr:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case xr:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Mr:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case br:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case wr:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Tr:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Er:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Ar:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Zo:case Cr:case Pr:return Math.ceil(i/4)*Math.ceil(e/4)*16;case ah:case Rr:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ir:case Lr:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function $m(i){switch(i){case ni:case Kl:return{byteLength:1,components:1};case js:case Jl:case no:return{byteLength:2,components:1};case Xr:case qr:return{byteLength:2,components:4};case zi:case Wr:case Kn:return{byteLength:4,components:1};case Ql:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function jm(i,e,t,n,s,o,r){const c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new ge,h=new WeakMap;let u;const f=new WeakMap;let a=!1;try{a=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(I,A){return a?new OffscreenCanvas(I,A):Js("canvas")}function v(I,A,j){let ce=1;const ue=we(I);if((ue.width>j||ue.height>j)&&(ce=j/Math.max(ue.width,ue.height)),ce<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const le=Math.floor(ce*ue.width),Ne=Math.floor(ce*ue.height);u===void 0&&(u=p(le,Ne));const Ae=A?p(le,Ne):u;return Ae.width=le,Ae.height=Ne,Ae.getContext("2d").drawImage(I,0,0,le,Ne),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ue.width+"x"+ue.height+") to ("+le+"x"+Ne+")."),Ae}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ue.width+"x"+ue.height+")."),I;return I}function m(I){return I.generateMipmaps}function g(I){i.generateMipmap(I)}function S(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(I,A,j,ce,ue=!1){if(I!==null){if(i[I]!==void 0)return i[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let le=A;if(A===i.RED&&(j===i.FLOAT&&(le=i.R32F),j===i.HALF_FLOAT&&(le=i.R16F),j===i.UNSIGNED_BYTE&&(le=i.R8)),A===i.RED_INTEGER&&(j===i.UNSIGNED_BYTE&&(le=i.R8UI),j===i.UNSIGNED_SHORT&&(le=i.R16UI),j===i.UNSIGNED_INT&&(le=i.R32UI),j===i.BYTE&&(le=i.R8I),j===i.SHORT&&(le=i.R16I),j===i.INT&&(le=i.R32I)),A===i.RG&&(j===i.FLOAT&&(le=i.RG32F),j===i.HALF_FLOAT&&(le=i.RG16F),j===i.UNSIGNED_BYTE&&(le=i.RG8)),A===i.RG_INTEGER&&(j===i.UNSIGNED_BYTE&&(le=i.RG8UI),j===i.UNSIGNED_SHORT&&(le=i.RG16UI),j===i.UNSIGNED_INT&&(le=i.RG32UI),j===i.BYTE&&(le=i.RG8I),j===i.SHORT&&(le=i.RG16I),j===i.INT&&(le=i.RG32I)),A===i.RGB_INTEGER&&(j===i.UNSIGNED_BYTE&&(le=i.RGB8UI),j===i.UNSIGNED_SHORT&&(le=i.RGB16UI),j===i.UNSIGNED_INT&&(le=i.RGB32UI),j===i.BYTE&&(le=i.RGB8I),j===i.SHORT&&(le=i.RGB16I),j===i.INT&&(le=i.RGB32I)),A===i.RGBA_INTEGER&&(j===i.UNSIGNED_BYTE&&(le=i.RGBA8UI),j===i.UNSIGNED_SHORT&&(le=i.RGBA16UI),j===i.UNSIGNED_INT&&(le=i.RGBA32UI),j===i.BYTE&&(le=i.RGBA8I),j===i.SHORT&&(le=i.RGBA16I),j===i.INT&&(le=i.RGBA32I)),A===i.RGB&&j===i.UNSIGNED_INT_5_9_9_9_REV&&(le=i.RGB9_E5),A===i.RGBA){const Ne=ue?ia:st.getTransfer(ce);j===i.FLOAT&&(le=i.RGBA32F),j===i.HALF_FLOAT&&(le=i.RGBA16F),j===i.UNSIGNED_BYTE&&(le=Ne===ft?i.SRGB8_ALPHA8:i.RGBA8),j===i.UNSIGNED_SHORT_4_4_4_4&&(le=i.RGBA4),j===i.UNSIGNED_SHORT_5_5_5_1&&(le=i.RGB5_A1)}return(le===i.R16F||le===i.R32F||le===i.RG16F||le===i.RG32F||le===i.RGBA16F||le===i.RGBA32F)&&e.get("EXT_color_buffer_float"),le}function y(I,A){let j;return I?A===null||A===zi||A===vs?j=i.DEPTH24_STENCIL8:A===Kn?j=i.DEPTH32F_STENCIL8:A===js&&(j=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===zi||A===vs?j=i.DEPTH_COMPONENT24:A===Kn?j=i.DEPTH_COMPONENT32F:A===js&&(j=i.DEPTH_COMPONENT16),j}function b(I,A){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==En&&I.minFilter!==Dn?Math.log2(Math.max(A.width,A.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?A.mipmaps.length:1}function w(I){const A=I.target;A.removeEventListener("dispose",w),E(A),A.isVideoTexture&&h.delete(A)}function T(I){const A=I.target;A.removeEventListener("dispose",T),x(A)}function E(I){const A=n.get(I);if(A.__webglInit===void 0)return;const j=I.source,ce=f.get(j);if(ce){const ue=ce[A.__cacheKey];ue.usedTimes--,ue.usedTimes===0&&M(I),Object.keys(ce).length===0&&f.delete(j)}n.remove(I)}function M(I){const A=n.get(I);i.deleteTexture(A.__webglTexture);const j=I.source,ce=f.get(j);delete ce[A.__cacheKey],r.memory.textures--}function x(I){const A=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let ce=0;ce<6;ce++){if(Array.isArray(A.__webglFramebuffer[ce]))for(let ue=0;ue<A.__webglFramebuffer[ce].length;ue++)i.deleteFramebuffer(A.__webglFramebuffer[ce][ue]);else i.deleteFramebuffer(A.__webglFramebuffer[ce]);A.__webglDepthbuffer&&i.deleteRenderbuffer(A.__webglDepthbuffer[ce])}else{if(Array.isArray(A.__webglFramebuffer))for(let ce=0;ce<A.__webglFramebuffer.length;ce++)i.deleteFramebuffer(A.__webglFramebuffer[ce]);else i.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&i.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&i.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let ce=0;ce<A.__webglColorRenderbuffer.length;ce++)A.__webglColorRenderbuffer[ce]&&i.deleteRenderbuffer(A.__webglColorRenderbuffer[ce]);A.__webglDepthRenderbuffer&&i.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const j=I.textures;for(let ce=0,ue=j.length;ce<ue;ce++){const le=n.get(j[ce]);le.__webglTexture&&(i.deleteTexture(le.__webglTexture),r.memory.textures--),n.remove(j[ce])}n.remove(I)}let P=0;function k(){P=0}function U(){const I=P;return I>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+s.maxTextures),P+=1,I}function L(I){const A=[];return A.push(I.wrapS),A.push(I.wrapT),A.push(I.wrapR||0),A.push(I.magFilter),A.push(I.minFilter),A.push(I.anisotropy),A.push(I.internalFormat),A.push(I.format),A.push(I.type),A.push(I.generateMipmaps),A.push(I.premultiplyAlpha),A.push(I.flipY),A.push(I.unpackAlignment),A.push(I.colorSpace),A.join()}function B(I,A){const j=n.get(I);if(I.isVideoTexture&&ae(I),I.isRenderTargetTexture===!1&&I.version>0&&j.__version!==I.version){const ce=I.image;if(ce===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ce.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(j,I,A);return}}t.bindTexture(i.TEXTURE_2D,j.__webglTexture,i.TEXTURE0+A)}function F(I,A){const j=n.get(I);if(I.version>0&&j.__version!==I.version){Z(j,I,A);return}t.bindTexture(i.TEXTURE_2D_ARRAY,j.__webglTexture,i.TEXTURE0+A)}function G(I,A){const j=n.get(I);if(I.version>0&&j.__version!==I.version){Z(j,I,A);return}t.bindTexture(i.TEXTURE_3D,j.__webglTexture,i.TEXTURE0+A)}function O(I,A){const j=n.get(I);if(I.version>0&&j.__version!==I.version){ne(j,I,A);return}t.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture,i.TEXTURE0+A)}const N={[Gt]:i.REPEAT,[mi]:i.CLAMP_TO_EDGE,[ar]:i.MIRRORED_REPEAT},V={[En]:i.NEAREST,[Sd]:i.NEAREST_MIPMAP_NEAREST,[ho]:i.NEAREST_MIPMAP_LINEAR,[Dn]:i.LINEAR,[ha]:i.LINEAR_MIPMAP_NEAREST,[Di]:i.LINEAR_MIPMAP_LINEAR},$={[wd]:i.NEVER,[Rd]:i.ALWAYS,[Td]:i.LESS,[ch]:i.LEQUAL,[Ed]:i.EQUAL,[Pd]:i.GEQUAL,[Ad]:i.GREATER,[Cd]:i.NOTEQUAL};function he(I,A){if(A.type===Kn&&e.has("OES_texture_float_linear")===!1&&(A.magFilter===Dn||A.magFilter===ha||A.magFilter===ho||A.magFilter===Di||A.minFilter===Dn||A.minFilter===ha||A.minFilter===ho||A.minFilter===Di)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,N[A.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,N[A.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,N[A.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,V[A.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,V[A.minFilter]),A.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,$[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===En||A.minFilter!==ho&&A.minFilter!==Di||A.type===Kn&&e.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||n.get(A).__currentAnisotropy){const j=e.get("EXT_texture_filter_anisotropic");i.texParameterf(I,j.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,s.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy}}}function _e(I,A){let j=!1;I.__webglInit===void 0&&(I.__webglInit=!0,A.addEventListener("dispose",w));const ce=A.source;let ue=f.get(ce);ue===void 0&&(ue={},f.set(ce,ue));const le=L(A);if(le!==I.__cacheKey){ue[le]===void 0&&(ue[le]={texture:i.createTexture(),usedTimes:0},r.memory.textures++,j=!0),ue[le].usedTimes++;const Ne=ue[I.__cacheKey];Ne!==void 0&&(ue[I.__cacheKey].usedTimes--,Ne.usedTimes===0&&M(A)),I.__cacheKey=le,I.__webglTexture=ue[le].texture}return j}function Z(I,A,j){let ce=i.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(ce=i.TEXTURE_2D_ARRAY),A.isData3DTexture&&(ce=i.TEXTURE_3D);const ue=_e(I,A),le=A.source;t.bindTexture(ce,I.__webglTexture,i.TEXTURE0+j);const Ne=n.get(le);if(le.version!==Ne.__version||ue===!0){t.activeTexture(i.TEXTURE0+j);const Ae=st.getPrimaries(st.workingColorSpace),Me=A.colorSpace===pi?null:st.getPrimaries(A.colorSpace),We=A.colorSpace===pi||Ae===Me?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,A.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,A.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,We);let me=v(A.image,!1,s.maxTextureSize);me=xe(A,me);const De=o.convert(A.format,A.colorSpace),Ve=o.convert(A.type);let He=_(A.internalFormat,De,Ve,A.colorSpace,A.isVideoTexture);he(ce,A);let ke;const it=A.mipmaps,Je=A.isVideoTexture!==!0,mt=Ne.__version===void 0||ue===!0,H=le.dataReady,Pe=b(A,me);if(A.isDepthTexture)He=y(A.format===ys,A.type),mt&&(Je?t.texStorage2D(i.TEXTURE_2D,1,He,me.width,me.height):t.texImage2D(i.TEXTURE_2D,0,He,me.width,me.height,0,De,Ve,null));else if(A.isDataTexture)if(it.length>0){Je&&mt&&t.texStorage2D(i.TEXTURE_2D,Pe,He,it[0].width,it[0].height);for(let se=0,de=it.length;se<de;se++)ke=it[se],Je?H&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,ke.width,ke.height,De,Ve,ke.data):t.texImage2D(i.TEXTURE_2D,se,He,ke.width,ke.height,0,De,Ve,ke.data);A.generateMipmaps=!1}else Je?(mt&&t.texStorage2D(i.TEXTURE_2D,Pe,He,me.width,me.height),H&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,me.width,me.height,De,Ve,me.data)):t.texImage2D(i.TEXTURE_2D,0,He,me.width,me.height,0,De,Ve,me.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){Je&&mt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Pe,He,it[0].width,it[0].height,me.depth);for(let se=0,de=it.length;se<de;se++)if(ke=it[se],A.format!==Tn)if(De!==null)if(Je){if(H)if(A.layerUpdates.size>0){const Le=ul(ke.width,ke.height,A.format,A.type);for(const Re of A.layerUpdates){const $e=ke.data.subarray(Re*Le/ke.data.BYTES_PER_ELEMENT,(Re+1)*Le/ke.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,Re,ke.width,ke.height,1,De,$e)}A.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,ke.width,ke.height,me.depth,De,ke.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,se,He,ke.width,ke.height,me.depth,0,ke.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Je?H&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,ke.width,ke.height,me.depth,De,Ve,ke.data):t.texImage3D(i.TEXTURE_2D_ARRAY,se,He,ke.width,ke.height,me.depth,0,De,Ve,ke.data)}else{Je&&mt&&t.texStorage2D(i.TEXTURE_2D,Pe,He,it[0].width,it[0].height);for(let se=0,de=it.length;se<de;se++)ke=it[se],A.format!==Tn?De!==null?Je?H&&t.compressedTexSubImage2D(i.TEXTURE_2D,se,0,0,ke.width,ke.height,De,ke.data):t.compressedTexImage2D(i.TEXTURE_2D,se,He,ke.width,ke.height,0,ke.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Je?H&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,ke.width,ke.height,De,Ve,ke.data):t.texImage2D(i.TEXTURE_2D,se,He,ke.width,ke.height,0,De,Ve,ke.data)}else if(A.isDataArrayTexture)if(Je){if(mt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Pe,He,me.width,me.height,me.depth),H)if(A.layerUpdates.size>0){const se=ul(me.width,me.height,A.format,A.type);for(const de of A.layerUpdates){const Le=me.data.subarray(de*se/me.data.BYTES_PER_ELEMENT,(de+1)*se/me.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,de,me.width,me.height,1,De,Ve,Le)}A.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,me.width,me.height,me.depth,De,Ve,me.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,He,me.width,me.height,me.depth,0,De,Ve,me.data);else if(A.isData3DTexture)Je?(mt&&t.texStorage3D(i.TEXTURE_3D,Pe,He,me.width,me.height,me.depth),H&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,me.width,me.height,me.depth,De,Ve,me.data)):t.texImage3D(i.TEXTURE_3D,0,He,me.width,me.height,me.depth,0,De,Ve,me.data);else if(A.isFramebufferTexture){if(mt)if(Je)t.texStorage2D(i.TEXTURE_2D,Pe,He,me.width,me.height);else{let se=me.width,de=me.height;for(let Le=0;Le<Pe;Le++)t.texImage2D(i.TEXTURE_2D,Le,He,se,de,0,De,Ve,null),se>>=1,de>>=1}}else if(it.length>0){if(Je&&mt){const se=we(it[0]);t.texStorage2D(i.TEXTURE_2D,Pe,He,se.width,se.height)}for(let se=0,de=it.length;se<de;se++)ke=it[se],Je?H&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,De,Ve,ke):t.texImage2D(i.TEXTURE_2D,se,He,De,Ve,ke);A.generateMipmaps=!1}else if(Je){if(mt){const se=we(me);t.texStorage2D(i.TEXTURE_2D,Pe,He,se.width,se.height)}H&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,De,Ve,me)}else t.texImage2D(i.TEXTURE_2D,0,He,De,Ve,me);m(A)&&g(ce),Ne.__version=le.version,A.onUpdate&&A.onUpdate(A)}I.__version=A.version}function ne(I,A,j){if(A.image.length!==6)return;const ce=_e(I,A),ue=A.source;t.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+j);const le=n.get(ue);if(ue.version!==le.__version||ce===!0){t.activeTexture(i.TEXTURE0+j);const Ne=st.getPrimaries(st.workingColorSpace),Ae=A.colorSpace===pi?null:st.getPrimaries(A.colorSpace),Me=A.colorSpace===pi||Ne===Ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,A.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,A.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);const We=A.isCompressedTexture||A.image[0].isCompressedTexture,me=A.image[0]&&A.image[0].isDataTexture,De=[];for(let de=0;de<6;de++)!We&&!me?De[de]=v(A.image[de],!0,s.maxCubemapSize):De[de]=me?A.image[de].image:A.image[de],De[de]=xe(A,De[de]);const Ve=De[0],He=o.convert(A.format,A.colorSpace),ke=o.convert(A.type),it=_(A.internalFormat,He,ke,A.colorSpace),Je=A.isVideoTexture!==!0,mt=le.__version===void 0||ce===!0,H=ue.dataReady;let Pe=b(A,Ve);he(i.TEXTURE_CUBE_MAP,A);let se;if(We){Je&&mt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Pe,it,Ve.width,Ve.height);for(let de=0;de<6;de++){se=De[de].mipmaps;for(let Le=0;Le<se.length;Le++){const Re=se[Le];A.format!==Tn?He!==null?Je?H&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Le,0,0,Re.width,Re.height,He,Re.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Le,it,Re.width,Re.height,0,Re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Je?H&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Le,0,0,Re.width,Re.height,He,ke,Re.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Le,it,Re.width,Re.height,0,He,ke,Re.data)}}}else{if(se=A.mipmaps,Je&&mt){se.length>0&&Pe++;const de=we(De[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Pe,it,de.width,de.height)}for(let de=0;de<6;de++)if(me){Je?H&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,0,0,De[de].width,De[de].height,He,ke,De[de].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,it,De[de].width,De[de].height,0,He,ke,De[de].data);for(let Le=0;Le<se.length;Le++){const $e=se[Le].image[de].image;Je?H&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Le+1,0,0,$e.width,$e.height,He,ke,$e.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Le+1,it,$e.width,$e.height,0,He,ke,$e.data)}}else{Je?H&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,0,0,He,ke,De[de]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,it,He,ke,De[de]);for(let Le=0;Le<se.length;Le++){const Re=se[Le];Je?H&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Le+1,0,0,He,ke,Re.image[de]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,Le+1,it,He,ke,Re.image[de])}}}m(A)&&g(i.TEXTURE_CUBE_MAP),le.__version=ue.version,A.onUpdate&&A.onUpdate(A)}I.__version=A.version}function fe(I,A,j,ce,ue,le){const Ne=o.convert(j.format,j.colorSpace),Ae=o.convert(j.type),Me=_(j.internalFormat,Ne,Ae,j.colorSpace),We=n.get(A),me=n.get(j);if(me.__renderTarget=A,!We.__hasExternalTextures){const De=Math.max(1,A.width>>le),Ve=Math.max(1,A.height>>le);ue===i.TEXTURE_3D||ue===i.TEXTURE_2D_ARRAY?t.texImage3D(ue,le,Me,De,Ve,A.depth,0,Ne,Ae,null):t.texImage2D(ue,le,Me,De,Ve,0,Ne,Ae,null)}t.bindFramebuffer(i.FRAMEBUFFER,I),pe(A)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ce,ue,me.__webglTexture,0,te(A)):(ue===i.TEXTURE_2D||ue>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ue<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ce,ue,me.__webglTexture,le),t.bindFramebuffer(i.FRAMEBUFFER,null)}function q(I,A,j){if(i.bindRenderbuffer(i.RENDERBUFFER,I),A.depthBuffer){const ce=A.depthTexture,ue=ce&&ce.isDepthTexture?ce.type:null,le=y(A.stencilBuffer,ue),Ne=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ae=te(A);pe(A)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ae,le,A.width,A.height):j?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ae,le,A.width,A.height):i.renderbufferStorage(i.RENDERBUFFER,le,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ne,i.RENDERBUFFER,I)}else{const ce=A.textures;for(let ue=0;ue<ce.length;ue++){const le=ce[ue],Ne=o.convert(le.format,le.colorSpace),Ae=o.convert(le.type),Me=_(le.internalFormat,Ne,Ae,le.colorSpace),We=te(A);j&&pe(A)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,We,Me,A.width,A.height):pe(A)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,We,Me,A.width,A.height):i.renderbufferStorage(i.RENDERBUFFER,Me,A.width,A.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ee(I,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,I),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ce=n.get(A.depthTexture);ce.__renderTarget=A,(!ce.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),B(A.depthTexture,0);const ue=ce.__webglTexture,le=te(A);if(A.depthTexture.format===ds)pe(A)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ue,0,le):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ue,0);else if(A.depthTexture.format===ys)pe(A)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ue,0,le):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ue,0);else throw new Error("Unknown depthTexture format")}function K(I){const A=n.get(I),j=I.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==I.depthTexture){const ce=I.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),ce){const ue=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,ce.removeEventListener("dispose",ue)};ce.addEventListener("dispose",ue),A.__depthDisposeCallback=ue}A.__boundDepthTexture=ce}if(I.depthTexture&&!A.__autoAllocateDepthBuffer){if(j)throw new Error("target.depthTexture not supported in Cube render targets");ee(A.__webglFramebuffer,I)}else if(j){A.__webglDepthbuffer=[];for(let ce=0;ce<6;ce++)if(t.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer[ce]),A.__webglDepthbuffer[ce]===void 0)A.__webglDepthbuffer[ce]=i.createRenderbuffer(),q(A.__webglDepthbuffer[ce],I,!1);else{const ue=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=A.__webglDepthbuffer[ce];i.bindRenderbuffer(i.RENDERBUFFER,le),i.framebufferRenderbuffer(i.FRAMEBUFFER,ue,i.RENDERBUFFER,le)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=i.createRenderbuffer(),q(A.__webglDepthbuffer,I,!1);else{const ce=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=A.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ue),i.framebufferRenderbuffer(i.FRAMEBUFFER,ce,i.RENDERBUFFER,ue)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function oe(I,A,j){const ce=n.get(I);A!==void 0&&fe(ce.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),j!==void 0&&K(I)}function be(I){const A=I.texture,j=n.get(I),ce=n.get(A);I.addEventListener("dispose",T);const ue=I.textures,le=I.isWebGLCubeRenderTarget===!0,Ne=ue.length>1;if(Ne||(ce.__webglTexture===void 0&&(ce.__webglTexture=i.createTexture()),ce.__version=A.version,r.memory.textures++),le){j.__webglFramebuffer=[];for(let Ae=0;Ae<6;Ae++)if(A.mipmaps&&A.mipmaps.length>0){j.__webglFramebuffer[Ae]=[];for(let Me=0;Me<A.mipmaps.length;Me++)j.__webglFramebuffer[Ae][Me]=i.createFramebuffer()}else j.__webglFramebuffer[Ae]=i.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){j.__webglFramebuffer=[];for(let Ae=0;Ae<A.mipmaps.length;Ae++)j.__webglFramebuffer[Ae]=i.createFramebuffer()}else j.__webglFramebuffer=i.createFramebuffer();if(Ne)for(let Ae=0,Me=ue.length;Ae<Me;Ae++){const We=n.get(ue[Ae]);We.__webglTexture===void 0&&(We.__webglTexture=i.createTexture(),r.memory.textures++)}if(I.samples>0&&pe(I)===!1){j.__webglMultisampledFramebuffer=i.createFramebuffer(),j.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,j.__webglMultisampledFramebuffer);for(let Ae=0;Ae<ue.length;Ae++){const Me=ue[Ae];j.__webglColorRenderbuffer[Ae]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,j.__webglColorRenderbuffer[Ae]);const We=o.convert(Me.format,Me.colorSpace),me=o.convert(Me.type),De=_(Me.internalFormat,We,me,Me.colorSpace,I.isXRRenderTarget===!0),Ve=te(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ve,De,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.RENDERBUFFER,j.__webglColorRenderbuffer[Ae])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&(j.__webglDepthRenderbuffer=i.createRenderbuffer(),q(j.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(le){t.bindTexture(i.TEXTURE_CUBE_MAP,ce.__webglTexture),he(i.TEXTURE_CUBE_MAP,A);for(let Ae=0;Ae<6;Ae++)if(A.mipmaps&&A.mipmaps.length>0)for(let Me=0;Me<A.mipmaps.length;Me++)fe(j.__webglFramebuffer[Ae][Me],I,A,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,Me);else fe(j.__webglFramebuffer[Ae],I,A,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0);m(A)&&g(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ne){for(let Ae=0,Me=ue.length;Ae<Me;Ae++){const We=ue[Ae],me=n.get(We);t.bindTexture(i.TEXTURE_2D,me.__webglTexture),he(i.TEXTURE_2D,We),fe(j.__webglFramebuffer,I,We,i.COLOR_ATTACHMENT0+Ae,i.TEXTURE_2D,0),m(We)&&g(i.TEXTURE_2D)}t.unbindTexture()}else{let Ae=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(Ae=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Ae,ce.__webglTexture),he(Ae,A),A.mipmaps&&A.mipmaps.length>0)for(let Me=0;Me<A.mipmaps.length;Me++)fe(j.__webglFramebuffer[Me],I,A,i.COLOR_ATTACHMENT0,Ae,Me);else fe(j.__webglFramebuffer,I,A,i.COLOR_ATTACHMENT0,Ae,0);m(A)&&g(Ae),t.unbindTexture()}I.depthBuffer&&K(I)}function Y(I){const A=I.textures;for(let j=0,ce=A.length;j<ce;j++){const ue=A[j];if(m(ue)){const le=S(I),Ne=n.get(ue).__webglTexture;t.bindTexture(le,Ne),g(le),t.unbindTexture()}}}const ie=[],D=[];function re(I){if(I.samples>0){if(pe(I)===!1){const A=I.textures,j=I.width,ce=I.height;let ue=i.COLOR_BUFFER_BIT;const le=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ne=n.get(I),Ae=A.length>1;if(Ae)for(let Me=0;Me<A.length;Me++)t.bindFramebuffer(i.FRAMEBUFFER,Ne.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ne.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ne.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ne.__webglFramebuffer);for(let Me=0;Me<A.length;Me++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(ue|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(ue|=i.STENCIL_BUFFER_BIT)),Ae){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ne.__webglColorRenderbuffer[Me]);const We=n.get(A[Me]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,We,0)}i.blitFramebuffer(0,0,j,ce,0,0,j,ce,ue,i.NEAREST),l===!0&&(ie.length=0,D.length=0,ie.push(i.COLOR_ATTACHMENT0+Me),I.depthBuffer&&I.resolveDepthBuffer===!1&&(ie.push(le),D.push(le),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,D)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ie))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Ae)for(let Me=0;Me<A.length;Me++){t.bindFramebuffer(i.FRAMEBUFFER,Ne.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,Ne.__webglColorRenderbuffer[Me]);const We=n.get(A[Me]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ne.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,We,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ne.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){const A=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[A])}}}function te(I){return Math.min(s.maxSamples,I.samples)}function pe(I){const A=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function ae(I){const A=r.render.frame;h.get(I)!==A&&(h.set(I,A),I.update())}function xe(I,A){const j=I.colorSpace,ce=I.format,ue=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||j!==Ss&&j!==pi&&(st.getTransfer(j)===ft?(ce!==Tn||ue!==ni)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",j)),A}function we(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(d.width=I.naturalWidth||I.width,d.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(d.width=I.displayWidth,d.height=I.displayHeight):(d.width=I.width,d.height=I.height),d}this.allocateTextureUnit=U,this.resetTextureUnits=k,this.setTexture2D=B,this.setTexture2DArray=F,this.setTexture3D=G,this.setTextureCube=O,this.rebindTextures=oe,this.setupRenderTarget=be,this.updateRenderTargetMipmap=Y,this.updateMultisampleRenderTarget=re,this.setupDepthRenderbuffer=K,this.setupFrameBufferTexture=fe,this.useMultisampledRTT=pe}function Km(i,e){function t(n,s=pi){let o;const r=st.getTransfer(s);if(n===ni)return i.UNSIGNED_BYTE;if(n===Xr)return i.UNSIGNED_SHORT_4_4_4_4;if(n===qr)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Ql)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Kl)return i.BYTE;if(n===Jl)return i.SHORT;if(n===js)return i.UNSIGNED_SHORT;if(n===Wr)return i.INT;if(n===zi)return i.UNSIGNED_INT;if(n===Kn)return i.FLOAT;if(n===no)return i.HALF_FLOAT;if(n===eh)return i.ALPHA;if(n===th)return i.RGB;if(n===Tn)return i.RGBA;if(n===nh)return i.LUMINANCE;if(n===ih)return i.LUMINANCE_ALPHA;if(n===ds)return i.DEPTH_COMPONENT;if(n===ys)return i.DEPTH_STENCIL;if(n===sh)return i.RED;if(n===Yr)return i.RED_INTEGER;if(n===oh)return i.RG;if(n===Zr)return i.RG_INTEGER;if(n===$r)return i.RGBA_INTEGER;if(n===Wo||n===Xo||n===qo||n===Yo)if(r===ft)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===Wo)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Xo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===qo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Yo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===Wo)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Xo)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===qo)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Yo)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===rr||n===cr||n===lr||n===hr)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===rr)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===cr)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===lr)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===hr)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===dr||n===ur||n===fr)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(n===dr||n===ur)return r===ft?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===fr)return r===ft?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===pr||n===mr||n===gr||n===vr||n===yr||n===_r||n===Sr||n===xr||n===Mr||n===br||n===wr||n===Tr||n===Er||n===Ar)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(n===pr)return r===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===mr)return r===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===gr)return r===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===vr)return r===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===yr)return r===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===_r)return r===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Sr)return r===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===xr)return r===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Mr)return r===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===br)return r===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===wr)return r===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Tr)return r===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Er)return r===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ar)return r===ft?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Zo||n===Cr||n===Pr)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(n===Zo)return r===ft?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Cr)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Pr)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ah||n===Rr||n===Ir||n===Lr)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(n===Zo)return o.COMPRESSED_RED_RGTC1_EXT;if(n===Rr)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ir)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Lr)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===vs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class Jm extends rn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class ye extends Ft{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Qm={type:"move"};class Na{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ye,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ye,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ye,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,o=null,r=null;const c=this._targetRay,l=this._grip,d=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(d&&e.hand){r=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),g=this._getHandJoint(d,v);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}const h=d.joints["index-finger-tip"],u=d.joints["thumb-tip"],f=h.position.distanceTo(u.position),a=.02,p=.005;d.inputState.pinching&&f>a+p?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!d.inputState.pinching&&f<=a-p&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(o=t.getPose(e.gripSpace,n),o!==null&&(l.matrix.fromArray(o.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,o.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(o.linearVelocity)):l.hasLinearVelocity=!1,o.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(o.angularVelocity)):l.hasAngularVelocity=!1));c!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&o!==null&&(s=o),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(Qm)))}return c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),d!==null&&(d.visible=r!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new ye;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const eg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,tg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class ng{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new qt,o=e.properties.get(s);o.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Nn({vertexShader:eg,fragmentShader:tg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new C(new Jt(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ig extends xs{constructor(e,t){super();const n=this;let s=null,o=1,r=null,c="local-floor",l=1,d=null,h=null,u=null,f=null,a=null,p=null;const v=new ng,m=t.getContextAttributes();let g=null,S=null;const _=[],y=[],b=new ge;let w=null;const T=new rn;T.viewport=new Ct;const E=new rn;E.viewport=new Ct;const M=[T,E],x=new Jm;let P=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let ne=_[Z];return ne===void 0&&(ne=new Na,_[Z]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(Z){let ne=_[Z];return ne===void 0&&(ne=new Na,_[Z]=ne),ne.getGripSpace()},this.getHand=function(Z){let ne=_[Z];return ne===void 0&&(ne=new Na,_[Z]=ne),ne.getHandSpace()};function U(Z){const ne=y.indexOf(Z.inputSource);if(ne===-1)return;const fe=_[ne];fe!==void 0&&(fe.update(Z.inputSource,Z.frame,d||r),fe.dispatchEvent({type:Z.type,data:Z.inputSource}))}function L(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",L),s.removeEventListener("inputsourceschange",B);for(let Z=0;Z<_.length;Z++){const ne=y[Z];ne!==null&&(y[Z]=null,_[Z].disconnect(ne))}P=null,k=null,v.reset(),e.setRenderTarget(g),a=null,f=null,u=null,s=null,S=null,_e.stop(),n.isPresenting=!1,e.setPixelRatio(w),e.setSize(b.width,b.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){o=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){c=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||r},this.setReferenceSpace=function(Z){d=Z},this.getBaseLayer=function(){return f!==null?f:a},this.getBinding=function(){return u},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(g=e.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",L),s.addEventListener("inputsourceschange",B),m.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(b),s.renderState.layers===void 0){const ne={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:o};a=new XRWebGLLayer(s,t,ne),s.updateRenderState({baseLayer:a}),e.setPixelRatio(1),e.setSize(a.framebufferWidth,a.framebufferHeight,!1),S=new Ui(a.framebufferWidth,a.framebufferHeight,{format:Tn,type:ni,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let ne=null,fe=null,q=null;m.depth&&(q=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ne=m.stencil?ys:ds,fe=m.stencil?vs:zi);const ee={colorFormat:t.RGBA8,depthFormat:q,scaleFactor:o};u=new XRWebGLBinding(s,t),f=u.createProjectionLayer(ee),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new Ui(f.textureWidth,f.textureHeight,{format:Tn,type:ni,depthTexture:new xh(f.textureWidth,f.textureHeight,fe,void 0,void 0,void 0,void 0,void 0,void 0,ne),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),d=null,r=await s.requestReferenceSpace(c),_e.setContext(s),_e.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function B(Z){for(let ne=0;ne<Z.removed.length;ne++){const fe=Z.removed[ne],q=y.indexOf(fe);q>=0&&(y[q]=null,_[q].disconnect(fe))}for(let ne=0;ne<Z.added.length;ne++){const fe=Z.added[ne];let q=y.indexOf(fe);if(q===-1){for(let K=0;K<_.length;K++)if(K>=y.length){y.push(fe),q=K;break}else if(y[K]===null){y[K]=fe,q=K;break}if(q===-1)break}const ee=_[q];ee&&ee.connect(fe)}}const F=new z,G=new z;function O(Z,ne,fe){F.setFromMatrixPosition(ne.matrixWorld),G.setFromMatrixPosition(fe.matrixWorld);const q=F.distanceTo(G),ee=ne.projectionMatrix.elements,K=fe.projectionMatrix.elements,oe=ee[14]/(ee[10]-1),be=ee[14]/(ee[10]+1),Y=(ee[9]+1)/ee[5],ie=(ee[9]-1)/ee[5],D=(ee[8]-1)/ee[0],re=(K[8]+1)/K[0],te=oe*D,pe=oe*re,ae=q/(-D+re),xe=ae*-D;if(ne.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(xe),Z.translateZ(ae),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),ee[10]===-1)Z.projectionMatrix.copy(ne.projectionMatrix),Z.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const we=oe+ae,I=be+ae,A=te-xe,j=pe+(q-xe),ce=Y*be/I*we,ue=ie*be/I*we;Z.projectionMatrix.makePerspective(A,j,ce,ue,we,I),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function N(Z,ne){ne===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(ne.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let ne=Z.near,fe=Z.far;v.texture!==null&&(v.depthNear>0&&(ne=v.depthNear),v.depthFar>0&&(fe=v.depthFar)),x.near=E.near=T.near=ne,x.far=E.far=T.far=fe,(P!==x.near||k!==x.far)&&(s.updateRenderState({depthNear:x.near,depthFar:x.far}),P=x.near,k=x.far),T.layers.mask=Z.layers.mask|2,E.layers.mask=Z.layers.mask|4,x.layers.mask=T.layers.mask|E.layers.mask;const q=Z.parent,ee=x.cameras;N(x,q);for(let K=0;K<ee.length;K++)N(ee[K],q);ee.length===2?O(x,T,E):x.projectionMatrix.copy(T.projectionMatrix),V(Z,x,q)};function V(Z,ne,fe){fe===null?Z.matrix.copy(ne.matrixWorld):(Z.matrix.copy(fe.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(ne.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(ne.projectionMatrix),Z.projectionMatrixInverse.copy(ne.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Ks*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(f===null&&a===null))return l},this.setFoveation=function(Z){l=Z,f!==null&&(f.fixedFoveation=Z),a!==null&&a.fixedFoveation!==void 0&&(a.fixedFoveation=Z)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(x)};let $=null;function he(Z,ne){if(h=ne.getViewerPose(d||r),p=ne,h!==null){const fe=h.views;a!==null&&(e.setRenderTargetFramebuffer(S,a.framebuffer),e.setRenderTarget(S));let q=!1;fe.length!==x.cameras.length&&(x.cameras.length=0,q=!0);for(let K=0;K<fe.length;K++){const oe=fe[K];let be=null;if(a!==null)be=a.getViewport(oe);else{const ie=u.getViewSubImage(f,oe);be=ie.viewport,K===0&&(e.setRenderTargetTextures(S,ie.colorTexture,f.ignoreDepthValues?void 0:ie.depthStencilTexture),e.setRenderTarget(S))}let Y=M[K];Y===void 0&&(Y=new rn,Y.layers.enable(K),Y.viewport=new Ct,M[K]=Y),Y.matrix.fromArray(oe.transform.matrix),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.projectionMatrix.fromArray(oe.projectionMatrix),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert(),Y.viewport.set(be.x,be.y,be.width,be.height),K===0&&(x.matrix.copy(Y.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),q===!0&&x.cameras.push(Y)}const ee=s.enabledFeatures;if(ee&&ee.includes("depth-sensing")){const K=u.getDepthInformation(fe[0]);K&&K.isValid&&K.texture&&v.init(e,K,s.renderState)}}for(let fe=0;fe<_.length;fe++){const q=y[fe],ee=_[fe];q!==null&&ee!==void 0&&ee.update(q,ne,d||r)}$&&$(Z,ne),ne.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ne}),p=null}const _e=new _h;_e.setAnimationLoop(he),this.setAnimationLoop=function(Z){$=Z},this.dispose=function(){}}}const Ai=new Un,sg=new _t;function og(i,e){function t(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function n(m,g){g.color.getRGB(m.fogColor.value,gh(i)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function s(m,g,S,_,y){g.isMeshBasicMaterial||g.isMeshLambertMaterial?o(m,g):g.isMeshToonMaterial?(o(m,g),u(m,g)):g.isMeshPhongMaterial?(o(m,g),h(m,g)):g.isMeshStandardMaterial?(o(m,g),f(m,g),g.isMeshPhysicalMaterial&&a(m,g,y)):g.isMeshMatcapMaterial?(o(m,g),p(m,g)):g.isMeshDepthMaterial?o(m,g):g.isMeshDistanceMaterial?(o(m,g),v(m,g)):g.isMeshNormalMaterial?o(m,g):g.isLineBasicMaterial?(r(m,g),g.isLineDashedMaterial&&c(m,g)):g.isPointsMaterial?l(m,g,S,_):g.isSpriteMaterial?d(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function o(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,t(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===Kt&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,t(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===Kt&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,t(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,t(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);const S=e.get(g),_=S.envMap,y=S.envMapRotation;_&&(m.envMap.value=_,Ai.copy(y),Ai.x*=-1,Ai.y*=-1,Ai.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Ai.y*=-1,Ai.z*=-1),m.envMapRotation.value.setFromMatrix4(sg.makeRotationFromEuler(Ai)),m.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,m.aoMapTransform))}function r(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform))}function c(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,S,_){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*S,m.scale.value=_*.5,g.map&&(m.map.value=g.map,t(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function d(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function u(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function f(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function a(m,g,S){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Kt&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function v(m,g){const S=e.get(g).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function ag(i,e,t,n){let s={},o={},r=[];const c=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,_){const y=_.program;n.uniformBlockBinding(S,y)}function d(S,_){let y=s[S.id];y===void 0&&(p(S),y=h(S),s[S.id]=y,S.addEventListener("dispose",m));const b=_.program;n.updateUBOMapping(S,b);const w=e.render.frame;o[S.id]!==w&&(f(S),o[S.id]=w)}function h(S){const _=u();S.__bindingPointIndex=_;const y=i.createBuffer(),b=S.__size,w=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,b,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,_,y),y}function u(){for(let S=0;S<c;S++)if(r.indexOf(S)===-1)return r.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(S){const _=s[S.id],y=S.uniforms,b=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let w=0,T=y.length;w<T;w++){const E=Array.isArray(y[w])?y[w]:[y[w]];for(let M=0,x=E.length;M<x;M++){const P=E[M];if(a(P,w,M,b)===!0){const k=P.__offset,U=Array.isArray(P.value)?P.value:[P.value];let L=0;for(let B=0;B<U.length;B++){const F=U[B],G=v(F);typeof F=="number"||typeof F=="boolean"?(P.__data[0]=F,i.bufferSubData(i.UNIFORM_BUFFER,k+L,P.__data)):F.isMatrix3?(P.__data[0]=F.elements[0],P.__data[1]=F.elements[1],P.__data[2]=F.elements[2],P.__data[3]=0,P.__data[4]=F.elements[3],P.__data[5]=F.elements[4],P.__data[6]=F.elements[5],P.__data[7]=0,P.__data[8]=F.elements[6],P.__data[9]=F.elements[7],P.__data[10]=F.elements[8],P.__data[11]=0):(F.toArray(P.__data,L),L+=G.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,k,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function a(S,_,y,b){const w=S.value,T=_+"_"+y;if(b[T]===void 0)return typeof w=="number"||typeof w=="boolean"?b[T]=w:b[T]=w.clone(),!0;{const E=b[T];if(typeof w=="number"||typeof w=="boolean"){if(E!==w)return b[T]=w,!0}else if(E.equals(w)===!1)return E.copy(w),!0}return!1}function p(S){const _=S.uniforms;let y=0;const b=16;for(let T=0,E=_.length;T<E;T++){const M=Array.isArray(_[T])?_[T]:[_[T]];for(let x=0,P=M.length;x<P;x++){const k=M[x],U=Array.isArray(k.value)?k.value:[k.value];for(let L=0,B=U.length;L<B;L++){const F=U[L],G=v(F),O=y%b,N=O%G.boundary,V=O+N;y+=N,V!==0&&b-V<G.storage&&(y+=b-V),k.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=y,y+=G.storage}}}const w=y%b;return w>0&&(y+=b-w),S.__size=y,S.__cache={},this}function v(S){const _={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(_.boundary=4,_.storage=4):S.isVector2?(_.boundary=8,_.storage=8):S.isVector3||S.isColor?(_.boundary=16,_.storage=12):S.isVector4?(_.boundary=16,_.storage=16):S.isMatrix3?(_.boundary=48,_.storage=48):S.isMatrix4?(_.boundary=64,_.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),_}function m(S){const _=S.target;_.removeEventListener("dispose",m);const y=r.indexOf(_.__bindingPointIndex);r.splice(y,1),i.deleteBuffer(s[_.id]),delete s[_.id],delete o[_.id]}function g(){for(const S in s)i.deleteBuffer(s[S]);r=[],s={},o={}}return{bind:l,update:d,dispose:g}}class rg{constructor(e={}){const{canvas:t=Yd(),context:n=null,depth:s=!0,stencil:o=!1,alpha:r=!1,antialias:c=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:d=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let a;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");a=n.getContextAttributes().alpha}else a=r;const p=new Uint32Array(4),v=new Int32Array(4);let m=null,g=null;const S=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=et,this.toneMapping=vi,this.toneMappingExposure=1;const y=this;let b=!1,w=0,T=0,E=null,M=-1,x=null;const P=new Ct,k=new Ct;let U=null;const L=new Ye(0);let B=0,F=t.width,G=t.height,O=1,N=null,V=null;const $=new Ct(0,0,F,G),he=new Ct(0,0,F,G);let _e=!1;const Z=new Jr;let ne=!1,fe=!1;const q=new _t,ee=new _t,K=new z,oe=new Ct,be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Y=!1;function ie(){return E===null?O:1}let D=n;function re(R,W){return t.getContext(R,W)}try{const R={alpha:!0,depth:s,stencil:o,antialias:c,premultipliedAlpha:l,preserveDrawingBuffer:d,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Hr}`),t.addEventListener("webglcontextlost",de,!1),t.addEventListener("webglcontextrestored",Le,!1),t.addEventListener("webglcontextcreationerror",Re,!1),D===null){const W="webgl2";if(D=re(W,R),D===null)throw re(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let te,pe,ae,xe,we,I,A,j,ce,ue,le,Ne,Ae,Me,We,me,De,Ve,He,ke,it,Je,mt,H;function Pe(){te=new u0(D),te.init(),Je=new Km(D,te),pe=new a0(D,te,e,Je),ae=new Zm(D,te),pe.reverseDepthBuffer&&f&&ae.buffers.depth.setReversed(!0),xe=new m0(D),we=new Dm,I=new jm(D,te,ae,we,pe,Je,xe),A=new c0(y),j=new d0(y),ce=new xu(D),mt=new s0(D,ce),ue=new f0(D,ce,xe,mt),le=new v0(D,ue,ce,xe),He=new g0(D,pe,I),me=new r0(we),Ne=new Lm(y,A,j,te,pe,mt,me),Ae=new og(y,we),Me=new zm,We=new Om(te),Ve=new i0(y,A,j,ae,le,a,l),De=new qm(y,le,pe),H=new ag(D,xe,pe,ae),ke=new o0(D,te,xe),it=new p0(D,te,xe),xe.programs=Ne.programs,y.capabilities=pe,y.extensions=te,y.properties=we,y.renderLists=Me,y.shadowMap=De,y.state=ae,y.info=xe}Pe();const se=new ig(y,D);this.xr=se,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const R=te.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=te.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(R){R!==void 0&&(O=R,this.setSize(F,G,!1))},this.getSize=function(R){return R.set(F,G)},this.setSize=function(R,W,J=!0){if(se.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=R,G=W,t.width=Math.floor(R*O),t.height=Math.floor(W*O),J===!0&&(t.style.width=R+"px",t.style.height=W+"px"),this.setViewport(0,0,R,W)},this.getDrawingBufferSize=function(R){return R.set(F*O,G*O).floor()},this.setDrawingBufferSize=function(R,W,J){F=R,G=W,O=J,t.width=Math.floor(R*J),t.height=Math.floor(W*J),this.setViewport(0,0,R,W)},this.getCurrentViewport=function(R){return R.copy(P)},this.getViewport=function(R){return R.copy($)},this.setViewport=function(R,W,J,Q){R.isVector4?$.set(R.x,R.y,R.z,R.w):$.set(R,W,J,Q),ae.viewport(P.copy($).multiplyScalar(O).round())},this.getScissor=function(R){return R.copy(he)},this.setScissor=function(R,W,J,Q){R.isVector4?he.set(R.x,R.y,R.z,R.w):he.set(R,W,J,Q),ae.scissor(k.copy(he).multiplyScalar(O).round())},this.getScissorTest=function(){return _e},this.setScissorTest=function(R){ae.setScissorTest(_e=R)},this.setOpaqueSort=function(R){N=R},this.setTransparentSort=function(R){V=R},this.getClearColor=function(R){return R.copy(Ve.getClearColor())},this.setClearColor=function(){Ve.setClearColor.apply(Ve,arguments)},this.getClearAlpha=function(){return Ve.getClearAlpha()},this.setClearAlpha=function(){Ve.setClearAlpha.apply(Ve,arguments)},this.clear=function(R=!0,W=!0,J=!0){let Q=0;if(R){let X=!1;if(E!==null){const ve=E.texture.format;X=ve===$r||ve===Zr||ve===Yr}if(X){const ve=E.texture.type,Ie=ve===ni||ve===zi||ve===js||ve===vs||ve===Xr||ve===qr,Be=Ve.getClearColor(),Fe=Ve.getClearAlpha(),Xe=Be.r,je=Be.g,Ge=Be.b;Ie?(p[0]=Xe,p[1]=je,p[2]=Ge,p[3]=Fe,D.clearBufferuiv(D.COLOR,0,p)):(v[0]=Xe,v[1]=je,v[2]=Ge,v[3]=Fe,D.clearBufferiv(D.COLOR,0,v))}else Q|=D.COLOR_BUFFER_BIT}W&&(Q|=D.DEPTH_BUFFER_BIT),J&&(Q|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",de,!1),t.removeEventListener("webglcontextrestored",Le,!1),t.removeEventListener("webglcontextcreationerror",Re,!1),Me.dispose(),We.dispose(),we.dispose(),A.dispose(),j.dispose(),le.dispose(),mt.dispose(),H.dispose(),Ne.dispose(),se.dispose(),se.removeEventListener("sessionstart",rc),se.removeEventListener("sessionend",cc),xi.stop()};function de(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function Le(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const R=xe.autoReset,W=De.enabled,J=De.autoUpdate,Q=De.needsUpdate,X=De.type;Pe(),xe.autoReset=R,De.enabled=W,De.autoUpdate=J,De.needsUpdate=Q,De.type=X}function Re(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function $e(R){const W=R.target;W.removeEventListener("dispose",$e),bt(W)}function bt(R){Vt(R),we.remove(R)}function Vt(R){const W=we.get(R).programs;W!==void 0&&(W.forEach(function(J){Ne.releaseProgram(J)}),R.isShaderMaterial&&Ne.releaseShaderCache(R))}this.renderBufferDirect=function(R,W,J,Q,X,ve){W===null&&(W=be);const Ie=X.isMesh&&X.matrixWorld.determinant()<0,Be=Hh(R,W,J,Q,X);ae.setMaterial(Q,Ie);let Fe=J.index,Xe=1;if(Q.wireframe===!0){if(Fe=ue.getWireframeAttribute(J),Fe===void 0)return;Xe=2}const je=J.drawRange,Ge=J.attributes.position;let ot=je.start*Xe,gt=(je.start+je.count)*Xe;ve!==null&&(ot=Math.max(ot,ve.start*Xe),gt=Math.min(gt,(ve.start+ve.count)*Xe)),Fe!==null?(ot=Math.max(ot,0),gt=Math.min(gt,Fe.count)):Ge!=null&&(ot=Math.max(ot,0),gt=Math.min(gt,Ge.count));const vt=gt-ot;if(vt<0||vt===1/0)return;mt.setup(X,Q,Be,J,Fe);let Qt,rt=ke;if(Fe!==null&&(Qt=ce.get(Fe),rt=it,rt.setIndex(Qt)),X.isMesh)Q.wireframe===!0?(ae.setLineWidth(Q.wireframeLinewidth*ie()),rt.setMode(D.LINES)):rt.setMode(D.TRIANGLES);else if(X.isLine){let Oe=Q.linewidth;Oe===void 0&&(Oe=1),ae.setLineWidth(Oe*ie()),X.isLineSegments?rt.setMode(D.LINES):X.isLineLoop?rt.setMode(D.LINE_LOOP):rt.setMode(D.LINE_STRIP)}else X.isPoints?rt.setMode(D.POINTS):X.isSprite&&rt.setMode(D.TRIANGLES);if(X.isBatchedMesh)if(X._multiDrawInstances!==null)rt.renderMultiDrawInstances(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount,X._multiDrawInstances);else if(te.get("WEBGL_multi_draw"))rt.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const Oe=X._multiDrawStarts,Gn=X._multiDrawCounts,ct=X._multiDrawCount,gn=Fe?ce.get(Fe).bytesPerElement:1,Bi=we.get(Q).currentProgram.getUniforms();for(let tn=0;tn<ct;tn++)Bi.setValue(D,"_gl_DrawID",tn),rt.render(Oe[tn]/gn,Gn[tn])}else if(X.isInstancedMesh)rt.renderInstances(ot,vt,X.count);else if(J.isInstancedBufferGeometry){const Oe=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Gn=Math.min(J.instanceCount,Oe);rt.renderInstances(ot,vt,Gn)}else rt.render(ot,vt)};function dt(R,W,J){R.transparent===!0&&R.side===At&&R.forceSinglePass===!1?(R.side=Kt,R.needsUpdate=!0,lo(R,W,J),R.side=_i,R.needsUpdate=!0,lo(R,W,J),R.side=At):lo(R,W,J)}this.compile=function(R,W,J=null){J===null&&(J=R),g=We.get(J),g.init(W),_.push(g),J.traverseVisible(function(X){X.isLight&&X.layers.test(W.layers)&&(g.pushLight(X),X.castShadow&&g.pushShadow(X))}),R!==J&&R.traverseVisible(function(X){X.isLight&&X.layers.test(W.layers)&&(g.pushLight(X),X.castShadow&&g.pushShadow(X))}),g.setupLights();const Q=new Set;return R.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const ve=X.material;if(ve)if(Array.isArray(ve))for(let Ie=0;Ie<ve.length;Ie++){const Be=ve[Ie];dt(Be,J,X),Q.add(Be)}else dt(ve,J,X),Q.add(ve)}),_.pop(),g=null,Q},this.compileAsync=function(R,W,J=null){const Q=this.compile(R,W,J);return new Promise(X=>{function ve(){if(Q.forEach(function(Ie){we.get(Ie).currentProgram.isReady()&&Q.delete(Ie)}),Q.size===0){X(R);return}setTimeout(ve,10)}te.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let mn=null;function Fn(R){mn&&mn(R)}function rc(){xi.stop()}function cc(){xi.start()}const xi=new _h;xi.setAnimationLoop(Fn),typeof self<"u"&&xi.setContext(self),this.setAnimationLoop=function(R){mn=R,se.setAnimationLoop(R),R===null?xi.stop():xi.start()},se.addEventListener("sessionstart",rc),se.addEventListener("sessionend",cc),this.render=function(R,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),se.enabled===!0&&se.isPresenting===!0&&(se.cameraAutoUpdate===!0&&se.updateCamera(W),W=se.getCamera()),R.isScene===!0&&R.onBeforeRender(y,R,W,E),g=We.get(R,_.length),g.init(W),_.push(g),ee.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),Z.setFromProjectionMatrix(ee),fe=this.localClippingEnabled,ne=me.init(this.clippingPlanes,fe),m=Me.get(R,S.length),m.init(),S.push(m),se.enabled===!0&&se.isPresenting===!0){const ve=y.xr.getDepthSensingMesh();ve!==null&&la(ve,W,-1/0,y.sortObjects)}la(R,W,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(N,V),Y=se.enabled===!1||se.isPresenting===!1||se.hasDepthSensing()===!1,Y&&Ve.addToRenderList(m,R),this.info.render.frame++,ne===!0&&me.beginShadows();const J=g.state.shadowsArray;De.render(J,R,W),ne===!0&&me.endShadows(),this.info.autoReset===!0&&this.info.reset();const Q=m.opaque,X=m.transmissive;if(g.setupLights(),W.isArrayCamera){const ve=W.cameras;if(X.length>0)for(let Ie=0,Be=ve.length;Ie<Be;Ie++){const Fe=ve[Ie];hc(Q,X,R,Fe)}Y&&Ve.render(R);for(let Ie=0,Be=ve.length;Ie<Be;Ie++){const Fe=ve[Ie];lc(m,R,Fe,Fe.viewport)}}else X.length>0&&hc(Q,X,R,W),Y&&Ve.render(R),lc(m,R,W);E!==null&&(I.updateMultisampleRenderTarget(E),I.updateRenderTargetMipmap(E)),R.isScene===!0&&R.onAfterRender(y,R,W),mt.resetDefaultState(),M=-1,x=null,_.pop(),_.length>0?(g=_[_.length-1],ne===!0&&me.setGlobalState(y.clippingPlanes,g.state.camera)):g=null,S.pop(),S.length>0?m=S[S.length-1]:m=null};function la(R,W,J,Q){if(R.visible===!1)return;if(R.layers.test(W.layers)){if(R.isGroup)J=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(W);else if(R.isLight)g.pushLight(R),R.castShadow&&g.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||Z.intersectsSprite(R)){Q&&oe.setFromMatrixPosition(R.matrixWorld).applyMatrix4(ee);const Ie=le.update(R),Be=R.material;Be.visible&&m.push(R,Ie,Be,J,oe.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||Z.intersectsObject(R))){const Ie=le.update(R),Be=R.material;if(Q&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),oe.copy(R.boundingSphere.center)):(Ie.boundingSphere===null&&Ie.computeBoundingSphere(),oe.copy(Ie.boundingSphere.center)),oe.applyMatrix4(R.matrixWorld).applyMatrix4(ee)),Array.isArray(Be)){const Fe=Ie.groups;for(let Xe=0,je=Fe.length;Xe<je;Xe++){const Ge=Fe[Xe],ot=Be[Ge.materialIndex];ot&&ot.visible&&m.push(R,Ie,ot,J,oe.z,Ge)}}else Be.visible&&m.push(R,Ie,Be,J,oe.z,null)}}const ve=R.children;for(let Ie=0,Be=ve.length;Ie<Be;Ie++)la(ve[Ie],W,J,Q)}function lc(R,W,J,Q){const X=R.opaque,ve=R.transmissive,Ie=R.transparent;g.setupLightsView(J),ne===!0&&me.setGlobalState(y.clippingPlanes,J),Q&&ae.viewport(P.copy(Q)),X.length>0&&co(X,W,J),ve.length>0&&co(ve,W,J),Ie.length>0&&co(Ie,W,J),ae.buffers.depth.setTest(!0),ae.buffers.depth.setMask(!0),ae.buffers.color.setMask(!0),ae.setPolygonOffset(!1)}function hc(R,W,J,Q){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[Q.id]===void 0&&(g.state.transmissionRenderTarget[Q.id]=new Ui(1,1,{generateMipmaps:!0,type:te.has("EXT_color_buffer_half_float")||te.has("EXT_color_buffer_float")?no:ni,minFilter:Di,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:st.workingColorSpace}));const ve=g.state.transmissionRenderTarget[Q.id],Ie=Q.viewport||P;ve.setSize(Ie.z,Ie.w);const Be=y.getRenderTarget();y.setRenderTarget(ve),y.getClearColor(L),B=y.getClearAlpha(),B<1&&y.setClearColor(16777215,.5),y.clear(),Y&&Ve.render(J);const Fe=y.toneMapping;y.toneMapping=vi;const Xe=Q.viewport;if(Q.viewport!==void 0&&(Q.viewport=void 0),g.setupLightsView(Q),ne===!0&&me.setGlobalState(y.clippingPlanes,Q),co(R,J,Q),I.updateMultisampleRenderTarget(ve),I.updateRenderTargetMipmap(ve),te.has("WEBGL_multisampled_render_to_texture")===!1){let je=!1;for(let Ge=0,ot=W.length;Ge<ot;Ge++){const gt=W[Ge],vt=gt.object,Qt=gt.geometry,rt=gt.material,Oe=gt.group;if(rt.side===At&&vt.layers.test(Q.layers)){const Gn=rt.side;rt.side=Kt,rt.needsUpdate=!0,dc(vt,J,Q,Qt,rt,Oe),rt.side=Gn,rt.needsUpdate=!0,je=!0}}je===!0&&(I.updateMultisampleRenderTarget(ve),I.updateRenderTargetMipmap(ve))}y.setRenderTarget(Be),y.setClearColor(L,B),Xe!==void 0&&(Q.viewport=Xe),y.toneMapping=Fe}function co(R,W,J){const Q=W.isScene===!0?W.overrideMaterial:null;for(let X=0,ve=R.length;X<ve;X++){const Ie=R[X],Be=Ie.object,Fe=Ie.geometry,Xe=Q===null?Ie.material:Q,je=Ie.group;Be.layers.test(J.layers)&&dc(Be,W,J,Fe,Xe,je)}}function dc(R,W,J,Q,X,ve){R.onBeforeRender(y,W,J,Q,X,ve),R.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),X.onBeforeRender(y,W,J,Q,R,ve),X.transparent===!0&&X.side===At&&X.forceSinglePass===!1?(X.side=Kt,X.needsUpdate=!0,y.renderBufferDirect(J,W,Q,X,R,ve),X.side=_i,X.needsUpdate=!0,y.renderBufferDirect(J,W,Q,X,R,ve),X.side=At):y.renderBufferDirect(J,W,Q,X,R,ve),R.onAfterRender(y,W,J,Q,X,ve)}function lo(R,W,J){W.isScene!==!0&&(W=be);const Q=we.get(R),X=g.state.lights,ve=g.state.shadowsArray,Ie=X.state.version,Be=Ne.getParameters(R,X.state,ve,W,J),Fe=Ne.getProgramCacheKey(Be);let Xe=Q.programs;Q.environment=R.isMeshStandardMaterial?W.environment:null,Q.fog=W.fog,Q.envMap=(R.isMeshStandardMaterial?j:A).get(R.envMap||Q.environment),Q.envMapRotation=Q.environment!==null&&R.envMap===null?W.environmentRotation:R.envMapRotation,Xe===void 0&&(R.addEventListener("dispose",$e),Xe=new Map,Q.programs=Xe);let je=Xe.get(Fe);if(je!==void 0){if(Q.currentProgram===je&&Q.lightsStateVersion===Ie)return fc(R,Be),je}else Be.uniforms=Ne.getUniforms(R),R.onBeforeCompile(Be,y),je=Ne.acquireProgram(Be,Fe),Xe.set(Fe,je),Q.uniforms=Be.uniforms;const Ge=Q.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Ge.clippingPlanes=me.uniform),fc(R,Be),Q.needsLights=Xh(R),Q.lightsStateVersion=Ie,Q.needsLights&&(Ge.ambientLightColor.value=X.state.ambient,Ge.lightProbe.value=X.state.probe,Ge.directionalLights.value=X.state.directional,Ge.directionalLightShadows.value=X.state.directionalShadow,Ge.spotLights.value=X.state.spot,Ge.spotLightShadows.value=X.state.spotShadow,Ge.rectAreaLights.value=X.state.rectArea,Ge.ltc_1.value=X.state.rectAreaLTC1,Ge.ltc_2.value=X.state.rectAreaLTC2,Ge.pointLights.value=X.state.point,Ge.pointLightShadows.value=X.state.pointShadow,Ge.hemisphereLights.value=X.state.hemi,Ge.directionalShadowMap.value=X.state.directionalShadowMap,Ge.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Ge.spotShadowMap.value=X.state.spotShadowMap,Ge.spotLightMatrix.value=X.state.spotLightMatrix,Ge.spotLightMap.value=X.state.spotLightMap,Ge.pointShadowMap.value=X.state.pointShadowMap,Ge.pointShadowMatrix.value=X.state.pointShadowMatrix),Q.currentProgram=je,Q.uniformsList=null,je}function uc(R){if(R.uniformsList===null){const W=R.currentProgram.getUniforms();R.uniformsList=$o.seqWithValue(W.seq,R.uniforms)}return R.uniformsList}function fc(R,W){const J=we.get(R);J.outputColorSpace=W.outputColorSpace,J.batching=W.batching,J.batchingColor=W.batchingColor,J.instancing=W.instancing,J.instancingColor=W.instancingColor,J.instancingMorph=W.instancingMorph,J.skinning=W.skinning,J.morphTargets=W.morphTargets,J.morphNormals=W.morphNormals,J.morphColors=W.morphColors,J.morphTargetsCount=W.morphTargetsCount,J.numClippingPlanes=W.numClippingPlanes,J.numIntersection=W.numClipIntersection,J.vertexAlphas=W.vertexAlphas,J.vertexTangents=W.vertexTangents,J.toneMapping=W.toneMapping}function Hh(R,W,J,Q,X){W.isScene!==!0&&(W=be),I.resetTextureUnits();const ve=W.fog,Ie=Q.isMeshStandardMaterial?W.environment:null,Be=E===null?y.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:Ss,Fe=(Q.isMeshStandardMaterial?j:A).get(Q.envMap||Ie),Xe=Q.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,je=!!J.attributes.tangent&&(!!Q.normalMap||Q.anisotropy>0),Ge=!!J.morphAttributes.position,ot=!!J.morphAttributes.normal,gt=!!J.morphAttributes.color;let vt=vi;Q.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(vt=y.toneMapping);const Qt=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,rt=Qt!==void 0?Qt.length:0,Oe=we.get(Q),Gn=g.state.lights;if(ne===!0&&(fe===!0||R!==x)){const ln=R===x&&Q.id===M;me.setState(Q,R,ln)}let ct=!1;Q.version===Oe.__version?(Oe.needsLights&&Oe.lightsStateVersion!==Gn.state.version||Oe.outputColorSpace!==Be||X.isBatchedMesh&&Oe.batching===!1||!X.isBatchedMesh&&Oe.batching===!0||X.isBatchedMesh&&Oe.batchingColor===!0&&X.colorTexture===null||X.isBatchedMesh&&Oe.batchingColor===!1&&X.colorTexture!==null||X.isInstancedMesh&&Oe.instancing===!1||!X.isInstancedMesh&&Oe.instancing===!0||X.isSkinnedMesh&&Oe.skinning===!1||!X.isSkinnedMesh&&Oe.skinning===!0||X.isInstancedMesh&&Oe.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Oe.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Oe.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Oe.instancingMorph===!1&&X.morphTexture!==null||Oe.envMap!==Fe||Q.fog===!0&&Oe.fog!==ve||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==me.numPlanes||Oe.numIntersection!==me.numIntersection)||Oe.vertexAlphas!==Xe||Oe.vertexTangents!==je||Oe.morphTargets!==Ge||Oe.morphNormals!==ot||Oe.morphColors!==gt||Oe.toneMapping!==vt||Oe.morphTargetsCount!==rt)&&(ct=!0):(ct=!0,Oe.__version=Q.version);let gn=Oe.currentProgram;ct===!0&&(gn=lo(Q,W,X));let Bi=!1,tn=!1,Ts=!1;const yt=gn.getUniforms(),Cn=Oe.uniforms;if(ae.useProgram(gn.program)&&(Bi=!0,tn=!0,Ts=!0),Q.id!==M&&(M=Q.id,tn=!0),Bi||x!==R){ae.buffers.depth.getReversed()?(q.copy(R.projectionMatrix),$d(q),jd(q),yt.setValue(D,"projectionMatrix",q)):yt.setValue(D,"projectionMatrix",R.projectionMatrix),yt.setValue(D,"viewMatrix",R.matrixWorldInverse);const ii=yt.map.cameraPosition;ii!==void 0&&ii.setValue(D,K.setFromMatrixPosition(R.matrixWorld)),pe.logarithmicDepthBuffer&&yt.setValue(D,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(Q.isMeshPhongMaterial||Q.isMeshToonMaterial||Q.isMeshLambertMaterial||Q.isMeshBasicMaterial||Q.isMeshStandardMaterial||Q.isShaderMaterial)&&yt.setValue(D,"isOrthographic",R.isOrthographicCamera===!0),x!==R&&(x=R,tn=!0,Ts=!0)}if(X.isSkinnedMesh){yt.setOptional(D,X,"bindMatrix"),yt.setOptional(D,X,"bindMatrixInverse");const ln=X.skeleton;ln&&(ln.boneTexture===null&&ln.computeBoneTexture(),yt.setValue(D,"boneTexture",ln.boneTexture,I))}X.isBatchedMesh&&(yt.setOptional(D,X,"batchingTexture"),yt.setValue(D,"batchingTexture",X._matricesTexture,I),yt.setOptional(D,X,"batchingIdTexture"),yt.setValue(D,"batchingIdTexture",X._indirectTexture,I),yt.setOptional(D,X,"batchingColorTexture"),X._colorsTexture!==null&&yt.setValue(D,"batchingColorTexture",X._colorsTexture,I));const Es=J.morphAttributes;if((Es.position!==void 0||Es.normal!==void 0||Es.color!==void 0)&&He.update(X,J,gn),(tn||Oe.receiveShadow!==X.receiveShadow)&&(Oe.receiveShadow=X.receiveShadow,yt.setValue(D,"receiveShadow",X.receiveShadow)),Q.isMeshGouraudMaterial&&Q.envMap!==null&&(Cn.envMap.value=Fe,Cn.flipEnvMap.value=Fe.isCubeTexture&&Fe.isRenderTargetTexture===!1?-1:1),Q.isMeshStandardMaterial&&Q.envMap===null&&W.environment!==null&&(Cn.envMapIntensity.value=W.environmentIntensity),tn&&(yt.setValue(D,"toneMappingExposure",y.toneMappingExposure),Oe.needsLights&&Wh(Cn,Ts),ve&&Q.fog===!0&&Ae.refreshFogUniforms(Cn,ve),Ae.refreshMaterialUniforms(Cn,Q,O,G,g.state.transmissionRenderTarget[R.id]),$o.upload(D,uc(Oe),Cn,I)),Q.isShaderMaterial&&Q.uniformsNeedUpdate===!0&&($o.upload(D,uc(Oe),Cn,I),Q.uniformsNeedUpdate=!1),Q.isSpriteMaterial&&yt.setValue(D,"center",X.center),yt.setValue(D,"modelViewMatrix",X.modelViewMatrix),yt.setValue(D,"normalMatrix",X.normalMatrix),yt.setValue(D,"modelMatrix",X.matrixWorld),Q.isShaderMaterial||Q.isRawShaderMaterial){const ln=Q.uniformsGroups;for(let ii=0,si=ln.length;ii<si;ii++){const pc=ln[ii];H.update(pc,gn),H.bind(pc,gn)}}return gn}function Wh(R,W){R.ambientLightColor.needsUpdate=W,R.lightProbe.needsUpdate=W,R.directionalLights.needsUpdate=W,R.directionalLightShadows.needsUpdate=W,R.pointLights.needsUpdate=W,R.pointLightShadows.needsUpdate=W,R.spotLights.needsUpdate=W,R.spotLightShadows.needsUpdate=W,R.rectAreaLights.needsUpdate=W,R.hemisphereLights.needsUpdate=W}function Xh(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(R,W,J){we.get(R.texture).__webglTexture=W,we.get(R.depthTexture).__webglTexture=J;const Q=we.get(R);Q.__hasExternalTextures=!0,Q.__autoAllocateDepthBuffer=J===void 0,Q.__autoAllocateDepthBuffer||te.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(R,W){const J=we.get(R);J.__webglFramebuffer=W,J.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(R,W=0,J=0){E=R,w=W,T=J;let Q=!0,X=null,ve=!1,Ie=!1;if(R){const Fe=we.get(R);if(Fe.__useDefaultFramebuffer!==void 0)ae.bindFramebuffer(D.FRAMEBUFFER,null),Q=!1;else if(Fe.__webglFramebuffer===void 0)I.setupRenderTarget(R);else if(Fe.__hasExternalTextures)I.rebindTextures(R,we.get(R.texture).__webglTexture,we.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Ge=R.depthTexture;if(Fe.__boundDepthTexture!==Ge){if(Ge!==null&&we.has(Ge)&&(R.width!==Ge.image.width||R.height!==Ge.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(R)}}const Xe=R.texture;(Xe.isData3DTexture||Xe.isDataArrayTexture||Xe.isCompressedArrayTexture)&&(Ie=!0);const je=we.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(je[W])?X=je[W][J]:X=je[W],ve=!0):R.samples>0&&I.useMultisampledRTT(R)===!1?X=we.get(R).__webglMultisampledFramebuffer:Array.isArray(je)?X=je[J]:X=je,P.copy(R.viewport),k.copy(R.scissor),U=R.scissorTest}else P.copy($).multiplyScalar(O).floor(),k.copy(he).multiplyScalar(O).floor(),U=_e;if(ae.bindFramebuffer(D.FRAMEBUFFER,X)&&Q&&ae.drawBuffers(R,X),ae.viewport(P),ae.scissor(k),ae.setScissorTest(U),ve){const Fe=we.get(R.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+W,Fe.__webglTexture,J)}else if(Ie){const Fe=we.get(R.texture),Xe=W||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,Fe.__webglTexture,J||0,Xe)}M=-1},this.readRenderTargetPixels=function(R,W,J,Q,X,ve,Ie){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Be=we.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ie!==void 0&&(Be=Be[Ie]),Be){ae.bindFramebuffer(D.FRAMEBUFFER,Be);try{const Fe=R.texture,Xe=Fe.format,je=Fe.type;if(!pe.textureFormatReadable(Xe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!pe.textureTypeReadable(je)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=R.width-Q&&J>=0&&J<=R.height-X&&D.readPixels(W,J,Q,X,Je.convert(Xe),Je.convert(je),ve)}finally{const Fe=E!==null?we.get(E).__webglFramebuffer:null;ae.bindFramebuffer(D.FRAMEBUFFER,Fe)}}},this.readRenderTargetPixelsAsync=async function(R,W,J,Q,X,ve,Ie){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Be=we.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ie!==void 0&&(Be=Be[Ie]),Be){const Fe=R.texture,Xe=Fe.format,je=Fe.type;if(!pe.textureFormatReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!pe.textureTypeReadable(je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(W>=0&&W<=R.width-Q&&J>=0&&J<=R.height-X){ae.bindFramebuffer(D.FRAMEBUFFER,Be);const Ge=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Ge),D.bufferData(D.PIXEL_PACK_BUFFER,ve.byteLength,D.STREAM_READ),D.readPixels(W,J,Q,X,Je.convert(Xe),Je.convert(je),0);const ot=E!==null?we.get(E).__webglFramebuffer:null;ae.bindFramebuffer(D.FRAMEBUFFER,ot);const gt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Zd(D,gt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Ge),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,ve),D.deleteBuffer(Ge),D.deleteSync(gt),ve}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,W=null,J=0){R.isTexture!==!0&&(Vs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),W=arguments[0]||null,R=arguments[1]);const Q=Math.pow(2,-J),X=Math.floor(R.image.width*Q),ve=Math.floor(R.image.height*Q),Ie=W!==null?W.x:0,Be=W!==null?W.y:0;I.setTexture2D(R,0),D.copyTexSubImage2D(D.TEXTURE_2D,J,0,0,Ie,Be,X,ve),ae.unbindTexture()},this.copyTextureToTexture=function(R,W,J=null,Q=null,X=0){R.isTexture!==!0&&(Vs("WebGLRenderer: copyTextureToTexture function signature has changed."),Q=arguments[0]||null,R=arguments[1],W=arguments[2],X=arguments[3]||0,J=null);let ve,Ie,Be,Fe,Xe,je,Ge,ot,gt;const vt=R.isCompressedTexture?R.mipmaps[X]:R.image;J!==null?(ve=J.max.x-J.min.x,Ie=J.max.y-J.min.y,Be=J.isBox3?J.max.z-J.min.z:1,Fe=J.min.x,Xe=J.min.y,je=J.isBox3?J.min.z:0):(ve=vt.width,Ie=vt.height,Be=vt.depth||1,Fe=0,Xe=0,je=0),Q!==null?(Ge=Q.x,ot=Q.y,gt=Q.z):(Ge=0,ot=0,gt=0);const Qt=Je.convert(W.format),rt=Je.convert(W.type);let Oe;W.isData3DTexture?(I.setTexture3D(W,0),Oe=D.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(I.setTexture2DArray(W,0),Oe=D.TEXTURE_2D_ARRAY):(I.setTexture2D(W,0),Oe=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,W.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,W.unpackAlignment);const Gn=D.getParameter(D.UNPACK_ROW_LENGTH),ct=D.getParameter(D.UNPACK_IMAGE_HEIGHT),gn=D.getParameter(D.UNPACK_SKIP_PIXELS),Bi=D.getParameter(D.UNPACK_SKIP_ROWS),tn=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,vt.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,vt.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Fe),D.pixelStorei(D.UNPACK_SKIP_ROWS,Xe),D.pixelStorei(D.UNPACK_SKIP_IMAGES,je);const Ts=R.isDataArrayTexture||R.isData3DTexture,yt=W.isDataArrayTexture||W.isData3DTexture;if(R.isRenderTargetTexture||R.isDepthTexture){const Cn=we.get(R),Es=we.get(W),ln=we.get(Cn.__renderTarget),ii=we.get(Es.__renderTarget);ae.bindFramebuffer(D.READ_FRAMEBUFFER,ln.__webglFramebuffer),ae.bindFramebuffer(D.DRAW_FRAMEBUFFER,ii.__webglFramebuffer);for(let si=0;si<Be;si++)Ts&&D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,we.get(R).__webglTexture,X,je+si),R.isDepthTexture?(yt&&D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,we.get(W).__webglTexture,X,gt+si),D.blitFramebuffer(Fe,Xe,ve,Ie,Ge,ot,ve,Ie,D.DEPTH_BUFFER_BIT,D.NEAREST)):yt?D.copyTexSubImage3D(Oe,X,Ge,ot,gt+si,Fe,Xe,ve,Ie):D.copyTexSubImage2D(Oe,X,Ge,ot,gt+si,Fe,Xe,ve,Ie);ae.bindFramebuffer(D.READ_FRAMEBUFFER,null),ae.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else yt?R.isDataTexture||R.isData3DTexture?D.texSubImage3D(Oe,X,Ge,ot,gt,ve,Ie,Be,Qt,rt,vt.data):W.isCompressedArrayTexture?D.compressedTexSubImage3D(Oe,X,Ge,ot,gt,ve,Ie,Be,Qt,vt.data):D.texSubImage3D(Oe,X,Ge,ot,gt,ve,Ie,Be,Qt,rt,vt):R.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,X,Ge,ot,ve,Ie,Qt,rt,vt.data):R.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,X,Ge,ot,vt.width,vt.height,Qt,vt.data):D.texSubImage2D(D.TEXTURE_2D,X,Ge,ot,ve,Ie,Qt,rt,vt);D.pixelStorei(D.UNPACK_ROW_LENGTH,Gn),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ct),D.pixelStorei(D.UNPACK_SKIP_PIXELS,gn),D.pixelStorei(D.UNPACK_SKIP_ROWS,Bi),D.pixelStorei(D.UNPACK_SKIP_IMAGES,tn),X===0&&W.generateMipmaps&&D.generateMipmap(Oe),ae.unbindTexture()},this.copyTextureToTexture3D=function(R,W,J=null,Q=null,X=0){return R.isTexture!==!0&&(Vs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),J=arguments[0]||null,Q=arguments[1]||null,R=arguments[2],W=arguments[3],X=arguments[4]||0),Vs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,W,J,Q,X)},this.initRenderTarget=function(R){we.get(R).__webglFramebuffer===void 0&&I.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?I.setTextureCube(R,0):R.isData3DTexture?I.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?I.setTexture2DArray(R,0):I.setTexture2D(R,0),ae.unbindTexture()},this.resetState=function(){w=0,T=0,E=null,ae.reset(),mt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Jn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=st._getDrawingBufferColorSpace(e),t.unpackColorSpace=st._getUnpackColorSpace()}}class ec{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ye(e),this.density=t}clone(){return new ec(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class cg extends Ft{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Un,this.environmentIntensity=1,this.environmentRotation=new Un,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class lg{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Dr,this.updateRanges=[],this.version=0,this.uuid=zn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,o=this.stride;s<o;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=zn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=zn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Yt=new z;class Jo{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Yt.fromBufferAttribute(this,t),Yt.applyMatrix4(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Yt.fromBufferAttribute(this,t),Yt.applyNormalMatrix(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Yt.fromBufferAttribute(this,t),Yt.transformDirection(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=wn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ut(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=wn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=wn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=wn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=wn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,o){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array),o=ut(o,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=o,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)t.push(this.data.array[s+o])}return new An(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Jo(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)t.push(this.data.array[s+o])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Eh extends bs{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new Ye(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Qi;const Is=new z,es=new z,ts=new z,ns=new ge,Ls=new ge,Ah=new _t,Lo=new z,Ds=new z,Do=new z,fl=new ge,Ba=new ge,pl=new ge;class hg extends Ft{constructor(e=new Eh){if(super(),this.isSprite=!0,this.type="Sprite",Qi===void 0){Qi=new Ot;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new lg(t,5);Qi.setIndex([0,1,2,0,2,3]),Qi.setAttribute("position",new Jo(n,3,0,!1)),Qi.setAttribute("uv",new Jo(n,2,3,!1))}this.geometry=Qi,this.material=e,this.center=new ge(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),es.setFromMatrixScale(this.matrixWorld),Ah.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ts.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&es.multiplyScalar(-ts.z);const n=this.material.rotation;let s,o;n!==0&&(o=Math.cos(n),s=Math.sin(n));const r=this.center;ko(Lo.set(-.5,-.5,0),ts,r,es,s,o),ko(Ds.set(.5,-.5,0),ts,r,es,s,o),ko(Do.set(.5,.5,0),ts,r,es,s,o),fl.set(0,0),Ba.set(1,0),pl.set(1,1);let c=e.ray.intersectTriangle(Lo,Ds,Do,!1,Is);if(c===null&&(ko(Ds.set(-.5,.5,0),ts,r,es,s,o),Ba.set(0,1),c=e.ray.intersectTriangle(Lo,Do,Ds,!1,Is),c===null))return;const l=e.ray.origin.distanceTo(Is);l<e.near||l>e.far||t.push({distance:l,point:Is.clone(),uv:fn.getInterpolation(Is,Lo,Ds,Do,fl,Ba,pl,new ge),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function ko(i,e,t,n,s,o){ns.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Ls.x=o*ns.x-s*ns.y,Ls.y=s*ns.x+o*ns.y):Ls.copy(ns),i.copy(e),i.x+=Ls.x,i.y+=Ls.y,i.applyMatrix4(Ah)}class Mt extends qt{constructor(e,t,n,s,o,r,c,l,d){super(e,t,n,s,o,r,c,l,d),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Bn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),o=0;t.push(0);for(let r=1;r<=e;r++)n=this.getPoint(r/e),o+=n.distanceTo(s),t.push(o),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let s=0;const o=n.length;let r;t?r=t:r=e*n[o-1];let c=0,l=o-1,d;for(;c<=l;)if(s=Math.floor(c+(l-c)/2),d=n[s]-r,d<0)c=s+1;else if(d>0)l=s-1;else{l=s;break}if(s=l,n[s]===r)return s/(o-1);const h=n[s],f=n[s+1]-h,a=(r-h)/f;return(s+a)/(o-1)}getTangent(e,t){let s=e-1e-4,o=e+1e-4;s<0&&(s=0),o>1&&(o=1);const r=this.getPoint(s),c=this.getPoint(o),l=t||(r.isVector2?new ge:new z);return l.copy(c).sub(r).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new z,s=[],o=[],r=[],c=new z,l=new _t;for(let a=0;a<=e;a++){const p=a/e;s[a]=this.getTangentAt(p,new z)}o[0]=new z,r[0]=new z;let d=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=d&&(d=h,n.set(1,0,0)),u<=d&&(d=u,n.set(0,1,0)),f<=d&&n.set(0,0,1),c.crossVectors(s[0],n).normalize(),o[0].crossVectors(s[0],c),r[0].crossVectors(s[0],o[0]);for(let a=1;a<=e;a++){if(o[a]=o[a-1].clone(),r[a]=r[a-1].clone(),c.crossVectors(s[a-1],s[a]),c.length()>Number.EPSILON){c.normalize();const p=Math.acos(Bt(s[a-1].dot(s[a]),-1,1));o[a].applyMatrix4(l.makeRotationAxis(c,p))}r[a].crossVectors(s[a],o[a])}if(t===!0){let a=Math.acos(Bt(o[0].dot(o[e]),-1,1));a/=e,s[0].dot(c.crossVectors(o[0],o[e]))>0&&(a=-a);for(let p=1;p<=e;p++)o[p].applyMatrix4(l.makeRotationAxis(s[p],a*p)),r[p].crossVectors(s[p],o[p])}return{tangents:s,normals:o,binormals:r}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class tc extends Bn{constructor(e=0,t=0,n=1,s=1,o=0,r=Math.PI*2,c=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=o,this.aEndAngle=r,this.aClockwise=c,this.aRotation=l}getPoint(e,t=new ge){const n=t,s=Math.PI*2;let o=this.aEndAngle-this.aStartAngle;const r=Math.abs(o)<Number.EPSILON;for(;o<0;)o+=s;for(;o>s;)o-=s;o<Number.EPSILON&&(r?o=0:o=s),this.aClockwise===!0&&!r&&(o===s?o=-s:o=o-s);const c=this.aStartAngle+e*o;let l=this.aX+this.xRadius*Math.cos(c),d=this.aY+this.yRadius*Math.sin(c);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,a=d-this.aY;l=f*h-a*u+this.aX,d=f*u+a*h+this.aY}return n.set(l,d)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class dg extends tc{constructor(e,t,n,s,o,r){super(e,t,n,n,s,o,r),this.isArcCurve=!0,this.type="ArcCurve"}}function nc(){let i=0,e=0,t=0,n=0;function s(o,r,c,l){i=o,e=c,t=-3*o+3*r-2*c-l,n=2*o-2*r+c+l}return{initCatmullRom:function(o,r,c,l,d){s(r,c,d*(c-o),d*(l-r))},initNonuniformCatmullRom:function(o,r,c,l,d,h,u){let f=(r-o)/d-(c-o)/(d+h)+(c-r)/h,a=(c-r)/h-(l-r)/(h+u)+(l-c)/u;f*=h,a*=h,s(r,c,f,a)},calc:function(o){const r=o*o,c=r*o;return i+e*o+t*r+n*c}}}const zo=new z,Fa=new nc,Ga=new nc,Oa=new nc;class Ch extends Bn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new z){const n=t,s=this.points,o=s.length,r=(o-(this.closed?0:1))*e;let c=Math.floor(r),l=r-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/o)+1)*o:l===0&&c===o-1&&(c=o-2,l=1);let d,h;this.closed||c>0?d=s[(c-1)%o]:(zo.subVectors(s[0],s[1]).add(s[0]),d=zo);const u=s[c%o],f=s[(c+1)%o];if(this.closed||c+2<o?h=s[(c+2)%o]:(zo.subVectors(s[o-1],s[o-2]).add(s[o-1]),h=zo),this.curveType==="centripetal"||this.curveType==="chordal"){const a=this.curveType==="chordal"?.5:.25;let p=Math.pow(d.distanceToSquared(u),a),v=Math.pow(u.distanceToSquared(f),a),m=Math.pow(f.distanceToSquared(h),a);v<1e-4&&(v=1),p<1e-4&&(p=v),m<1e-4&&(m=v),Fa.initNonuniformCatmullRom(d.x,u.x,f.x,h.x,p,v,m),Ga.initNonuniformCatmullRom(d.y,u.y,f.y,h.y,p,v,m),Oa.initNonuniformCatmullRom(d.z,u.z,f.z,h.z,p,v,m)}else this.curveType==="catmullrom"&&(Fa.initCatmullRom(d.x,u.x,f.x,h.x,this.tension),Ga.initCatmullRom(d.y,u.y,f.y,h.y,this.tension),Oa.initCatmullRom(d.z,u.z,f.z,h.z,this.tension));return n.set(Fa.calc(l),Ga.calc(l),Oa.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new z().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function ml(i,e,t,n,s){const o=(n-e)*.5,r=(s-t)*.5,c=i*i,l=i*c;return(2*t-2*n+o+r)*l+(-3*t+3*n-2*o-r)*c+o*i+t}function ug(i,e){const t=1-i;return t*t*e}function fg(i,e){return 2*(1-i)*i*e}function pg(i,e){return i*i*e}function Zs(i,e,t,n){return ug(i,e)+fg(i,t)+pg(i,n)}function mg(i,e){const t=1-i;return t*t*t*e}function gg(i,e){const t=1-i;return 3*t*t*i*e}function vg(i,e){return 3*(1-i)*i*i*e}function yg(i,e){return i*i*i*e}function $s(i,e,t,n,s){return mg(i,e)+gg(i,t)+vg(i,n)+yg(i,s)}class Ph extends Bn{constructor(e=new ge,t=new ge,n=new ge,s=new ge){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new ge){const n=t,s=this.v0,o=this.v1,r=this.v2,c=this.v3;return n.set($s(e,s.x,o.x,r.x,c.x),$s(e,s.y,o.y,r.y,c.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class _g extends Bn{constructor(e=new z,t=new z,n=new z,s=new z){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new z){const n=t,s=this.v0,o=this.v1,r=this.v2,c=this.v3;return n.set($s(e,s.x,o.x,r.x,c.x),$s(e,s.y,o.y,r.y,c.y),$s(e,s.z,o.z,r.z,c.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Rh extends Bn{constructor(e=new ge,t=new ge){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ge){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ge){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Sg extends Bn{constructor(e=new z,t=new z){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new z){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new z){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ih extends Bn{constructor(e=new ge,t=new ge,n=new ge){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ge){const n=t,s=this.v0,o=this.v1,r=this.v2;return n.set(Zs(e,s.x,o.x,r.x),Zs(e,s.y,o.y,r.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class oa extends Bn{constructor(e=new z,t=new z,n=new z){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new z){const n=t,s=this.v0,o=this.v1,r=this.v2;return n.set(Zs(e,s.x,o.x,r.x),Zs(e,s.y,o.y,r.y),Zs(e,s.z,o.z,r.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Lh extends Bn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ge){const n=t,s=this.points,o=(s.length-1)*e,r=Math.floor(o),c=o-r,l=s[r===0?r:r-1],d=s[r],h=s[r>s.length-2?s.length-1:r+1],u=s[r>s.length-3?s.length-1:r+2];return n.set(ml(c,l.x,d.x,h.x,u.x),ml(c,l.y,d.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new ge().fromArray(s))}return this}}var Qo=Object.freeze({__proto__:null,ArcCurve:dg,CatmullRomCurve3:Ch,CubicBezierCurve:Ph,CubicBezierCurve3:_g,EllipseCurve:tc,LineCurve:Rh,LineCurve3:Sg,QuadraticBezierCurve:Ih,QuadraticBezierCurve3:oa,SplineCurve:Lh});class xg extends Bn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Qo[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let o=0;for(;o<s.length;){if(s[o]>=n){const r=s[o]-n,c=this.curves[o],l=c.getLength(),d=l===0?0:1-r/l;return c.getPointAt(d,t)}o++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,o=this.curves;s<o.length;s++){const r=o[s],c=r.isEllipseCurve?e*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?e*r.points.length:e,l=r.getPoints(c);for(let d=0;d<l.length;d++){const h=l[d];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new Qo[s.type]().fromJSON(s))}return this}}class zr extends xg{constructor(e){super(),this.type="Path",this.currentPoint=new ge,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Rh(this.currentPoint.clone(),new ge(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const o=new Ih(this.currentPoint.clone(),new ge(e,t),new ge(n,s));return this.curves.push(o),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,o,r){const c=new Ph(this.currentPoint.clone(),new ge(e,t),new ge(n,s),new ge(o,r));return this.curves.push(c),this.currentPoint.set(o,r),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Lh(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,o,r){const c=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+c,t+l,n,s,o,r),this}absarc(e,t,n,s,o,r){return this.absellipse(e,t,n,n,s,o,r),this}ellipse(e,t,n,s,o,r,c,l){const d=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+d,t+h,n,s,o,r,c,l),this}absellipse(e,t,n,s,o,r,c,l){const d=new tc(e,t,n,s,o,r,c,l);if(this.curves.length>0){const u=d.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(d);const h=d.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class ic extends Ot{constructor(e=[new ge(0,-.5),new ge(.5,0),new ge(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=Bt(s,0,Math.PI*2);const o=[],r=[],c=[],l=[],d=[],h=1/t,u=new z,f=new ge,a=new z,p=new z,v=new z;let m=0,g=0;for(let S=0;S<=e.length-1;S++)switch(S){case 0:m=e[S+1].x-e[S].x,g=e[S+1].y-e[S].y,a.x=g*1,a.y=-m,a.z=g*0,v.copy(a),a.normalize(),l.push(a.x,a.y,a.z);break;case e.length-1:l.push(v.x,v.y,v.z);break;default:m=e[S+1].x-e[S].x,g=e[S+1].y-e[S].y,a.x=g*1,a.y=-m,a.z=g*0,p.copy(a),a.x+=v.x,a.y+=v.y,a.z+=v.z,a.normalize(),l.push(a.x,a.y,a.z),v.copy(p)}for(let S=0;S<=t;S++){const _=n+S*h*s,y=Math.sin(_),b=Math.cos(_);for(let w=0;w<=e.length-1;w++){u.x=e[w].x*y,u.y=e[w].y,u.z=e[w].x*b,r.push(u.x,u.y,u.z),f.x=S/t,f.y=w/(e.length-1),c.push(f.x,f.y);const T=l[3*w+0]*y,E=l[3*w+1],M=l[3*w+0]*b;d.push(T,E,M)}}for(let S=0;S<t;S++)for(let _=0;_<e.length-1;_++){const y=_+S*e.length,b=y,w=y+e.length,T=y+e.length+1,E=y+1;o.push(b,w,E),o.push(T,E,w)}this.setIndex(o),this.setAttribute("position",new tt(r,3)),this.setAttribute("uv",new tt(c,2)),this.setAttribute("normal",new tt(d,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ic(e.points,e.segments,e.phiStart,e.phiLength)}}class Xt extends ic{constructor(e=1,t=1,n=4,s=8){const o=new zr;o.absarc(0,-t/2,e,Math.PI*1.5,0),o.absarc(0,t/2,e,0,Math.PI*.5),super(o.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:s}}static fromJSON(e){return new Xt(e.radius,e.length,e.capSegments,e.radialSegments)}}class cn extends Ot{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const o=[],r=[],c=[],l=[],d=new z,h=new ge;r.push(0,0,0),c.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=t;u++,f+=3){const a=n+u/t*s;d.x=e*Math.cos(a),d.y=e*Math.sin(a),r.push(d.x,d.y,d.z),c.push(0,0,1),h.x=(r[f]/e+1)/2,h.y=(r[f+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)o.push(u,u+1,0);this.setIndex(o),this.setAttribute("position",new tt(r,3)),this.setAttribute("normal",new tt(c,3)),this.setAttribute("uv",new tt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cn(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Te extends Ot{constructor(e=1,t=1,n=1,s=32,o=1,r=!1,c=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:o,openEnded:r,thetaStart:c,thetaLength:l};const d=this;s=Math.floor(s),o=Math.floor(o);const h=[],u=[],f=[],a=[];let p=0;const v=[],m=n/2;let g=0;S(),r===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new tt(u,3)),this.setAttribute("normal",new tt(f,3)),this.setAttribute("uv",new tt(a,2));function S(){const y=new z,b=new z;let w=0;const T=(t-e)/n;for(let E=0;E<=o;E++){const M=[],x=E/o,P=x*(t-e)+e;for(let k=0;k<=s;k++){const U=k/s,L=U*l+c,B=Math.sin(L),F=Math.cos(L);b.x=P*B,b.y=-x*n+m,b.z=P*F,u.push(b.x,b.y,b.z),y.set(B,T,F).normalize(),f.push(y.x,y.y,y.z),a.push(U,1-x),M.push(p++)}v.push(M)}for(let E=0;E<s;E++)for(let M=0;M<o;M++){const x=v[M][E],P=v[M+1][E],k=v[M+1][E+1],U=v[M][E+1];(e>0||M!==0)&&(h.push(x,P,U),w+=3),(t>0||M!==o-1)&&(h.push(P,k,U),w+=3)}d.addGroup(g,w,0),g+=w}function _(y){const b=p,w=new ge,T=new z;let E=0;const M=y===!0?e:t,x=y===!0?1:-1;for(let k=1;k<=s;k++)u.push(0,m*x,0),f.push(0,x,0),a.push(.5,.5),p++;const P=p;for(let k=0;k<=s;k++){const L=k/s*l+c,B=Math.cos(L),F=Math.sin(L);T.x=M*F,T.y=m*x,T.z=M*B,u.push(T.x,T.y,T.z),f.push(0,x,0),w.x=B*.5+.5,w.y=F*.5*x+.5,a.push(w.x,w.y),p++}for(let k=0;k<s;k++){const U=b+k,L=P+k;y===!0?h.push(L,L+1,U):h.push(L+1,L,U),E+=3}d.addGroup(g,E,y===!0?1:2),g+=E}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Te(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class St extends Te{constructor(e=1,t=1,n=32,s=1,o=!1,r=0,c=Math.PI*2){super(0,e,t,n,s,o,r,c),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:o,thetaStart:r,thetaLength:c}}static fromJSON(e){return new St(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class oo extends Ot{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const o=[],r=[];c(s),d(n),h(),this.setAttribute("position",new tt(o,3)),this.setAttribute("normal",new tt(o.slice(),3)),this.setAttribute("uv",new tt(r,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function c(S){const _=new z,y=new z,b=new z;for(let w=0;w<t.length;w+=3)a(t[w+0],_),a(t[w+1],y),a(t[w+2],b),l(_,y,b,S)}function l(S,_,y,b){const w=b+1,T=[];for(let E=0;E<=w;E++){T[E]=[];const M=S.clone().lerp(y,E/w),x=_.clone().lerp(y,E/w),P=w-E;for(let k=0;k<=P;k++)k===0&&E===w?T[E][k]=M:T[E][k]=M.clone().lerp(x,k/P)}for(let E=0;E<w;E++)for(let M=0;M<2*(w-E)-1;M++){const x=Math.floor(M/2);M%2===0?(f(T[E][x+1]),f(T[E+1][x]),f(T[E][x])):(f(T[E][x+1]),f(T[E+1][x+1]),f(T[E+1][x]))}}function d(S){const _=new z;for(let y=0;y<o.length;y+=3)_.x=o[y+0],_.y=o[y+1],_.z=o[y+2],_.normalize().multiplyScalar(S),o[y+0]=_.x,o[y+1]=_.y,o[y+2]=_.z}function h(){const S=new z;for(let _=0;_<o.length;_+=3){S.x=o[_+0],S.y=o[_+1],S.z=o[_+2];const y=m(S)/2/Math.PI+.5,b=g(S)/Math.PI+.5;r.push(y,1-b)}p(),u()}function u(){for(let S=0;S<r.length;S+=6){const _=r[S+0],y=r[S+2],b=r[S+4],w=Math.max(_,y,b),T=Math.min(_,y,b);w>.9&&T<.1&&(_<.2&&(r[S+0]+=1),y<.2&&(r[S+2]+=1),b<.2&&(r[S+4]+=1))}}function f(S){o.push(S.x,S.y,S.z)}function a(S,_){const y=S*3;_.x=e[y+0],_.y=e[y+1],_.z=e[y+2]}function p(){const S=new z,_=new z,y=new z,b=new z,w=new ge,T=new ge,E=new ge;for(let M=0,x=0;M<o.length;M+=9,x+=6){S.set(o[M+0],o[M+1],o[M+2]),_.set(o[M+3],o[M+4],o[M+5]),y.set(o[M+6],o[M+7],o[M+8]),w.set(r[x+0],r[x+1]),T.set(r[x+2],r[x+3]),E.set(r[x+4],r[x+5]),b.copy(S).add(_).add(y).divideScalar(3);const P=m(b);v(w,x+0,S,P),v(T,x+2,_,P),v(E,x+4,y,P)}}function v(S,_,y,b){b<0&&S.x===1&&(r[_]=S.x-1),y.x===0&&y.z===0&&(r[_]=b/2/Math.PI+.5)}function m(S){return Math.atan2(S.z,-S.x)}function g(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oo(e.vertices,e.indices,e.radius,e.details)}}class pn extends oo{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=1/n,o=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],r=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(o,r,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new pn(e.radius,e.detail)}}class ki extends zr{constructor(e){super(e),this.uuid=zn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new zr().fromJSON(s))}return this}}const Mg={triangulate:function(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let o=Dh(i,0,s,t,!0);const r=[];if(!o||o.next===o.prev)return r;let c,l,d,h,u,f,a;if(n&&(o=Ag(i,e,o,t)),i.length>80*t){c=d=i[0],l=h=i[1];for(let p=t;p<s;p+=t)u=i[p],f=i[p+1],u<c&&(c=u),f<l&&(l=f),u>d&&(d=u),f>h&&(h=f);a=Math.max(d-c,h-l),a=a!==0?32767/a:0}return Qs(o,r,t,c,l,a,0),r}};function Dh(i,e,t,n,s){let o,r;if(s===Bg(i,e,t,n)>0)for(o=e;o<t;o+=n)r=gl(o,i[o],i[o+1],r);else for(o=t-n;o>=e;o-=n)r=gl(o,i[o],i[o+1],r);return r&&aa(r,r.next)&&(to(r),r=r.next),r}function Ni(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(aa(t,t.next)||xt(t.prev,t,t.next)===0)){if(to(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Qs(i,e,t,n,s,o,r){if(!i)return;!r&&o&&Lg(i,n,s,o);let c=i,l,d;for(;i.prev!==i.next;){if(l=i.prev,d=i.next,o?wg(i,n,s,o):bg(i)){e.push(l.i/t|0),e.push(i.i/t|0),e.push(d.i/t|0),to(i),i=d.next,c=d.next;continue}if(i=d,i===c){r?r===1?(i=Tg(Ni(i),e,t),Qs(i,e,t,n,s,o,2)):r===2&&Eg(i,e,t,n,s,o):Qs(Ni(i),e,t,n,s,o,1);break}}}function bg(i){const e=i.prev,t=i,n=i.next;if(xt(e,t,n)>=0)return!1;const s=e.x,o=t.x,r=n.x,c=e.y,l=t.y,d=n.y,h=s<o?s<r?s:r:o<r?o:r,u=c<l?c<d?c:d:l<d?l:d,f=s>o?s>r?s:r:o>r?o:r,a=c>l?c>d?c:d:l>d?l:d;let p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=f&&p.y>=u&&p.y<=a&&ls(s,c,o,l,r,d,p.x,p.y)&&xt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function wg(i,e,t,n){const s=i.prev,o=i,r=i.next;if(xt(s,o,r)>=0)return!1;const c=s.x,l=o.x,d=r.x,h=s.y,u=o.y,f=r.y,a=c<l?c<d?c:d:l<d?l:d,p=h<u?h<f?h:f:u<f?u:f,v=c>l?c>d?c:d:l>d?l:d,m=h>u?h>f?h:f:u>f?u:f,g=Ur(a,p,e,t,n),S=Ur(v,m,e,t,n);let _=i.prevZ,y=i.nextZ;for(;_&&_.z>=g&&y&&y.z<=S;){if(_.x>=a&&_.x<=v&&_.y>=p&&_.y<=m&&_!==s&&_!==r&&ls(c,h,l,u,d,f,_.x,_.y)&&xt(_.prev,_,_.next)>=0||(_=_.prevZ,y.x>=a&&y.x<=v&&y.y>=p&&y.y<=m&&y!==s&&y!==r&&ls(c,h,l,u,d,f,y.x,y.y)&&xt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;_&&_.z>=g;){if(_.x>=a&&_.x<=v&&_.y>=p&&_.y<=m&&_!==s&&_!==r&&ls(c,h,l,u,d,f,_.x,_.y)&&xt(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;y&&y.z<=S;){if(y.x>=a&&y.x<=v&&y.y>=p&&y.y<=m&&y!==s&&y!==r&&ls(c,h,l,u,d,f,y.x,y.y)&&xt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Tg(i,e,t){let n=i;do{const s=n.prev,o=n.next.next;!aa(s,o)&&kh(s,n,n.next,o)&&eo(s,o)&&eo(o,s)&&(e.push(s.i/t|0),e.push(n.i/t|0),e.push(o.i/t|0),to(n),to(n.next),n=i=o),n=n.next}while(n!==i);return Ni(n)}function Eg(i,e,t,n,s,o){let r=i;do{let c=r.next.next;for(;c!==r.prev;){if(r.i!==c.i&&zg(r,c)){let l=zh(r,c);r=Ni(r,r.next),l=Ni(l,l.next),Qs(r,e,t,n,s,o,0),Qs(l,e,t,n,s,o,0);return}c=c.next}r=r.next}while(r!==i)}function Ag(i,e,t,n){const s=[];let o,r,c,l,d;for(o=0,r=e.length;o<r;o++)c=e[o]*n,l=o<r-1?e[o+1]*n:i.length,d=Dh(i,c,l,n,!1),d===d.next&&(d.steiner=!0),s.push(kg(d));for(s.sort(Cg),o=0;o<s.length;o++)t=Pg(s[o],t);return t}function Cg(i,e){return i.x-e.x}function Pg(i,e){const t=Rg(i,e);if(!t)return e;const n=zh(t,i);return Ni(n,n.next),Ni(t,t.next)}function Rg(i,e){let t=e,n=-1/0,s;const o=i.x,r=i.y;do{if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const f=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=o&&f>n&&(n=f,s=t.x<t.next.x?t:t.next,f===o))return s}t=t.next}while(t!==e);if(!s)return null;const c=s,l=s.x,d=s.y;let h=1/0,u;t=s;do o>=t.x&&t.x>=l&&o!==t.x&&ls(r<d?o:n,r,l,d,r<d?n:o,r,t.x,t.y)&&(u=Math.abs(r-t.y)/(o-t.x),eo(t,i)&&(u<h||u===h&&(t.x>s.x||t.x===s.x&&Ig(s,t)))&&(s=t,h=u)),t=t.next;while(t!==c);return s}function Ig(i,e){return xt(i.prev,i,e.prev)<0&&xt(e.next,i,i.next)<0}function Lg(i,e,t,n){let s=i;do s.z===0&&(s.z=Ur(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Dg(s)}function Dg(i){let e,t,n,s,o,r,c,l,d=1;do{for(t=i,i=null,o=null,r=0;t;){for(r++,n=t,c=0,e=0;e<d&&(c++,n=n.nextZ,!!n);e++);for(l=d;c>0||l>0&&n;)c!==0&&(l===0||!n||t.z<=n.z)?(s=t,t=t.nextZ,c--):(s=n,n=n.nextZ,l--),o?o.nextZ=s:i=s,s.prevZ=o,o=s;t=n}o.nextZ=null,d*=2}while(r>1);return i}function Ur(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function kg(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function ls(i,e,t,n,s,o,r,c){return(s-r)*(e-c)>=(i-r)*(o-c)&&(i-r)*(n-c)>=(t-r)*(e-c)&&(t-r)*(o-c)>=(s-r)*(n-c)}function zg(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Ug(i,e)&&(eo(i,e)&&eo(e,i)&&Ng(i,e)&&(xt(i.prev,i,e.prev)||xt(i,e.prev,e))||aa(i,e)&&xt(i.prev,i,i.next)>0&&xt(e.prev,e,e.next)>0)}function xt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function aa(i,e){return i.x===e.x&&i.y===e.y}function kh(i,e,t,n){const s=No(xt(i,e,t)),o=No(xt(i,e,n)),r=No(xt(t,n,i)),c=No(xt(t,n,e));return!!(s!==o&&r!==c||s===0&&Uo(i,t,e)||o===0&&Uo(i,n,e)||r===0&&Uo(t,i,n)||c===0&&Uo(t,e,n))}function Uo(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function No(i){return i>0?1:i<0?-1:0}function Ug(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&kh(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function eo(i,e){return xt(i.prev,i,i.next)<0?xt(i,e,i.next)>=0&&xt(i,i.prev,e)>=0:xt(i,e,i.prev)<0||xt(i,i.next,e)<0}function Ng(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,o=(i.y+e.y)/2;do t.y>o!=t.next.y>o&&t.next.y!==t.y&&s<(t.next.x-t.x)*(o-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function zh(i,e){const t=new Nr(i.i,i.x,i.y),n=new Nr(e.i,e.x,e.y),s=i.next,o=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,o.next=n,n.prev=o,n}function gl(i,e,t,n){const s=new Nr(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function to(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Nr(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Bg(i,e,t,n){let s=0;for(let o=e,r=t-n;o<t;o+=n)s+=(i[r]-i[o])*(i[o+1]+i[r+1]),r=o;return s}class yi{static area(e){const t=e.length;let n=0;for(let s=t-1,o=0;o<t;s=o++)n+=e[s].x*e[o].y-e[o].x*e[s].y;return n*.5}static isClockWise(e){return yi.area(e)<0}static triangulateShape(e,t){const n=[],s=[],o=[];vl(e),yl(n,e);let r=e.length;t.forEach(vl);for(let l=0;l<t.length;l++)s.push(r),r+=t[l].length,yl(n,t[l]);const c=Mg.triangulate(n,s);for(let l=0;l<c.length;l+=3)o.push(c.slice(l,l+3));return o}}function vl(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function yl(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class sc extends Ot{constructor(e=new ki([new ge(.5,.5),new ge(-.5,.5),new ge(-.5,-.5),new ge(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],o=[];for(let c=0,l=e.length;c<l;c++){const d=e[c];r(d)}this.setAttribute("position",new tt(s,3)),this.setAttribute("uv",new tt(o,2)),this.computeVertexNormals();function r(c){const l=[],d=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,a=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:a-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const g=t.extrudePath,S=t.UVGenerator!==void 0?t.UVGenerator:Fg;let _,y=!1,b,w,T,E;g&&(_=g.getSpacedPoints(h),y=!0,f=!1,b=g.computeFrenetFrames(h,!1),w=new z,T=new z,E=new z),f||(m=0,a=0,p=0,v=0);const M=c.extractPoints(d);let x=M.shape;const P=M.holes;if(!yi.isClockWise(x)){x=x.reverse();for(let Y=0,ie=P.length;Y<ie;Y++){const D=P[Y];yi.isClockWise(D)&&(P[Y]=D.reverse())}}const U=yi.triangulateShape(x,P),L=x;for(let Y=0,ie=P.length;Y<ie;Y++){const D=P[Y];x=x.concat(D)}function B(Y,ie,D){return ie||console.error("THREE.ExtrudeGeometry: vec does not exist"),Y.clone().addScaledVector(ie,D)}const F=x.length,G=U.length;function O(Y,ie,D){let re,te,pe;const ae=Y.x-ie.x,xe=Y.y-ie.y,we=D.x-Y.x,I=D.y-Y.y,A=ae*ae+xe*xe,j=ae*I-xe*we;if(Math.abs(j)>Number.EPSILON){const ce=Math.sqrt(A),ue=Math.sqrt(we*we+I*I),le=ie.x-xe/ce,Ne=ie.y+ae/ce,Ae=D.x-I/ue,Me=D.y+we/ue,We=((Ae-le)*I-(Me-Ne)*we)/(ae*I-xe*we);re=le+ae*We-Y.x,te=Ne+xe*We-Y.y;const me=re*re+te*te;if(me<=2)return new ge(re,te);pe=Math.sqrt(me/2)}else{let ce=!1;ae>Number.EPSILON?we>Number.EPSILON&&(ce=!0):ae<-Number.EPSILON?we<-Number.EPSILON&&(ce=!0):Math.sign(xe)===Math.sign(I)&&(ce=!0),ce?(re=-xe,te=ae,pe=Math.sqrt(A)):(re=ae,te=xe,pe=Math.sqrt(A/2))}return new ge(re/pe,te/pe)}const N=[];for(let Y=0,ie=L.length,D=ie-1,re=Y+1;Y<ie;Y++,D++,re++)D===ie&&(D=0),re===ie&&(re=0),N[Y]=O(L[Y],L[D],L[re]);const V=[];let $,he=N.concat();for(let Y=0,ie=P.length;Y<ie;Y++){const D=P[Y];$=[];for(let re=0,te=D.length,pe=te-1,ae=re+1;re<te;re++,pe++,ae++)pe===te&&(pe=0),ae===te&&(ae=0),$[re]=O(D[re],D[pe],D[ae]);V.push($),he=he.concat($)}for(let Y=0;Y<m;Y++){const ie=Y/m,D=a*Math.cos(ie*Math.PI/2),re=p*Math.sin(ie*Math.PI/2)+v;for(let te=0,pe=L.length;te<pe;te++){const ae=B(L[te],N[te],re);q(ae.x,ae.y,-D)}for(let te=0,pe=P.length;te<pe;te++){const ae=P[te];$=V[te];for(let xe=0,we=ae.length;xe<we;xe++){const I=B(ae[xe],$[xe],re);q(I.x,I.y,-D)}}}const _e=p+v;for(let Y=0;Y<F;Y++){const ie=f?B(x[Y],he[Y],_e):x[Y];y?(T.copy(b.normals[0]).multiplyScalar(ie.x),w.copy(b.binormals[0]).multiplyScalar(ie.y),E.copy(_[0]).add(T).add(w),q(E.x,E.y,E.z)):q(ie.x,ie.y,0)}for(let Y=1;Y<=h;Y++)for(let ie=0;ie<F;ie++){const D=f?B(x[ie],he[ie],_e):x[ie];y?(T.copy(b.normals[Y]).multiplyScalar(D.x),w.copy(b.binormals[Y]).multiplyScalar(D.y),E.copy(_[Y]).add(T).add(w),q(E.x,E.y,E.z)):q(D.x,D.y,u/h*Y)}for(let Y=m-1;Y>=0;Y--){const ie=Y/m,D=a*Math.cos(ie*Math.PI/2),re=p*Math.sin(ie*Math.PI/2)+v;for(let te=0,pe=L.length;te<pe;te++){const ae=B(L[te],N[te],re);q(ae.x,ae.y,u+D)}for(let te=0,pe=P.length;te<pe;te++){const ae=P[te];$=V[te];for(let xe=0,we=ae.length;xe<we;xe++){const I=B(ae[xe],$[xe],re);y?q(I.x,I.y+_[h-1].y,_[h-1].x+D):q(I.x,I.y,u+D)}}}Z(),ne();function Z(){const Y=s.length/3;if(f){let ie=0,D=F*ie;for(let re=0;re<G;re++){const te=U[re];ee(te[2]+D,te[1]+D,te[0]+D)}ie=h+m*2,D=F*ie;for(let re=0;re<G;re++){const te=U[re];ee(te[0]+D,te[1]+D,te[2]+D)}}else{for(let ie=0;ie<G;ie++){const D=U[ie];ee(D[2],D[1],D[0])}for(let ie=0;ie<G;ie++){const D=U[ie];ee(D[0]+F*h,D[1]+F*h,D[2]+F*h)}}n.addGroup(Y,s.length/3-Y,0)}function ne(){const Y=s.length/3;let ie=0;fe(L,ie),ie+=L.length;for(let D=0,re=P.length;D<re;D++){const te=P[D];fe(te,ie),ie+=te.length}n.addGroup(Y,s.length/3-Y,1)}function fe(Y,ie){let D=Y.length;for(;--D>=0;){const re=D;let te=D-1;te<0&&(te=Y.length-1);for(let pe=0,ae=h+m*2;pe<ae;pe++){const xe=F*pe,we=F*(pe+1),I=ie+re+xe,A=ie+te+xe,j=ie+te+we,ce=ie+re+we;K(I,A,j,ce)}}}function q(Y,ie,D){l.push(Y),l.push(ie),l.push(D)}function ee(Y,ie,D){oe(Y),oe(ie),oe(D);const re=s.length/3,te=S.generateTopUV(n,s,re-3,re-2,re-1);be(te[0]),be(te[1]),be(te[2])}function K(Y,ie,D,re){oe(Y),oe(ie),oe(re),oe(ie),oe(D),oe(re);const te=s.length/3,pe=S.generateSideWallUV(n,s,te-6,te-3,te-2,te-1);be(pe[0]),be(pe[1]),be(pe[3]),be(pe[1]),be(pe[2]),be(pe[3])}function oe(Y){s.push(l[Y*3+0]),s.push(l[Y*3+1]),s.push(l[Y*3+2])}function be(Y){o.push(Y.x),o.push(Y.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Gg(t,n,e)}static fromJSON(e,t){const n=[];for(let o=0,r=e.shapes.length;o<r;o++){const c=t[e.shapes[o]];n.push(c)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Qo[s.type]().fromJSON(s)),new sc(n,e.options)}}const Fg={generateTopUV:function(i,e,t,n,s){const o=e[t*3],r=e[t*3+1],c=e[n*3],l=e[n*3+1],d=e[s*3],h=e[s*3+1];return[new ge(o,r),new ge(c,l),new ge(d,h)]},generateSideWallUV:function(i,e,t,n,s,o){const r=e[t*3],c=e[t*3+1],l=e[t*3+2],d=e[n*3],h=e[n*3+1],u=e[n*3+2],f=e[s*3],a=e[s*3+1],p=e[s*3+2],v=e[o*3],m=e[o*3+1],g=e[o*3+2];return Math.abs(c-h)<Math.abs(r-d)?[new ge(r,1-l),new ge(d,1-u),new ge(f,1-p),new ge(v,1-g)]:[new ge(c,1-l),new ge(h,1-u),new ge(a,1-p),new ge(m,1-g)]}};function Gg(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const o=i[n];t.shapes.push(o.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Si extends oo{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],o=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,o,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Si(e.radius,e.detail)}}class ao extends oo{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ao(e.radius,e.detail)}}class oc extends Ot{constructor(e=.5,t=1,n=32,s=1,o=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:o,thetaLength:r},n=Math.max(3,n),s=Math.max(1,s);const c=[],l=[],d=[],h=[];let u=e;const f=(t-e)/s,a=new z,p=new ge;for(let v=0;v<=s;v++){for(let m=0;m<=n;m++){const g=o+m/n*r;a.x=u*Math.cos(g),a.y=u*Math.sin(g),l.push(a.x,a.y,a.z),d.push(0,0,1),p.x=(a.x/t+1)/2,p.y=(a.y/t+1)/2,h.push(p.x,p.y)}u+=f}for(let v=0;v<s;v++){const m=v*(n+1);for(let g=0;g<n;g++){const S=g+m,_=S,y=S+n+1,b=S+n+2,w=S+1;c.push(_,y,w),c.push(y,b,w)}}this.setIndex(c),this.setAttribute("position",new tt(l,3)),this.setAttribute("normal",new tt(d,3)),this.setAttribute("uv",new tt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oc(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class fs extends Ot{constructor(e=new ki([new ge(0,.5),new ge(-.5,-.5),new ge(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],s=[],o=[],r=[];let c=0,l=0;if(Array.isArray(e)===!1)d(e);else for(let h=0;h<e.length;h++)d(e[h]),this.addGroup(c,l,h),c+=l,l=0;this.setIndex(n),this.setAttribute("position",new tt(s,3)),this.setAttribute("normal",new tt(o,3)),this.setAttribute("uv",new tt(r,2));function d(h){const u=s.length/3,f=h.extractPoints(t);let a=f.shape;const p=f.holes;yi.isClockWise(a)===!1&&(a=a.reverse());for(let m=0,g=p.length;m<g;m++){const S=p[m];yi.isClockWise(S)===!0&&(p[m]=S.reverse())}const v=yi.triangulateShape(a,p);for(let m=0,g=p.length;m<g;m++){const S=p[m];a=a.concat(S)}for(let m=0,g=a.length;m<g;m++){const S=a[m];s.push(S.x,S.y,0),o.push(0,0,1),r.push(S.x,S.y)}for(let m=0,g=v.length;m<g;m++){const S=v[m],_=S[0]+u,y=S[1]+u,b=S[2]+u;n.push(_,y,b),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return Og(t,e)}static fromJSON(e,t){const n=[];for(let s=0,o=e.shapes.length;s<o;s++){const r=t[e.shapes[s]];n.push(r)}return new fs(n,e.curveSegments)}}function Og(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){const s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}class Ee extends Ot{constructor(e=1,t=32,n=16,s=0,o=Math.PI*2,r=0,c=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:o,thetaStart:r,thetaLength:c},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(r+c,Math.PI);let d=0;const h=[],u=new z,f=new z,a=[],p=[],v=[],m=[];for(let g=0;g<=n;g++){const S=[],_=g/n;let y=0;g===0&&r===0?y=.5/t:g===n&&l===Math.PI&&(y=-.5/t);for(let b=0;b<=t;b++){const w=b/t;u.x=-e*Math.cos(s+w*o)*Math.sin(r+_*c),u.y=e*Math.cos(r+_*c),u.z=e*Math.sin(s+w*o)*Math.sin(r+_*c),p.push(u.x,u.y,u.z),f.copy(u).normalize(),v.push(f.x,f.y,f.z),m.push(w+y,1-_),S.push(d++)}h.push(S)}for(let g=0;g<n;g++)for(let S=0;S<t;S++){const _=h[g][S+1],y=h[g][S],b=h[g+1][S],w=h[g+1][S+1];(g!==0||r>0)&&a.push(_,y,w),(g!==n-1||l<Math.PI)&&a.push(y,b,w)}this.setIndex(a),this.setAttribute("position",new tt(p,3)),this.setAttribute("normal",new tt(v,3)),this.setAttribute("uv",new tt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ee(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class at extends Ot{constructor(e=1,t=.4,n=12,s=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:o},n=Math.floor(n),s=Math.floor(s);const r=[],c=[],l=[],d=[],h=new z,u=new z,f=new z;for(let a=0;a<=n;a++)for(let p=0;p<=s;p++){const v=p/s*o,m=a/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(v),u.y=(e+t*Math.cos(m))*Math.sin(v),u.z=t*Math.sin(m),c.push(u.x,u.y,u.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),f.subVectors(u,h).normalize(),l.push(f.x,f.y,f.z),d.push(p/s),d.push(a/n)}for(let a=1;a<=n;a++)for(let p=1;p<=s;p++){const v=(s+1)*a+p-1,m=(s+1)*(a-1)+p-1,g=(s+1)*(a-1)+p,S=(s+1)*a+p;r.push(v,m,S),r.push(m,g,S)}this.setIndex(r),this.setAttribute("position",new tt(c,3)),this.setAttribute("normal",new tt(l,3)),this.setAttribute("uv",new tt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new at(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class ro extends Ot{constructor(e=new oa(new z(-1,-1,0),new z(-1,1,0),new z(1,1,0)),t=64,n=1,s=8,o=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:o};const r=e.computeFrenetFrames(t,o);this.tangents=r.tangents,this.normals=r.normals,this.binormals=r.binormals;const c=new z,l=new z,d=new ge;let h=new z;const u=[],f=[],a=[],p=[];v(),this.setIndex(p),this.setAttribute("position",new tt(u,3)),this.setAttribute("normal",new tt(f,3)),this.setAttribute("uv",new tt(a,2));function v(){for(let _=0;_<t;_++)m(_);m(o===!1?t:0),S(),g()}function m(_){h=e.getPointAt(_/t,h);const y=r.normals[_],b=r.binormals[_];for(let w=0;w<=s;w++){const T=w/s*Math.PI*2,E=Math.sin(T),M=-Math.cos(T);l.x=M*y.x+E*b.x,l.y=M*y.y+E*b.y,l.z=M*y.z+E*b.z,l.normalize(),f.push(l.x,l.y,l.z),c.x=h.x+n*l.x,c.y=h.y+n*l.y,c.z=h.z+n*l.z,u.push(c.x,c.y,c.z)}}function g(){for(let _=1;_<=t;_++)for(let y=1;y<=s;y++){const b=(s+1)*(_-1)+(y-1),w=(s+1)*_+(y-1),T=(s+1)*_+y,E=(s+1)*(_-1)+y;p.push(b,w,E),p.push(w,T,E)}}function S(){for(let _=0;_<=t;_++)for(let y=0;y<=s;y++)d.x=_/t,d.y=y/s,a.push(d.x,d.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new ro(new Qo[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class lt extends bs{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Ye(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=rh,this.normalScale=new ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}const _l={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Vg{constructor(e,t,n){const s=this;let o=!1,r=0,c=0,l;const d=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){c++,o===!1&&s.onStart!==void 0&&s.onStart(h,r,c),o=!0},this.itemEnd=function(h){r++,s.onProgress!==void 0&&s.onProgress(h,r,c),r===c&&(o=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return d.push(h,u),this},this.removeHandler=function(h){const u=d.indexOf(h);return u!==-1&&d.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=d.length;u<f;u+=2){const a=d[u],p=d[u+1];if(a.global&&(a.lastIndex=0),a.test(h))return p}return null}}}const Hg=new Vg;class ac{constructor(e){this.manager=e!==void 0?e:Hg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,o){n.load(e,s,t,o)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}ac.DEFAULT_MATERIAL_NAME="__DEFAULT";class Wg extends ac{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const o=this,r=_l.get(e);if(r!==void 0)return o.manager.itemStart(e),setTimeout(function(){t&&t(r),o.manager.itemEnd(e)},0),r;const c=Js("img");function l(){h(),_l.add(e,this),t&&t(this),o.manager.itemEnd(e)}function d(u){h(),s&&s(u),o.manager.itemError(e),o.manager.itemEnd(e)}function h(){c.removeEventListener("load",l,!1),c.removeEventListener("error",d,!1)}return c.addEventListener("load",l,!1),c.addEventListener("error",d,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(c.crossOrigin=this.crossOrigin),o.manager.itemStart(e),c.src=e,c}}class Xg extends ac{constructor(e){super(e)}load(e,t,n,s){const o=new qt,r=new Wg(this.manager);return r.setCrossOrigin(this.crossOrigin),r.setPath(this.path),r.load(e,function(c){o.image=c,o.needsUpdate=!0,t!==void 0&&t(o)},n,s),o}}class Uh extends Ft{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ye(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class qg extends Uh{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ft.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ye(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Va=new _t,Sl=new z,xl=new z;class Yg{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ge(512,512),this.map=null,this.mapPass=null,this.matrix=new _t,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Jr,this._frameExtents=new ge(1,1),this._viewportCount=1,this._viewports=[new Ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Sl.setFromMatrixPosition(e.matrixWorld),t.position.copy(Sl),xl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(xl),t.updateMatrixWorld(),Va.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Va),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Va)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Zg extends Yg{constructor(){super(new Sh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ml extends Uh{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ft.DEFAULT_UP),this.updateMatrix(),this.target=new Ft,this.shadow=new Zg}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Hr}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Hr);const Zn={wedding:{id:"wedding",title:"ガーデンウェディング",subtitle:"花咲くチャペル前の大集合！",description:"新郎新婦を囲む13人の祝福ショット！目立ちたがりやシャイな親族、背伸びキッズに気をつけて、全員の笑顔をカメラに収めよう。",roundDuration:42,maxShots:5,stageBounds:{minX:-4.4,maxX:4.4,minZ:-2.4,maxZ:2.3},platforms:[{id:"riser_back",minX:-3.5,maxX:3.5,minZ:-1.75,maxZ:-.65,height:.42}],defaultCamera:{azimuth:.06,elevation:.14,distance:8.6,fov:40,target:{x:0,y:1.18,z:-.25}},cameraLimits:{minAzimuth:-.72,maxAzimuth:.72,minElevation:.04,maxElevation:.56,minFov:24,maxFov:56,minTargetX:-2,maxTargetX:2,minTargetY:.75,maxTargetY:1.95},roster:[{id:"bride",name:"ハナ（新婦）",roleLabel:"主役・新婦",archetype:"vip",isVip:!0,homePos:{x:-.54,z:.24},appearance:{skinColor:"#ffe0c8",hairColor:"#4b3123",hairStyle:"bun",outfitTopColor:"#fffdf9",outfitBottomColor:"#fff6ee",accentColor:"#f7a8b8",outfitStyle:"wedding_dress",accessory:"veil",heightScale:.99,widthScale:1,rosyCheeks:!0}},{id:"groom",name:"ソラ（新郎）",roleLabel:"主役・新郎",archetype:"vip",isVip:!0,homePos:{x:.54,z:.24},appearance:{skinColor:"#f8d2b4",hairColor:"#2a221d",hairStyle:"short",outfitTopColor:"#263245",outfitBottomColor:"#1e2736",accentColor:"#ff7b89",outfitStyle:"tuxedo",accessory:"bow_tie",heightScale:1.07,widthScale:1.02,rosyCheeks:!1}},{id:"uncle_showoff",name:"タケシ叔父さん",roleLabel:"目立ちたがり",archetype:"showoff",isVip:!1,homePos:{x:-1.72,z:.36},appearance:{skinColor:"#f2c19c",hairColor:"#3a3330",hairStyle:"spiky",outfitTopColor:"#d93d4a",outfitBottomColor:"#2b2d3c",accentColor:"#ffd166",outfitStyle:"suit",accessory:"sunglasses",heightScale:1.08,widthScale:1.1}},{id:"friend_showoff",name:"リョウ（同僚）",roleLabel:"目立ちたがり",archetype:"showoff",isVip:!1,homePos:{x:1.78,z:.38},appearance:{skinColor:"#f5caa7",hairColor:"#6f4222",hairStyle:"spiky",outfitTopColor:"#ff7a3d",outfitBottomColor:"#2b3447",accentColor:"#fff1a8",outfitStyle:"suit",accessory:"bow_tie",heightScale:1.04,widthScale:1.04}},{id:"cousin_shy",name:"ユイ（いとこ）",roleLabel:"恥ずかしがり",archetype:"shy",isVip:!1,homePos:{x:-2.42,z:.08},appearance:{skinColor:"#ffe3ce",hairColor:"#5c3b2e",hairStyle:"bob",outfitTopColor:"#a8d8ea",outfitBottomColor:"#8dc5dc",accentColor:"#ffffff",outfitStyle:"party_dress",accessory:"beret",heightScale:.92,widthScale:.92,rosyCheeks:!0}},{id:"helper_aunt",name:"ミドリ伯母さん",roleLabel:"おせっかい",archetype:"helper",isVip:!1,homePos:{x:2.68,z:.14},appearance:{skinColor:"#f7cfb0",hairColor:"#544642",hairStyle:"curly",outfitTopColor:"#48b89f",outfitBottomColor:"#369982",accentColor:"#ffe680",outfitStyle:"party_dress",accessory:"glasses",heightScale:.99,widthScale:1.05}},{id:"kid_peeker",name:"コウタ（キッズ）",roleLabel:"ひょっこり",archetype:"peeker",isVip:!1,homePos:{x:-.64,z:-1.12},appearance:{skinColor:"#ffe0c4",hairColor:"#3d281c",hairStyle:"short",outfitTopColor:"#ffd166",outfitBottomColor:"#3a6ea5",accentColor:"#ff6b6b",outfitStyle:"suit",accessory:"cap",heightScale:.77,widthScale:.88,rosyCheeks:!0}},{id:"girl_peeker",name:"メイ（フラワーガール）",roleLabel:"ひょっこり",archetype:"peeker",isVip:!1,homePos:{x:.68,z:-1.12},appearance:{skinColor:"#ffe4cf",hairColor:"#693d28",hairStyle:"ponytail",outfitTopColor:"#ff9ebb",outfitBottomColor:"#ffb7cc",accentColor:"#fff59d",outfitStyle:"party_dress",accessory:"flower_crown",heightScale:.79,widthScale:.88,rosyCheeks:!0}},{id:"tall_brother",name:"ケンジ（新郎兄）",roleLabel:"おせっかい",archetype:"helper",isVip:!1,homePos:{x:0,z:-1.18},appearance:{skinColor:"#efc4a1",hairColor:"#252329",hairStyle:"short",outfitTopColor:"#4c6793",outfitBottomColor:"#344766",accentColor:"#9de0ad",outfitStyle:"suit",accessory:"glasses",heightScale:1.15,widthScale:1.06}},{id:"college_jumper",name:"マオ（大学友人）",roleLabel:"ジャンパー",archetype:"jumper",isVip:!1,homePos:{x:-1.86,z:-1.14},appearance:{skinColor:"#fcd6b8",hairColor:"#8d4b2d",hairStyle:"ponytail",outfitTopColor:"#ff6f91",outfitBottomColor:"#e05375",accentColor:"#ffd93d",outfitStyle:"party_dress",accessory:"headband",heightScale:.96,widthScale:.94,rosyCheeks:!0}},{id:"sporty_jumper",name:"ダイチ（後輩）",roleLabel:"ジャンパー",archetype:"jumper",isVip:!1,homePos:{x:1.92,z:-1.14},appearance:{skinColor:"#edb991",hairColor:"#222126",hairStyle:"spiky",outfitTopColor:"#3ec1d3",outfitBottomColor:"#2c5364",accentColor:"#ffde59",outfitStyle:"suit",accessory:"headband",heightScale:1.05,widthScale:1.02}},{id:"grandpa_blinker",name:"トメ吉おじいちゃん",roleLabel:"うっかり",archetype:"blinker",isVip:!1,homePos:{x:-2.86,z:-1.14},appearance:{skinColor:"#f3caa8",hairColor:"#e5e7eb",hairStyle:"bald_sides",outfitTopColor:"#7a6c5d",outfitBottomColor:"#5c5247",accentColor:"#e6b89c",outfitStyle:"suit",accessory:"top_hat",heightScale:.94,widthScale:1}},{id:"dreamy_blinker",name:"サクラ（受付担当）",roleLabel:"うっかり",archetype:"blinker",isVip:!1,homePos:{x:2.86,z:-1.14},appearance:{skinColor:"#ffe2cc",hairColor:"#4c322b",hairStyle:"long",outfitTopColor:"#c3aed6",outfitBottomColor:"#a68bc2",accentColor:"#ffe0f0",outfitStyle:"party_dress",accessory:"bouquet",heightScale:.95,widthScale:.94,rosyCheeks:!0}}]},school_trip:{id:"school_trip",title:"修学旅行・古都の石段",subtitle:"桜吹雪の神社でクラス記念撮影！",description:"3段の石段に並んだハイテンションな3年2組！ジャンパーと目立ちたがりが大暴れする中、先生と生徒全員のベストスマイルを狙え！",roundDuration:42,maxShots:5,stageBounds:{minX:-4.5,maxX:4.5,minZ:-2.9,maxZ:2.1},platforms:[{id:"step_1",minX:-4.1,maxX:4.1,minZ:-1.15,maxZ:-.05,height:.36},{id:"step_2",minX:-4.1,maxX:4.1,minZ:-2.45,maxZ:-1.15,height:.72}],defaultCamera:{azimuth:-.06,elevation:.17,distance:9.2,fov:42,target:{x:0,y:1.38,z:-.55}},cameraLimits:{minAzimuth:-.72,maxAzimuth:.72,minElevation:.04,maxElevation:.58,minFov:25,maxFov:56,minTargetX:-2,maxTargetX:2,minTargetY:.85,maxTargetY:2.15},roster:[{id:"teacher",name:"山田先生",roleLabel:"主役・担任",archetype:"vip",isVip:!0,homePos:{x:0,z:.56},appearance:{skinColor:"#f3c7a2",hairColor:"#2d2926",hairStyle:"short",outfitTopColor:"#2d9a72",outfitBottomColor:"#24473e",accentColor:"#ffca3a",outfitStyle:"teacher_track",accessory:"flag",heightScale:1.09,widthScale:1.05}},{id:"class_rep",name:"アオイ（学級委員）",roleLabel:"主役・委員長",archetype:"vip",isVip:!0,homePos:{x:-1.06,z:.52},appearance:{skinColor:"#ffe0c7",hairColor:"#23283d",hairStyle:"bob",outfitTopColor:"#f8f5ef",outfitBottomColor:"#2f4570",accentColor:"#e63946",outfitStyle:"sailor",accessory:"glasses",heightScale:.97,widthScale:.94,rosyCheeks:!0}},{id:"class_clown",name:"ショウタ（お調子者）",roleLabel:"目立ちたがり",archetype:"showoff",isVip:!1,homePos:{x:1.12,z:.58},appearance:{skinColor:"#f5c79e",hairColor:"#7a4928",hairStyle:"spiky",outfitTopColor:"#e76f51",outfitBottomColor:"#2b3447",accentColor:"#ffd166",outfitStyle:"school_blazer",accessory:"sunglasses",heightScale:1.04,widthScale:1.02}},{id:"shy_student",name:"コハル（図書委員）",roleLabel:"恥ずかしがり",archetype:"shy",isVip:!1,homePos:{x:-2.22,z:.44},appearance:{skinColor:"#ffe5d1",hairColor:"#4a312c",hairStyle:"long",outfitTopColor:"#f3d5b5",outfitBottomColor:"#364d75",accentColor:"#ff8fab",outfitStyle:"sailor",accessory:"beret",heightScale:.93,widthScale:.92,rosyCheeks:!0}},{id:"blinker_student",name:"ハルト（寝不足）",roleLabel:"うっかり",archetype:"blinker",isVip:!1,homePos:{x:2.3,z:.48},appearance:{skinColor:"#f8d2b2",hairColor:"#2b2a33",hairStyle:"curly",outfitTopColor:"#5b8fb9",outfitBottomColor:"#2c3d59",accentColor:"#ffe66d",outfitStyle:"school_blazer",accessory:"none",heightScale:1,widthScale:.98}},{id:"peeker_1",name:"リク（背の順1番）",roleLabel:"ひょっこり",archetype:"peeker",isVip:!1,homePos:{x:-.16,z:-.6},appearance:{skinColor:"#ffdec3",hairColor:"#3a2a21",hairStyle:"short",outfitTopColor:"#f4c95d",outfitBottomColor:"#2f4566",accentColor:"#ff6b6b",outfitStyle:"school_blazer",accessory:"cap",heightScale:.79,widthScale:.88,rosyCheeks:!0}},{id:"helper_1",name:"ミナ（保健委員）",roleLabel:"おせっかい",archetype:"helper",isVip:!1,homePos:{x:.72,z:-.62},appearance:{skinColor:"#ffe0c8",hairColor:"#56392a",hairStyle:"ponytail",outfitTopColor:"#f7f3e9",outfitBottomColor:"#2f4870",accentColor:"#52b788",outfitStyle:"sailor",accessory:"none",heightScale:1.04,widthScale:.98}},{id:"jumper_1",name:"レン（バスケ部）",roleLabel:"ジャンパー",archetype:"jumper",isVip:!1,homePos:{x:-1.78,z:-.62},appearance:{skinColor:"#edb990",hairColor:"#252326",hairStyle:"spiky",outfitTopColor:"#3b6ea5",outfitBottomColor:"#24344d",accentColor:"#ff9f1c",outfitStyle:"school_blazer",accessory:"headband",heightScale:1.1,widthScale:1.04}},{id:"showoff_2",name:"カレン（広報部長）",roleLabel:"目立ちたがり",archetype:"showoff",isVip:!1,homePos:{x:1.88,z:-.58},appearance:{skinColor:"#ffe2cb",hairColor:"#8f4f32",hairStyle:"bun",outfitTopColor:"#ff9ebb",outfitBottomColor:"#324870",accentColor:"#ff4d6d",outfitStyle:"sailor",accessory:"flower_crown",heightScale:.98,widthScale:.95,rosyCheeks:!0}},{id:"peeker_2",name:"ヒナ（美術部）",roleLabel:"ひょっこり",archetype:"peeker",isVip:!1,homePos:{x:.32,z:-1.76},appearance:{skinColor:"#ffe4cf",hairColor:"#573626",hairStyle:"bob",outfitTopColor:"#a8dadc",outfitBottomColor:"#334d73",accentColor:"#ffd166",outfitStyle:"sailor",accessory:"beret",heightScale:.81,widthScale:.88,rosyCheeks:!0}},{id:"jumper_2",name:"ユウト（サッカー部）",roleLabel:"ジャンパー",archetype:"jumper",isVip:!1,homePos:{x:-1.16,z:-1.75},appearance:{skinColor:"#f2c19b",hairColor:"#3c2a1e",hairStyle:"spiky",outfitTopColor:"#48cae4",outfitBottomColor:"#253954",accentColor:"#ffde59",outfitStyle:"school_blazer",accessory:"headband",heightScale:1.04,widthScale:1}},{id:"helper_2",name:"タクマ（柔道部）",roleLabel:"おせっかい",archetype:"helper",isVip:!1,homePos:{x:1.24,z:-1.75},appearance:{skinColor:"#e8b691",hairColor:"#212126",hairStyle:"short",outfitTopColor:"#d4a373",outfitBottomColor:"#2b374d",accentColor:"#ffbe0b",outfitStyle:"school_blazer",accessory:"none",heightScale:1.14,widthScale:1.12}},{id:"blinker_2",name:"モモ（カメラ係）",roleLabel:"うっかり",archetype:"blinker",isVip:!1,homePos:{x:-2.42,z:-1.74},appearance:{skinColor:"#ffe0c8",hairColor:"#4c3228",hairStyle:"ponytail",outfitTopColor:"#e9c46a",outfitBottomColor:"#31466e",accentColor:"#ff758f",outfitStyle:"sailor",accessory:"none",heightScale:.94,widthScale:.94,rosyCheeks:!0}},{id:"shy_2",name:"ソウ（将棋部）",roleLabel:"恥ずかしがり",archetype:"shy",isVip:!1,homePos:{x:2.46,z:-1.74},appearance:{skinColor:"#f8d3b5",hairColor:"#24252e",hairStyle:"short",outfitTopColor:"#84a59d",outfitBottomColor:"#2c3d54",accentColor:"#f6bd60",outfitStyle:"school_blazer",accessory:"glasses",heightScale:.98,widthScale:.96}}]},sports_day:{id:"sports_day",title:"社内運動会・グラグラ表彰台",subtitle:"暴走大玉＆くす玉爆発の優勝記念！",description:"段差の激しい1位〜3位表彰台に15人がぎゅうぎゅう！暴走大玉の人間ボウリングと、くす玉パッカーンの大ジャンプを激写しよう！",roundDuration:42,maxShots:5,stageBounds:{minX:-4.4,maxX:4.4,minZ:-2.4,maxZ:2.3},platforms:[{id:"podium_1",minX:-1.15,maxX:1.15,minZ:-1.65,maxZ:-.45,height:.88},{id:"podium_2",minX:-2.75,maxX:-1.15,minZ:-1.65,maxZ:-.45,height:.56},{id:"podium_3",minX:1.15,maxX:2.75,minZ:-1.65,maxZ:-.45,height:.34}],defaultCamera:{azimuth:.05,elevation:.16,distance:9.2,fov:42,target:{x:0,y:1.48,z:-.35}},cameraLimits:{minAzimuth:-.72,maxAzimuth:.72,minElevation:.04,maxElevation:.58,minFov:25,maxFov:56,minTargetX:-2,maxTargetX:2,minTargetY:.85,maxTargetY:2.25},roster:[{id:"captain_vip",name:"カズヤ（優勝キャプテン）",roleLabel:"主役・キャプテン",archetype:"vip",isVip:!0,homePos:{x:-.46,z:-1},appearance:{skinColor:"#f5c79e",hairColor:"#2a221d",hairStyle:"spiky",outfitTopColor:"#e63946",outfitBottomColor:"#1d3557",accentColor:"#ffd166",outfitStyle:"track_jersey",accessory:"trophy",heightScale:1.06,widthScale:1.02}},{id:"ceo_vip",name:"ゴロウ社長",roleLabel:"主役・熱血社長",archetype:"vip",isVip:!0,homePos:{x:.52,z:-1.02},appearance:{skinColor:"#f3c59e",hairColor:"#d9dce0",hairStyle:"bald_sides",outfitTopColor:"#2b59c3",outfitBottomColor:"#1d2d44",accentColor:"#ffca3a",outfitStyle:"track_jersey",accessory:"headband",heightScale:1.02,widthScale:1.08}},{id:"cheer_jumper",name:"ナツミ（紅組応援団）",roleLabel:"ジャンパー",archetype:"jumper",isVip:!1,homePos:{x:-1.62,z:-1.04},appearance:{skinColor:"#ffe0c7",hairColor:"#5c3322",hairStyle:"ponytail",outfitTopColor:"#ff4d6d",outfitBottomColor:"#fff5f7",accentColor:"#ffd166",outfitStyle:"track_jersey",accessory:"pom_pom",heightScale:.96,widthScale:.94,rosyCheeks:!0}},{id:"sales_peeker",name:"コジロウ（新入社員）",roleLabel:"ひょっこり",archetype:"peeker",isVip:!1,homePos:{x:-2.35,z:-1.08},appearance:{skinColor:"#ffdfc4",hairColor:"#2c2520",hairStyle:"short",outfitTopColor:"#ffd166",outfitBottomColor:"#2b3d59",accentColor:"#e63946",outfitStyle:"track_jersey",accessory:"cap",heightScale:.8,widthScale:.88,rosyCheeks:!0}},{id:"white_jumper",name:"タイガ（白組エース）",roleLabel:"ジャンパー",archetype:"jumper",isVip:!1,homePos:{x:1.62,z:-1.02},appearance:{skinColor:"#edb990",hairColor:"#252326",hairStyle:"spiky",outfitTopColor:"#f8fafc",outfitBottomColor:"#264653",accentColor:"#00bbf9",outfitStyle:"track_jersey",accessory:"headband",heightScale:1.07,widthScale:1.02}},{id:"hr_helper",name:"アヤカ（総務係）",roleLabel:"おせっかい",archetype:"helper",isVip:!1,homePos:{x:2.38,z:-1.05},appearance:{skinColor:"#ffe3cc",hairColor:"#4c3228",hairStyle:"bob",outfitTopColor:"#2ec4b6",outfitBottomColor:"#1f4e5f",accentColor:"#ffe66d",outfitStyle:"track_jersey",accessory:"glasses",heightScale:.98,widthScale:.96,rosyCheeks:!0}},{id:"mascot_showoff",name:"クマ田（着ぐるみ）",roleLabel:"目立ちたがり",archetype:"showoff",isVip:!1,homePos:{x:-.92,z:.42},appearance:{skinColor:"#f6d198",hairColor:"#b5651d",hairStyle:"curly",outfitTopColor:"#c97b36",outfitBottomColor:"#b5651d",accentColor:"#fff1d0",outfitStyle:"mascot_suit",accessory:"mascot_ears",heightScale:1.1,widthScale:1.15,rosyCheeks:!0}},{id:"pr_showoff",name:"ケンタ（広報課）",roleLabel:"目立ちたがり",archetype:"showoff",isVip:!1,homePos:{x:.96,z:.44},appearance:{skinColor:"#f5caa7",hairColor:"#754624",hairStyle:"spiky",outfitTopColor:"#ff7a3d",outfitBottomColor:"#253245",accentColor:"#fff1a8",outfitStyle:"track_jersey",accessory:"sunglasses",heightScale:1.04,widthScale:1.02}},{id:"intern_peeker",name:"ミユ（内定者）",roleLabel:"ひょっこり",archetype:"peeker",isVip:!1,homePos:{x:0,z:.16},appearance:{skinColor:"#ffe5d1",hairColor:"#5c3828",hairStyle:"ponytail",outfitTopColor:"#ff9ebb",outfitBottomColor:"#355070",accentColor:"#ffffff",outfitStyle:"track_jersey",accessory:"pom_pom",heightScale:.78,widthScale:.88,rosyCheeks:!0}},{id:"acct_shy",name:"サトシ（経理部）",roleLabel:"恥ずかしがり",archetype:"shy",isVip:!1,homePos:{x:-2.02,z:.48},appearance:{skinColor:"#f8d4b7",hairColor:"#272936",hairStyle:"short",outfitTopColor:"#8ecae6",outfitBottomColor:"#2b3d59",accentColor:"#ffffff",outfitStyle:"track_jersey",accessory:"glasses",heightScale:.94,widthScale:.94}},{id:"nurse_helper",name:"タケオ（救護班）",roleLabel:"おせっかい",archetype:"helper",isVip:!1,homePos:{x:2.02,z:.46},appearance:{skinColor:"#efc4a1",hairColor:"#28262b",hairStyle:"short",outfitTopColor:"#52b788",outfitBottomColor:"#1b4332",accentColor:"#ffffff",outfitStyle:"track_jersey",accessory:"cap",heightScale:1.13,widthScale:1.08}},{id:"sleepy_director",name:"ヨシオ部長",roleLabel:"うっかり",archetype:"blinker",isVip:!1,homePos:{x:-3.02,z:.25},appearance:{skinColor:"#f3caa8",hairColor:"#cfd5dc",hairStyle:"bald_sides",outfitTopColor:"#6d597a",outfitBottomColor:"#355070",accentColor:"#eaac8b",outfitStyle:"track_jersey",accessory:"top_hat",heightScale:.95,widthScale:1.04}},{id:"design_shy",name:"リナ（デザイン課）",roleLabel:"恥ずかしがり",archetype:"shy",isVip:!1,homePos:{x:3.04,z:.24},appearance:{skinColor:"#ffe3ce",hairColor:"#6e4532",hairStyle:"long",outfitTopColor:"#c77dff",outfitBottomColor:"#3c096c",accentColor:"#ffd6ff",outfitStyle:"track_jersey",accessory:"beret",heightScale:.93,widthScale:.92,rosyCheeks:!0}},{id:"dev_blinker",name:"ヒロキ（開発部）",roleLabel:"うっかり",archetype:"blinker",isVip:!1,homePos:{x:-3.38,z:-.92},appearance:{skinColor:"#f7d1b2",hairColor:"#24252e",hairStyle:"curly",outfitTopColor:"#3a86ff",outfitBottomColor:"#1d3557",accentColor:"#ffbe0b",outfitStyle:"track_jersey",accessory:"glasses",heightScale:.99,widthScale:.98}},{id:"cheer_jumper_2",name:"ユウキ（応援団長）",roleLabel:"ジャンパー",archetype:"jumper",isVip:!1,homePos:{x:3.38,z:-.9},appearance:{skinColor:"#edb991",hairColor:"#222126",hairStyle:"spiky",outfitTopColor:"#f4a261",outfitBottomColor:"#264653",accentColor:"#e76f51",outfitStyle:"track_jersey",accessory:"pom_pom",heightScale:1.03,widthScale:1.02}}]},tropical_beach:{id:"tropical_beach",title:"南国ビーチ・大波サマー",subtitle:"ざっぱーん大波＆ビーチボール乱入！",description:"エメラルドの海辺で常夏ショット！押し寄せる大波で前列が一斉にすってんころりん！？波の引き際と巨大ビーチボールを見極めろ！",roundDuration:42,maxShots:5,stageBounds:{minX:-4.4,maxX:4.4,minZ:-2.4,maxZ:2.3},platforms:[{id:"sand_dune",minX:-4,maxX:4,minZ:-2.05,maxZ:-.58,height:.24}],defaultCamera:{azimuth:-.05,elevation:.16,distance:8.8,fov:41,target:{x:0,y:1.18,z:-.25}},cameraLimits:{minAzimuth:-.72,maxAzimuth:.72,minElevation:.04,maxElevation:.56,minFov:24,maxFov:56,minTargetX:-2,maxTargetX:2,minTargetY:.75,maxTargetY:1.95},roster:[{id:"aloha_boss",name:"マサオ部長（アロハ）",roleLabel:"主役・部長",archetype:"vip",isVip:!0,homePos:{x:-.56,z:.34},appearance:{skinColor:"#e8b48a",hairColor:"#3a3430",hairStyle:"short",outfitTopColor:"#ff6b6b",outfitBottomColor:"#f4d35e",accentColor:"#4ecdc4",outfitStyle:"aloha_shirt",accessory:"straw_hat",heightScale:1.05,widthScale:1.08}},{id:"vacation_vip",name:"モエカ（幹事）",roleLabel:"主役・幹事",archetype:"vip",isVip:!0,homePos:{x:.56,z:.34},appearance:{skinColor:"#fdd8bc",hairColor:"#5c3624",hairStyle:"long",outfitTopColor:"#2ec4b6",outfitBottomColor:"#fff1d0",accentColor:"#ff758f",outfitStyle:"aloha_shirt",accessory:"flower_crown",heightScale:.97,widthScale:.96,rosyCheeks:!0}},{id:"paripi_showoff",name:"チャラ男（パリピ先輩）",roleLabel:"目立ちたがり",archetype:"showoff",isVip:!1,homePos:{x:-1.78,z:.42},appearance:{skinColor:"#dfa174",hairColor:"#e09f3e",hairStyle:"spiky",outfitTopColor:"#ffbe0b",outfitBottomColor:"#fb5607",accentColor:"#ff006e",outfitStyle:"aloha_shirt",accessory:"sunglasses",heightScale:1.06,widthScale:1.02}},{id:"surfer_showoff",name:"カイ（サーファー）",roleLabel:"目立ちたがり",archetype:"showoff",isVip:!1,homePos:{x:1.82,z:.44},appearance:{skinColor:"#d9996b",hairColor:"#3a2c22",hairStyle:"spiky",outfitTopColor:"#00bbf9",outfitBottomColor:"#0077b6",accentColor:"#fee440",outfitStyle:"swimwear",accessory:"swim_ring",heightScale:1.05,widthScale:1.04}},{id:"shy_beach",name:"ミサキ（日陰派）",roleLabel:"恥ずかしがり",archetype:"shy",isVip:!1,homePos:{x:-2.68,z:.16},appearance:{skinColor:"#ffe6d4",hairColor:"#4c3228",hairStyle:"bob",outfitTopColor:"#ffd6e0",outfitBottomColor:"#ffacc5",accentColor:"#ffffff",outfitStyle:"party_dress",accessory:"straw_hat",heightScale:.93,widthScale:.92,rosyCheeks:!0}},{id:"lifeguard_helper",name:"リョウタ（監視員）",roleLabel:"おせっかい",archetype:"helper",isVip:!1,homePos:{x:2.72,z:.18},appearance:{skinColor:"#db9c70",hairColor:"#262320",hairStyle:"short",outfitTopColor:"#e63946",outfitBottomColor:"#ffb703",accentColor:"#ffffff",outfitStyle:"swimwear",accessory:"sunglasses",heightScale:1.14,widthScale:1.08}},{id:"ring_peeker_1",name:"ソータ（浮き輪キッズ）",roleLabel:"ひょっこり",archetype:"peeker",isVip:!1,homePos:{x:-.66,z:-1.08},appearance:{skinColor:"#f9cfa9",hairColor:"#3b281c",hairStyle:"short",outfitTopColor:"#ffd166",outfitBottomColor:"#118ab2",accentColor:"#ff6b6b",outfitStyle:"swimwear",accessory:"swim_ring",heightScale:.78,widthScale:.88,rosyCheeks:!0}},{id:"ring_peeker_2",name:"ココ（貝殻あつめ）",roleLabel:"ひょっこり",archetype:"peeker",isVip:!1,homePos:{x:.68,z:-1.08},appearance:{skinColor:"#ffe1c6",hairColor:"#693d28",hairStyle:"ponytail",outfitTopColor:"#ff8fab",outfitBottomColor:"#fb6f92",accentColor:"#fff59d",outfitStyle:"swimwear",accessory:"straw_hat",heightScale:.8,widthScale:.88,rosyCheeks:!0}},{id:"tall_helper_beach",name:"ダイスケ（BBQ担当）",roleLabel:"おせっかい",archetype:"helper",isVip:!1,homePos:{x:0,z:-1.14},appearance:{skinColor:"#e4b086",hairColor:"#252329",hairStyle:"short",outfitTopColor:"#52b788",outfitBottomColor:"#264653",accentColor:"#ffd166",outfitStyle:"aloha_shirt",accessory:"cap",heightScale:1.15,widthScale:1.06}},{id:"snorkel_jumper",name:"ハヤト（シュノーケル）",roleLabel:"ジャンパー",archetype:"jumper",isVip:!1,homePos:{x:-1.88,z:-1.12},appearance:{skinColor:"#ecb78e",hairColor:"#28252b",hairStyle:"spiky",outfitTopColor:"#3a86ff",outfitBottomColor:"#1d3557",accentColor:"#ffbe0b",outfitStyle:"swimwear",accessory:"snorkel",heightScale:1.04,widthScale:1}},{id:"volley_jumper",name:"アカリ（ビーチバレー）",roleLabel:"ジャンパー",archetype:"jumper",isVip:!1,homePos:{x:1.9,z:-1.12},appearance:{skinColor:"#f7cba7",hairColor:"#8d4b2d",hairStyle:"ponytail",outfitTopColor:"#ff595e",outfitBottomColor:"#1982c4",accentColor:"#ffca3a",outfitStyle:"swimwear",accessory:"headband",heightScale:.99,widthScale:.96,rosyCheeks:!0}},{id:"sunscreen_blinker",name:"タダシ（日焼け止め中）",roleLabel:"うっかり",archetype:"blinker",isVip:!1,homePos:{x:-2.88,z:-1.1},appearance:{skinColor:"#f5cfa8",hairColor:"#544642",hairStyle:"curly",outfitTopColor:"#9b5de5",outfitBottomColor:"#2b2d42",accentColor:"#00f5d4",outfitStyle:"aloha_shirt",accessory:"straw_hat",heightScale:.96,widthScale:1.02}},{id:"nap_blinker",name:"ユメ（うたた寝）",roleLabel:"うっかり",archetype:"blinker",isVip:!1,homePos:{x:2.88,z:-1.1},appearance:{skinColor:"#ffe2cc",hairColor:"#5c3b2e",hairStyle:"bun",outfitTopColor:"#f4a261",outfitBottomColor:"#e76f51",accentColor:"#fff1d0",outfitStyle:"aloha_shirt",accessory:"flower_crown",heightScale:.95,widthScale:.94,rosyCheeks:!0}}]}};function an(i,e,t){let n=0;for(const s of i.platforms)e>=s.minX&&e<=s.maxX&&t>=s.minZ&&t<=s.maxZ&&s.height>n&&(n=s.height);return n}const ei=256,$g=ei*.5,jg=ei*.525,Kg=ei/360,Jg=ei/180;function jo(i,e){const t=new Ye(i);return t.multiplyScalar(1-e),`#${t.getHexString()}`}function Sn(i,e,t=!1){if(e<=.01)return;const n=t?11.5:9.5,s=t?6.8:5.8;for(const o of[-1,1]){const r=o*24.5,c=9.5;i.save(),i.translate(r,c),i.scale(n,s);const l=i.createRadialGradient(0,0,.08,0,0,1);l.addColorStop(0,`rgba(255, 108, 134, ${e})`),l.addColorStop(.6,`rgba(255, 128, 150, ${e*.5})`),l.addColorStop(1,"rgba(255, 138, 160, 0)"),i.fillStyle=l,i.beginPath(),i.arc(0,0,1,0,Math.PI*2),i.fill(),i.restore()}}function Pn(i,e){i.save(),i.fillStyle=jo(e,.13),i.beginPath(),i.ellipse(0,5.2,2.3,1.5,0,0,Math.PI*2),i.fill(),i.restore()}function is(i,e,t,n,s,o=0,r=0){i.save(),i.fillStyle="#241816",i.beginPath(),i.ellipse(e+o,t+r,n,s,0,0,Math.PI*2),i.fill(),i.fillStyle="#5c3828",i.beginPath(),i.ellipse(e+o,t+r+s*.36,n*.62,s*.34,0,0,Math.PI*2),i.fill(),i.strokeStyle="#1a100e",i.lineWidth=2,i.lineCap="round",i.beginPath(),i.ellipse(e,t-.5,n+.9,s+.5,0,Math.PI*1.12,Math.PI*1.88),i.stroke(),i.fillStyle="#ffffff",i.beginPath(),i.ellipse(e+o-n*.28,t+r-s*.3,n*.36,s*.34,-.25,0,Math.PI*2),i.fill(),i.beginPath(),i.arc(e+o+n*.3,t+r+s*.32,n*.16,0,Math.PI*2),i.fill(),i.restore()}function Lt(i,e,t,n,s,o,r,c=2.4){i.save(),i.strokeStyle="#3d281f",i.lineWidth=c,i.lineCap="round",i.beginPath(),i.moveTo(e,t),i.quadraticCurveTo(n,s,o,r),i.stroke(),i.restore()}function bl(i,e,t,n){i.save(),i.fillStyle="#ffffff",i.strokeStyle="#241816",i.lineWidth=1.8,i.beginPath(),i.arc(e,t,8.8,0,Math.PI*2),i.fill(),i.stroke(),i.strokeStyle="#241816",i.lineWidth=2.1,i.lineCap="round",i.beginPath();const s=2.45,o=44;for(let r=0;r<=o;r++){const c=r/o,l=n*c*s*Math.PI*2,d=c*7.2,h=e+Math.cos(l)*d,u=t+Math.sin(l)*d;r===0?i.moveTo(h,u):i.lineTo(h,u)}i.stroke(),i.restore()}function Qg(i,e,t){i.save(),i.translate(e,t),i.rotate(.18);const n=i.createLinearGradient(0,-8,0,8);n.addColorStop(0,"#c8f4ff"),n.addColorStop(.55,"#5ad2ff"),n.addColorStop(1,"#269be8"),i.fillStyle=n,i.strokeStyle="#1b5d99",i.lineWidth=1.6,i.beginPath(),i.moveTo(0,-8.5),i.bezierCurveTo(4.2,-2,6.2,2.5,4.5,6.2),i.arc(0,4.8,4.6,.25,Math.PI-.25),i.bezierCurveTo(-6.2,2.5,-4.2,-2,0,-8.5),i.closePath(),i.fill(),i.stroke(),i.fillStyle="#ffffff",i.beginPath(),i.ellipse(-1.4,2.4,1.3,2.4,-.25,0,Math.PI*2),i.fill(),i.restore()}function e1(i,e,t,n){const s=i.createLinearGradient(0,0,0,ei);s.addColorStop(0,t),s.addColorStop(.7,t),s.addColorStop(1,jo(t,.08)),i.fillStyle=s,i.fillRect(0,0,ei,ei),i.save(),i.translate($g,jg),i.scale(Kg,Jg);const o=n?.56:.24;switch(e){case"smile":{Sn(i,Math.max(o,.42),!1),Pn(i,t),is(i,-16,-2,6.4,7.6),is(i,16,-2,6.4,7.6),Lt(i,-23,-14.5,-16,-18.5,-9,-15,2.3),Lt(i,9,-15,16,-18.5,23,-14.5,2.3),i.strokeStyle="#3d1e1c",i.lineWidth=2.7,i.lineCap="round",i.beginPath(),i.moveTo(-10.5,12.5),i.quadraticCurveTo(0,22.8,10.5,12.5),i.stroke();break}case"cheese":{Sn(i,Math.max(o+.22,.68),!0),Pn(i,t),i.strokeStyle="#241816",i.lineWidth=3.6,i.lineCap="round";for(const r of[-1,1]){const c=r*16.5;i.beginPath(),i.moveTo(c-7.8,1.5),i.quadraticCurveTo(c,-10.5,c+7.8,1.5),i.stroke()}Lt(i,-23.5,-15.5,-16.5,-20.5,-9,-16,2.3),Lt(i,9,-16,16.5,-20.5,23.5,-15.5,2.3),i.save(),i.beginPath(),i.moveTo(-13.5,10.8),i.quadraticCurveTo(0,9.2,13.5,10.8),i.quadraticCurveTo(13,27.5,0,27.5),i.quadraticCurveTo(-13,27.5,-13.5,10.8),i.closePath(),i.fillStyle="#c43b49",i.fill(),i.save(),i.clip(),i.fillStyle="#ffffff",i.fillRect(-15,9.2,30,5.2),i.fillStyle="#ff8599",i.beginPath(),i.ellipse(0,25.8,9.5,6.2,0,0,Math.PI*2),i.fill(),i.restore(),i.strokeStyle="#3a1a1c",i.lineWidth=2.4,i.stroke(),i.restore();break}case"neutral":{Sn(i,o*.75,!1),Pn(i,t),is(i,-16,-1.5,5.9,6.8),is(i,16,-1.5,5.9,6.8),Lt(i,-22,-13.5,-16,-15.5,-9.5,-13.8,2.2),Lt(i,9.5,-13.8,16,-15.5,22,-13.5,2.2),i.strokeStyle="#3d1e1c",i.lineWidth=2.4,i.lineCap="round",i.beginPath(),i.moveTo(-6.8,14.5),i.quadraticCurveTo(0,18.8,6.8,14.5),i.stroke();break}case"nervous":{Sn(i,Math.max(o+.14,.52),!0),Pn(i,t);for(const r of[-1,1]){const c=r*16;i.fillStyle="#ffffff",i.strokeStyle="#241816",i.lineWidth=1.9,i.beginPath(),i.ellipse(c,-1.5,7.2,7.4,0,0,Math.PI*2),i.fill(),i.stroke(),i.fillStyle="#241816",i.beginPath(),i.ellipse(c-2.3,-1,4.1,4.9,0,0,Math.PI*2),i.fill(),i.fillStyle="#ffffff",i.beginPath(),i.arc(c-3.6,-2.8,1.5,0,Math.PI*2),i.fill()}Lt(i,-23.5,-11.5,-16,-14.2,-9.5,-18.2,2.3),Lt(i,9.5,-18.2,16,-14.2,23.5,-11.5,2.3),i.strokeStyle="#3d1e1c",i.lineWidth=2.4,i.lineCap="round",i.beginPath(),i.moveTo(-8.5,16.2),i.quadraticCurveTo(-4.2,12.6,0,16),i.quadraticCurveTo(4.2,19.2,8.5,15.6),i.stroke(),Qg(i,30.5,-12);break}case"surprised":{Sn(i,o*.65,!1),Pn(i,t);for(const r of[-1,1]){const c=r*16.5;i.fillStyle="#ffffff",i.strokeStyle="#241816",i.lineWidth=2.4,i.beginPath(),i.ellipse(c,-2,8.2,9,0,0,Math.PI*2),i.fill(),i.stroke(),i.fillStyle="#1e1412",i.beginPath(),i.arc(c,-1.8,2.7,0,Math.PI*2),i.fill(),i.fillStyle="#ffffff",i.beginPath(),i.arc(c-1.1,-3,.95,0,Math.PI*2),i.fill()}Lt(i,-23,-17.5,-16.5,-23,-10,-17.5,2.3),Lt(i,10,-17.5,16.5,-23,23,-17.5,2.3),i.fillStyle="#c43b49",i.strokeStyle="#3a1a1c",i.lineWidth=2.5,i.beginPath(),i.ellipse(0,17.2,7.6,9.4,0,0,Math.PI*2),i.fill(),i.stroke();break}case"blink_warn":{Sn(i,o*.55,!1),Pn(i,t);const r=jo(t,.14);for(const c of[-1,1]){const l=c*16;is(i,l,.5,6.2,6.2),i.fillStyle=t,i.beginPath(),i.rect(l-9,-10.5,18,10.6),i.fill(),i.fillStyle=r,i.beginPath(),i.rect(l-8.2,-3.2,16.4,3.2),i.fill(),i.strokeStyle="#241816",i.lineWidth=3.1,i.lineCap="round",i.beginPath(),i.moveTo(l-8.2,-.3),i.quadraticCurveTo(l,1.3,l+8.2,-.3),i.stroke()}Lt(i,-23,-11.8,-16,-12.8,-9.5,-11.2,2.2),Lt(i,9.5,-11.2,16,-12.8,23,-11.8,2.2),i.fillStyle="#b94c57",i.strokeStyle="#3d1e1c",i.lineWidth=2.1,i.beginPath(),i.ellipse(0,16,4.4,2.5,0,0,Math.PI*2),i.fill(),i.stroke();break}case"blink":{Sn(i,o*.65,!1),Pn(i,t),i.strokeStyle="#201412",i.lineWidth=3.8,i.lineCap="round";for(const r of[-1,1]){const c=r*16.5;i.beginPath(),i.moveTo(c-8.2,-2.5),i.quadraticCurveTo(c,5.8,c+8.2,-2.5),i.stroke(),i.lineWidth=2.2,i.beginPath(),i.moveTo(c+r*6.8,-.6),i.lineTo(c+r*9.8,1.6),i.stroke(),i.lineWidth=3.8}Lt(i,-22.5,-12.5,-16,-14.2,-9.5,-12.5,2.1),Lt(i,9.5,-12.5,16,-14.2,22.5,-12.5,2.1),i.strokeStyle="#3d1e1c",i.lineWidth=2.4,i.lineCap="round",i.beginPath(),i.moveTo(-6.5,15.8),i.quadraticCurveTo(0,17.5,6.5,15.8),i.stroke();break}case"dizzy":{Sn(i,Math.max(o,.45),!0),Pn(i,t),bl(i,-16.5,-1.5,1),bl(i,16.5,-1.5,-1),Lt(i,-24,-13,-16.5,-16,-9.5,-18.5,2.4),Lt(i,9.5,-14.5,16.5,-18,24,-15.5,2.4),i.strokeStyle="#3d1e1c",i.lineWidth=2.8,i.lineCap="round",i.beginPath(),i.moveTo(-11,16.5),i.bezierCurveTo(-7,11,-3.5,22,0,16.2),i.bezierCurveTo(3.5,11,7,22,11,15.8),i.stroke();break}case"smug":{Sn(i,o*.75,!1),Pn(i,t),is(i,-16,-1,6.4,6.8),i.fillStyle=t,i.beginPath(),i.moveTo(-25,-10),i.lineTo(-7,-10),i.lineTo(-7,-3.2),i.lineTo(-25,-5.8),i.closePath(),i.fill(),i.strokeStyle="#241816",i.lineWidth=2.6,i.lineCap="round",i.beginPath(),i.moveTo(-23.5,-5.6),i.lineTo(-9,-3.2),i.stroke(),i.strokeStyle="#241816",i.lineWidth=3.5,i.lineCap="round",i.beginPath(),i.moveTo(9.2,-3.8),i.quadraticCurveTo(16.5,-8.8,23.8,-1.5),i.stroke(),Lt(i,-23.5,-14.8,-16,-13.2,-9.2,-10.8,2.6),Lt(i,9.2,-14.5,16.5,-19.8,24,-15.2,2.6),i.save(),i.beginPath(),i.moveTo(-11.5,14.5),i.quadraticCurveTo(2,11.8,13.5,9.2),i.quadraticCurveTo(11.5,22.8,-1.5,22.2),i.quadraticCurveTo(-9.5,21.6,-11.5,14.5),i.closePath(),i.fillStyle="#ffffff",i.fill(),i.strokeStyle="#3a1a1c",i.lineWidth=2.4,i.stroke(),i.restore();break}case"sneeze":{Sn(i,Math.max(o+.36,.84),!0),i.save(),i.fillStyle="#e87882",i.beginPath(),i.ellipse(0,5.2,3,2,0,0,Math.PI*2),i.fill(),i.restore(),i.strokeStyle="#201412",i.lineWidth=3.9,i.lineCap="round",i.lineJoin="round",i.beginPath(),i.moveTo(-24.5,-8.5),i.lineTo(-9.5,-1.5),i.lineTo(-24.5,5.2),i.stroke(),i.beginPath(),i.moveTo(24.5,-8.5),i.lineTo(9.5,-1.5),i.lineTo(24.5,5.2),i.stroke(),i.lineWidth=1.8,i.strokeStyle=jo(t,.32);for(const r of[-1,1])i.beginPath(),i.moveTo(r*27.5,-4.5),i.lineTo(r*31.2,-5.8),i.moveTo(r*27.5,1.8),i.lineTo(r*31.2,3.2),i.stroke();Lt(i,-25.5,-16.2,-16.5,-12.5,-8.2,-9.8,2.8),Lt(i,8.2,-9.8,16.5,-12.5,25.5,-16.2,2.8),i.save(),i.beginPath(),i.moveTo(-12.5,13.5),i.bezierCurveTo(-11.5,8.2,11.5,8.2,12.5,13.5),i.bezierCurveTo(15.5,21.5,10.5,31.5,0,31.5),i.bezierCurveTo(-10.5,31.5,-15.5,21.5,-12.5,13.5),i.closePath(),i.fillStyle="#c43245",i.fill(),i.save(),i.clip(),i.fillStyle="#ffffff",i.fillRect(-15,8,30,5.4),i.fillStyle="#ff7b96",i.beginPath(),i.ellipse(0,29.5,9.8,7,0,0,Math.PI*2),i.fill(),i.restore(),i.strokeStyle="#3a181c",i.lineWidth=2.6,i.stroke(),i.restore(),i.save();for(const r of[-1,1]){const c=r*19.5,l=22.5;i.fillStyle="#ffffff",i.strokeStyle="#5bbce8",i.lineWidth=1.6,i.beginPath(),i.arc(c,l,3.8,0,Math.PI*2),i.arc(c+r*3.6,l+1.8,2.8,0,Math.PI*2),i.arc(c+r*1.4,l-2.6,2.4,0,Math.PI*2),i.fill(),i.stroke(),i.strokeStyle="#6ec8f2",i.lineWidth=1.9,i.lineCap="round",i.beginPath(),i.moveTo(r*14.5,17.8),i.lineTo(r*22,14.5),i.moveTo(r*15.2,26.8),i.lineTo(r*23.2,29.8),i.stroke()}i.restore();break}case"hen_gao":{Sn(i,Math.max(o+.24,.7),!0),Pn(i,t),i.save(),i.fillStyle="#ffffff",i.strokeStyle="#201412",i.lineWidth=2.5,i.beginPath(),i.ellipse(-16.5,-2.5,9.6,10.2,-.1,0,Math.PI*2),i.fill(),i.stroke(),i.fillStyle="#1e1412",i.beginPath(),i.ellipse(-12.2,-4.8,5.2,5.6,0,0,Math.PI*2),i.fill(),i.fillStyle="#ffffff",i.beginPath(),i.arc(-13.8,-6.8,1.9,0,Math.PI*2),i.fill(),i.beginPath(),i.arc(-10.4,-2.8,.9,0,Math.PI*2),i.fill(),i.restore(),i.save(),i.fillStyle="#ffffff",i.strokeStyle="#201412",i.lineWidth=2.5,i.beginPath(),i.ellipse(16.8,-.8,7.6,8.2,.12,0,Math.PI*2),i.fill(),i.stroke(),i.fillStyle="#1e1412",i.beginPath(),i.arc(20,2.2,2.7,0,Math.PI*2),i.fill(),i.fillStyle="#ffffff",i.beginPath(),i.arc(19,1,1,0,Math.PI*2),i.fill(),i.fillStyle="#ff859d",i.beginPath(),i.ellipse(16.8,6.2,4.6,2.1,.08,0,Math.PI*2),i.fill(),i.restore(),i.save(),i.strokeStyle="#3d281f",i.lineWidth=2.8,i.lineCap="round",i.beginPath(),i.moveTo(-26.5,-16.5),i.bezierCurveTo(-21.5,-24.5,-14.5,-15.5,-8.5,-22.2),i.stroke(),i.beginPath(),i.moveTo(8.5,-12),i.bezierCurveTo(13.5,-16.5,18.5,-8.5,25.5,-14.5),i.stroke(),i.restore(),i.save(),i.beginPath(),i.moveTo(-14.5,13.8),i.quadraticCurveTo(0,9.2,14.8,12.6),i.quadraticCurveTo(14.5,24.5,.5,24.8),i.quadraticCurveTo(-13.8,25,-14.5,13.8),i.closePath(),i.fillStyle="#a8283b",i.fill(),i.save(),i.clip(),i.fillStyle="#ffffff",i.fillRect(-16,9,32,5),i.restore(),i.strokeStyle="#3a181c",i.lineWidth=2.5,i.stroke(),i.restore(),i.save(),i.beginPath(),i.moveTo(-2,17.5),i.bezierCurveTo(3.5,15.2,13.8,16.5,15.8,23.2),i.bezierCurveTo(17.6,29.8,11.2,35.8,4.5,33.6),i.bezierCurveTo(-1.2,31.6,-5.2,24.2,-2,17.5),i.closePath();const r=i.createLinearGradient(0,16,14,34);r.addColorStop(0,"#ff7aa8"),r.addColorStop(1,"#ff4d88"),i.fillStyle=r,i.fill(),i.strokeStyle="#5c1931",i.lineWidth=2.3,i.stroke(),i.strokeStyle="#c42b5e",i.lineWidth=1.9,i.lineCap="round",i.beginPath(),i.moveTo(4,18.8),i.quadraticCurveTo(8.5,23.5,9.6,28.8),i.stroke(),i.fillStyle="rgba(255, 255, 255, 0.65)",i.beginPath(),i.ellipse(3.6,25.2,1.9,3.2,-.45,0,Math.PI*2),i.fill(),i.restore();break}}i.restore()}function t1(i,e,t=!1){const n=document.createElement("canvas");n.width=ei,n.height=ei;const s=n.getContext("2d");s&&e1(s,i,e,t);const o=new Mt(n);return o.colorSpace=et,o.anisotropy=4,o.needsUpdate=!0,o}class n1{cache=new Map;getTexture(e,t,n=!1){const s=`${e}|${t.toLowerCase()}|${n?"1":"0"}`;let o=this.cache.get(s);return o||(o=t1(e,t,n),this.cache.set(s,o)),o}dispose(){for(const e of this.cache.values())e.dispose();this.cache.clear()}}let un=null;function i1(){const e=document.createElement("canvas");e.width=128,e.height=128;const t=e.getContext("2d");if(t){const s=t.createRadialGradient(64,64,10.24,64,64,61.44);s.addColorStop(0,"rgba(30, 24, 42, 0.48)"),s.addColorStop(.55,"rgba(30, 24, 42, 0.24)"),s.addColorStop(1,"rgba(30, 24, 42, 0)"),t.fillStyle=s,t.fillRect(0,0,128,128)}const n=new Mt(e);return n.colorSpace=et,n.needsUpdate=!0,n}function s1(){const i=new ki,e=5,t=.068,n=.03;for(let o=0;o<e*2;o++){const r=o%2===0?t:n,c=o/(e*2)*Math.PI*2-Math.PI/2,l=Math.cos(c)*r,d=Math.sin(c)*r;o===0?i.moveTo(l,d):i.lineTo(l,d)}i.closePath();const s=new sc(i,{depth:.018,bevelEnabled:!0,bevelThickness:.006,bevelSize:.005,bevelSegments:2});return s.center(),s}function o1(i){const t=document.createElement("canvas");t.width=128,t.height=128;const n=t.getContext("2d");if(n){n.clearRect(0,0,128,128);const o=128/2,r=128/2-4;let c="#ffffff",l="#ff6b6b",d="#e63946";switch(i){case"!":c="#fff8db",l="#ff595e",d="#e62e3d";break;case"?":c="#eef8ff",l="#3a86ff",d="#2563eb";break;case"★":case"✨":c="#fffbe0",l="#ffb703",d="#f59e0b";break;case"💦":c="#e6f7ff",l="#38bdf8",d="#0284c7";break;case"💢":c="#ffe8ec",l="#f43f5e",d="#e11d48";break;case"💫":c="#fff7cc",l="#fb8500",d="#f59e0b";break;case"💤":c="#ede9fe",l="#7c3aed",d="#6d28d9";break;case"✌":c="#ecfdf5",l="#10b981",d="#059669";break;case"❤":c="#fff0f5",l="#ff4d8d",d="#f43f5e";break;case"🤧":c="#e6f9ff",l="#38bdf8",d="#0284c7";break;case"🤪":c="#fff3d6",l="#ff6b9d",d="#e11d48";break}n.save(),n.shadowColor="rgba(20, 15, 30, 0.28)",n.shadowBlur=10,n.shadowOffsetY=5,n.fillStyle=c,n.beginPath(),n.arc(o,r,42,0,Math.PI*2),n.fill(),n.beginPath(),n.moveTo(o-12,r+35),n.lineTo(o,r+54),n.lineTo(o+12,r+35),n.closePath(),n.fill(),n.restore(),n.strokeStyle=l,n.lineWidth=7,n.beginPath(),n.arc(o,r,40,0,Math.PI*2),n.stroke(),n.fillStyle=d,n.textAlign="center",n.textBaseline="middle",i==="🤧"?(n.save(),n.translate(o,r+1),n.fillStyle="#ffe066",n.strokeStyle="#d97706",n.lineWidth=3,n.beginPath(),n.arc(-4,-2,23,0,Math.PI*2),n.fill(),n.stroke(),n.fillStyle="rgba(255, 92, 138, 0.65)",n.beginPath(),n.ellipse(-16,4,5.5,3.6,0,0,Math.PI*2),n.ellipse(8,4,5.5,3.6,0,0,Math.PI*2),n.fill(),n.strokeStyle="#291a16",n.lineWidth=3.5,n.lineCap="round",n.lineJoin="round",n.beginPath(),n.moveTo(-16,-10),n.lineTo(-8,-5),n.lineTo(-16,0),n.moveTo(8,-10),n.lineTo(0,-5),n.lineTo(8,0),n.stroke(),n.fillStyle="#ffffff",n.strokeStyle="#38bdf8",n.lineWidth=2.6,n.beginPath(),n.moveTo(-4,7),n.quadraticCurveTo(10,2,22,10),n.quadraticCurveTo(26,20,14,24),n.quadraticCurveTo(2,26,-6,16),n.closePath(),n.fill(),n.stroke(),n.strokeStyle="#0284c7",n.lineWidth=2.5,n.beginPath(),n.moveTo(18,-8),n.lineTo(27,-14),n.moveTo(21,0),n.lineTo(30,-1),n.stroke(),n.restore()):i==="🤪"?(n.save(),n.translate(o,r+1),n.rotate(-.14),n.fillStyle="#ffd93d",n.strokeStyle="#d97706",n.lineWidth=3,n.beginPath(),n.arc(0,-1,24,0,Math.PI*2),n.fill(),n.stroke(),n.fillStyle="#ffffff",n.strokeStyle="#241816",n.lineWidth=2.4,n.beginPath(),n.arc(-9.5,-7,8.2,0,Math.PI*2),n.fill(),n.stroke(),n.beginPath(),n.arc(10,-5.5,5.8,0,Math.PI*2),n.fill(),n.stroke(),n.fillStyle="#1f1412",n.beginPath(),n.arc(-6.2,-9.2,3.8,0,Math.PI*2),n.arc(12.2,-3.6,2.2,0,Math.PI*2),n.fill(),n.fillStyle="#9f1239",n.strokeStyle="#241816",n.lineWidth=2.4,n.beginPath(),n.arc(0,5.5,11.5,.05,Math.PI-.05),n.closePath(),n.fill(),n.stroke(),n.fillStyle="#ff5d9e",n.strokeStyle="#701a3c",n.lineWidth=2.3,n.beginPath(),n.moveTo(1,9),n.bezierCurveTo(10,7,18,12,17,21),n.bezierCurveTo(15,28,5,29,1,22),n.closePath(),n.fill(),n.stroke(),n.restore()):i==="!"||i==="?"?(n.font='900 58px "Hiragino Maru Gothic ProN", "Rounded Mplus 1c", system-ui, sans-serif',n.fillText(i,o,r+3)):i==="★"?(n.font="900 54px system-ui, sans-serif",n.fillText("★",o,r+3)):i==="❤"?(n.font="900 50px system-ui, sans-serif",n.fillText("❤",o,r+4)):(n.font='bold 48px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',n.fillText(i,o,r+3))}const s=new Mt(t);return s.colorSpace=et,s.needsUpdate=!0,s}function a1(){return un||(un={refCount:0,shadowTexture:i1(),starGeometry:s1(),reactionTextures:new Map}),un.refCount+=1,un}function r1(){if(un&&(un.refCount-=1,un.refCount<=0)){un.shadowTexture.dispose(),un.starGeometry.dispose();for(const i of un.reactionTextures.values())i.dispose();un.reactionTextures.clear(),un=null}}function c1(i,e){let t=i.reactionTextures.get(e);return t||(t=o1(e),i.reactionTextures.set(e,t)),t}function wl(i){let e=2166136261;for(let t=0;t<i.length;t++)e^=i.charCodeAt(t),e=Math.imul(e,16777619);return(e>>>0)/4294967295}function dn(i,e,t,n){return ht.lerp(i,e,1-Math.exp(-t*Math.min(n,.1)))}class l1{root;id;spec;faceCache;shared;ownedGeometries=[];ownedMaterials=[];ownedTextures=[];facingGroup;bodyPivot;torsoGroup;headPivot;leftArmPivot;rightArmPivot;leftLegPivot;rightLegPivot;headMesh;faceMaterial;contactShadow;contactShadowMat;reactionSprite;reactionSpriteMat;dizzyStarsGroup;dizzyStars=[];tmpHeadQuat=new Ms;leftPeaceSign;rightPeaceSign;hatPivot;sunglassesGroup=null;ponytailPivot=null;veilPivot=null;flagBannerPivot=null;leftPomPom=null;rightPomPom=null;heightScale;widthScale;headScale;headRadius;phaseOffset;holdsRightProp;holdsPomPoms;wearsSwimRing;poseVariant;currentExpression="neutral";currentReaction="";reactionPopAge=0;isPhotoMode=!1;animBodyY=0;animFallX=0;animFallZ=0;animLArmX=0;animLArmZ=-.16;animRArmX=0;animRArmZ=.16;animLLegX=0;animLLegZ=0;animRLegX=0;animRLegZ=0;animSunglassesRaise=0;disposed=!1;constructor(e,t){this.spec=e,this.id=e.id,this.faceCache=t,this.shared=a1();const n=e.appearance;this.heightScale=n.heightScale,this.widthScale=n.widthScale,this.headScale=.86+.14*n.heightScale,this.headRadius=.255*this.headScale,this.phaseOffset=wl(e.id)*Math.PI*2,this.poseVariant=Math.floor(wl(e.id+"_pose")*3),this.holdsRightProp=n.accessory==="flag"||n.accessory==="bouquet"||n.accessory==="trophy",this.holdsPomPoms=n.accessory==="pom_pom",this.wearsSwimRing=n.accessory==="swim_ring",this.root=new ye,this.root.name=`npc_${e.id}`;const s=this.trackGeo(new cn(.35*this.widthScale,20));this.contactShadowMat=this.trackMat(new so({map:this.shared.shadowTexture,transparent:!0,opacity:.72,depthWrite:!1})),this.contactShadow=new C(s,this.contactShadowMat),this.contactShadow.rotation.x=-Math.PI/2,this.contactShadow.position.y=.015,this.root.add(this.contactShadow),this.facingGroup=new ye,this.root.add(this.facingGroup),this.bodyPivot=new ye,this.facingGroup.add(this.bodyPivot);const o=this.makeToyMat(n.skinColor,.66),r=this.makeToyMat(n.hairColor,.6),c=this.makeToyMat(n.outfitTopColor,.68),l=this.makeToyMat(n.outfitBottomColor,.72),d=this.makeToyMat(n.accentColor,.56),h=this.makeToyMat("#fffdf8",.64),u=n.outfitStyle==="wedding_dress"?"#fff6f0":n.outfitStyle==="party_dress"?n.accentColor:n.outfitStyle==="track_jersey"?"#f8fafc":n.outfitStyle==="mascot_suit"?n.outfitBottomColor:n.outfitStyle==="aloha_shirt"?"#d9a16c":n.outfitStyle==="swimwear"?n.accentColor:"#2a2422",f=this.makeToyMat(u,.5),a=this.heightScale,p=this.widthScale,v=n.outfitStyle==="aloha_shirt"||n.outfitStyle==="swimwear",m=n.outfitStyle==="party_dress"||n.outfitStyle==="sailor"||n.outfitStyle==="wedding_dress"||v,g=m&&!v,S=m?o:l;this.leftLegPivot=this.buildLeg(-1,a,p,S,h,f,g),this.rightLegPivot=this.buildLeg(1,a,p,S,h,f,g),this.bodyPivot.add(this.leftLegPivot,this.rightLegPivot),this.torsoGroup=new ye,this.torsoGroup.position.y=.36*a,this.bodyPivot.add(this.torsoGroup),this.buildOutfit(a,p,c,l,d,h,o);const _=n.outfitStyle==="track_jersey"?d:h,y=n.outfitStyle==="mascot_suit"?d:o,b=this.buildArm(-1,a,p,c,y,_,v),w=this.buildArm(1,a,p,c,y,_,v);this.leftArmPivot=b.pivot,this.rightArmPivot=w.pivot,this.leftPeaceSign=b.peaceSign,this.rightPeaceSign=w.peaceSign,this.bodyPivot.add(this.leftArmPivot,this.rightArmPivot),n.accessory==="flag"?this.buildFlagProp(this.rightArmPivot,a,d):n.accessory==="bouquet"?this.buildBouquetProp(this.rightArmPivot,a,h,d):n.accessory==="trophy"?this.buildTrophyProp(this.rightArmPivot,a):n.accessory==="pom_pom"&&(this.leftPomPom=this.buildPomPomProp(this.leftArmPivot,a,c,d,h),this.rightPomPom=this.buildPomPomProp(this.rightArmPivot,a,c,d,h)),this.headPivot=new ye,this.headPivot.position.y=.93*a,this.bodyPivot.add(this.headPivot);const T=this.headRadius*.96,E=this.trackGeo(new Ee(this.headRadius,28,22)),M=this.faceCache.getTexture("neutral",n.skinColor,n.rosyCheeks);this.faceMaterial=this.trackMat(new lt({map:M,roughness:.66,metalness:.02}));const x=new C(E,this.faceMaterial);this.headMesh=x,x.position.y=T,x.rotation.y=-Math.PI/2,x.castShadow=!0,x.receiveShadow=!0,this.headPivot.add(x);const P=this.trackGeo(new Ee(this.headRadius*.22,12,10));for(const L of[-1,1]){const B=new C(P,o);B.position.set(L*this.headRadius*.95,T-.015,-.015),B.scale.set(.65,1,.78),B.castShadow=!0,this.headPivot.add(B)}const k=new ye;k.position.y=T+this.headRadius*.82,this.headPivot.add(k),this.hatPivot=new ye,k.add(this.hatPivot),this.buildHair(T,r,d),this.buildHeadAccessory(T,d,h),this.dizzyStarsGroup=new ye,this.dizzyStarsGroup.position.y=T+this.headRadius+.12,this.dizzyStarsGroup.visible=!1;const U=this.trackMat(new lt({color:"#ffe033",emissive:"#ffaa00",emissiveIntensity:.42,roughness:.3,metalness:.15}));for(let L=0;L<3;L++){const B=new C(this.shared.starGeometry,U),F=L/3*Math.PI*2,G=this.headRadius*1.15;B.position.set(Math.cos(F)*G,0,Math.sin(F)*G),B.castShadow=!1,this.dizzyStarsGroup.add(B),this.dizzyStars.push(B)}this.headPivot.add(this.dizzyStarsGroup),this.reactionSpriteMat=this.trackMat(new Eh({transparent:!0,depthTest:!0,depthWrite:!1})),this.reactionSprite=new hg(this.reactionSpriteMat),this.reactionSprite.position.y=.93*a+T+this.headRadius+.38,this.reactionSprite.scale.set(.3,.3,1),this.reactionSprite.visible=!1,this.root.add(this.reactionSprite)}trackGeo(e){return this.ownedGeometries.push(e),e}trackMat(e){return this.ownedMaterials.push(e),e}trackTex(e){return this.ownedTextures.push(e),e}makeToyMat(e,t=.65,n=.04){return this.trackMat(new lt({color:e,roughness:t,metalness:n}))}buildLeg(e,t,n,s,o,r,c){const l=new ye;l.position.set(e*.105*n,.38*t,0);const d=.28*t,h=this.trackGeo(new Xt(.062*n,Math.max(.06,d-.11),6,12)),u=new C(h,s);if(u.position.y=-d*.48,u.castShadow=!0,u.receiveShadow=!0,l.add(u),c){const p=this.trackGeo(new Te(.064*n,.058*n,.095*t,12)),v=new C(p,o);v.position.y=-.25*t,v.castShadow=!0,l.add(v)}const f=this.trackGeo(new Ee(.08*n,14,10)),a=new C(f,r);return a.position.set(0,-.33*t,.038*n),a.scale.set(.95,.62,1.38),a.castShadow=!0,a.receiveShadow=!0,l.add(a),l}buildArm(e,t,n,s,o,r,c=!1){const l=new ye;l.position.set(e*.245*n,.84*t,0);const d=this.trackGeo(new Ee(.072*n,12,10)),h=new C(d,s);h.castShadow=!0,l.add(h);const u=.3*t;if(c){const S=this.trackGeo(new Te(.062*n,.06*n,u*.44,10)),_=new C(S,s);_.position.y=-u*.24,_.castShadow=!0,l.add(_);const y=this.trackGeo(new Xt(.048*n,Math.max(.05,u*.5),6,10)),b=new C(y,o);b.position.y=-u*.64,b.castShadow=!0,l.add(b)}else{const S=this.trackGeo(new Xt(.052*n,Math.max(.08,u-.1),6,10)),_=new C(S,s);_.position.y=-u*.5,_.castShadow=!0,l.add(_);const y=this.trackGeo(new at(.052*n,.012*n,8,12)),b=new C(y,r);b.rotation.x=Math.PI/2,b.position.y=-u*.88,l.add(b)}const f=this.trackGeo(new Ee(.062*n,12,10)),a=new C(f,o);a.position.y=-u-.025,a.castShadow=!0,l.add(a);const p=new ye;p.position.set(0,-u-.055,.015);const v=this.trackGeo(new Xt(.017*n,.055*t,4,8)),m=new C(v,o);m.position.set(-.022*n,-.032*t,0),m.rotation.z=-.34;const g=new C(v,o);return g.position.set(.022*n,-.032*t,0),g.rotation.z=.34,p.add(m,g),p.visible=!1,l.add(p),{pivot:l,peaceSign:p}}buildOutfit(e,t,n,s,o,r,c){const l=this.spec.appearance,d=l.outfitStyle,h=this.trackGeo(new Te(.072*t,.085*t,.1*e,12)),u=new C(h,c);if(u.position.y=.56*e,u.castShadow=!0,this.torsoGroup.add(u),d==="wedding_dress"){const f=this.trackGeo(new Te(.155*t,.185*t,.27*e,18)),a=new C(f,n);a.position.y=.38*e,a.castShadow=!0,a.receiveShadow=!0,this.torsoGroup.add(a);const p=this.trackGeo(new Te(.18*t,.34*t,.34*e,22)),v=new C(p,n);v.position.y=.1*e,v.castShadow=!0,v.receiveShadow=!0,this.torsoGroup.add(v);const m=this.trackGeo(new Te(.32*t,.39*t,.18*e,24)),g=new C(m,s);g.position.y=-.14*e,g.castShadow=!0,g.receiveShadow=!0,this.torsoGroup.add(g);const S=this.trackGeo(new at(.195*t,.026*t,10,22)),_=new C(S,o);_.rotation.x=Math.PI/2,_.position.y=.26*e,this.torsoGroup.add(_);const y=this.trackGeo(new Ee(.055*t,10,8));for(const T of[-1,1]){const E=new C(y,o);E.position.set(T*.055*t,.25*e,-.2*t),E.scale.set(1.25,.75,.6),this.torsoGroup.add(E)}const b=this.trackGeo(new Ee(.017*t,8,8)),w=this.makeToyMat("#fffaf5",.22,.15);for(let T=0;T<9;T++){const E=(T-4)/4*1.15,M=new C(b,w);M.position.set(Math.sin(E)*.115*t,.515*e,Math.cos(E)*.11*t),this.torsoGroup.add(M)}}else if(d==="party_dress"){const f=this.trackGeo(new Te(.155*t,.175*t,.28*e,18)),a=new C(f,n);a.position.y=.37*e,a.castShadow=!0,a.receiveShadow=!0,this.torsoGroup.add(a);const p=this.trackGeo(new Te(.175*t,.31*t,.32*e,20)),v=new C(p,s);v.position.y=.09*e,v.castShadow=!0,v.receiveShadow=!0,this.torsoGroup.add(v);const m=this.trackGeo(new at(.18*t,.024*t,8,20)),g=new C(m,o);g.rotation.x=Math.PI/2,g.position.y=.24*e,this.torsoGroup.add(g);const S=this.trackGeo(new at(.125*t,.02*t,8,18)),_=new C(S,r);_.rotation.x=Math.PI/2,_.position.y=.505*e,this.torsoGroup.add(_)}else if(d==="tuxedo"||d==="suit"||d==="school_blazer"){const f=this.trackGeo(new Te(.185*t,.215*t,.44*e,18)),a=new C(f,n);a.position.y=.31*e,a.castShadow=!0,a.receiveShadow=!0,this.torsoGroup.add(a);const p=this.trackGeo(new Ee(.21*t,16,12)),v=new C(p,s);v.position.y=.08*e,v.scale.set(1,.52,.96),v.castShadow=!0,this.torsoGroup.add(v);const m=new ki;m.moveTo(-.085*t,.21*e),m.lineTo(.085*t,.21*e),m.lineTo(0,-.02*e),m.closePath();const g=this.trackGeo(new fs(m)),S=new C(g,r);S.position.set(0,.31*e,.196*t),this.torsoGroup.add(S);const _=this.trackGeo(new Ue(.048*t,.2*e,.022*t)),y=d==="tuxedo"?this.makeToyMat("#151b26",.35,.15):n;for(const T of[-1,1]){const E=new C(_,y);E.position.set(T*.068*t,.41*e,.194*t),E.rotation.z=T*-.32,this.torsoGroup.add(E)}if(l.accessory!=="bow_tie"){const T=this.trackGeo(new St(.036*t,.19*e,6)),E=new C(T,o);E.position.set(0,.39*e,.205*t),E.rotation.z=Math.PI,E.scale.set(1,1,.45),this.torsoGroup.add(E)}const b=this.trackGeo(new Ee(.016*t,8,8)),w=this.makeToyMat(d==="school_blazer"?"#f5cb5c":"#22242c",.35,.4);for(let T=0;T<2;T++){const E=new C(b,w);E.position.set(0,(.25-T*.085)*e,.21*t),this.torsoGroup.add(E)}if(d==="tuxedo"){const T=this.trackGeo(new pn(.032*t,0)),E=new C(T,o);E.position.set(.095*t,.42*e,.202*t),this.torsoGroup.add(E)}}else if(d==="sailor"){const f=this.trackGeo(new Te(.165*t,.195*t,.3*e,18)),a=new C(f,r);a.position.y=.37*e,a.castShadow=!0,a.receiveShadow=!0,this.torsoGroup.add(a);const p=this.trackGeo(new Ue(.32*t,.16*e,.05*t)),v=new C(p,n);v.position.set(0,.45*e,-.155*t),v.rotation.x=.2,v.castShadow=!0,this.torsoGroup.add(v);const m=this.trackGeo(new Ue(.28*t,.018*e,.054*t)),g=new C(m,r);g.position.set(0,.4*e,-.158*t),g.rotation.x=.2,this.torsoGroup.add(g);const S=this.trackGeo(new St(.145*t,.18*e,4)),_=new C(S,n);_.position.set(0,.45*e,.115*t),_.rotation.z=Math.PI,_.rotation.y=Math.PI/4,_.scale.set(1.05,1,.65),this.torsoGroup.add(_);const y=this.trackGeo(new Ee(.036*t,10,8)),b=new C(y,o);b.position.set(0,.39*e,.185*t),this.torsoGroup.add(b);const w=this.trackGeo(new Ue(.032*t,.11*e,.018*t));for(const M of[-1,1]){const x=new C(w,o);x.position.set(M*.025*t,.33*e,.192*t),x.rotation.z=M*.25,this.torsoGroup.add(x)}const T=this.trackGeo(new Te(.185*t,.275*t,.28*e,14)),E=new C(T,s);E.position.y=.1*e,E.castShadow=!0,E.receiveShadow=!0,this.torsoGroup.add(E)}else if(d==="teacher_track"){const f=this.trackGeo(new Te(.195*t,.215*t,.46*e,18)),a=new C(f,n);a.position.y=.31*e,a.castShadow=!0,a.receiveShadow=!0,this.torsoGroup.add(a);const p=this.trackGeo(new Ue(.03*t,.44*e,.03*t)),v=new C(p,r);v.position.set(0,.31*e,.2*t),this.torsoGroup.add(v);const m=this.trackGeo(new at(.202*t,.018*t,8,22)),g=new C(m,o);g.rotation.x=Math.PI/2,g.position.y=.38*e,this.torsoGroup.add(g);const S=this.trackGeo(new Te(.125*t,.145*t,.08*e,16)),_=new C(S,r);_.position.y=.53*e,this.torsoGroup.add(_);const y=this.makeToyMat("#ffd166",.25,.55),b=this.trackGeo(new Te(.018*t,.022*t,.05*t,10)),w=new C(b,y);w.rotation.z=Math.PI/2,w.position.set(.03*t,.36*e,.215*t),this.torsoGroup.add(w);const T=this.trackGeo(new Ee(.21*t,14,10)),E=new C(T,s);E.position.y=.08*e,E.scale.set(1,.52,.96),this.torsoGroup.add(E)}else if(d==="track_jersey"){const f=this.trackGeo(new Te(.19*t,.21*t,.45*e,18)),a=new C(f,n);a.position.y=.31*e,a.castShadow=!0,a.receiveShadow=!0,this.torsoGroup.add(a);const p=this.trackGeo(new Ee(.208*t,14,10)),v=new C(p,s);v.position.y=.08*e,v.scale.set(1,.52,.96),v.castShadow=!0,this.torsoGroup.add(v);const m=this.trackGeo(new at(.196*t,.019*t,8,22)),g=new C(m,o);g.rotation.x=Math.PI/2,g.position.y=.41*e,this.torsoGroup.add(g);const S=this.trackGeo(new at(.201*t,.012*t,8,22)),_=new C(S,r);_.rotation.x=Math.PI/2,_.position.y=.355*e,this.torsoGroup.add(_);const y=this.trackGeo(new Ue(.068*t,.028*e,.14*t));for(const U of[-1,1]){const L=new C(y,o);L.position.set(U*.145*t,.515*e,0),L.rotation.z=U*-.18,this.torsoGroup.add(L)}const b=this.trackGeo(new Te(.122*t,.142*t,.075*e,16)),w=new C(b,o);w.position.y=.53*e,this.torsoGroup.add(w);const T=this.trackGeo(new Ue(.022*t,.24*e,.024*t)),E=new C(T,r);E.position.set(0,.42*e,.195*t),this.torsoGroup.add(E);const M=this.trackGeo(new Ue(.018*t,.032*e,.012*t)),x=new C(M,this.makeToyMat("#e2e8f0",.22,.72));x.position.set(0,.47*e,.212*t),this.torsoGroup.add(x);const P=this.trackGeo(new Te(.032*t,.032*t,.012,12)),k=new C(P,r);k.rotation.x=Math.PI/2,k.position.set(.088*t,.44*e,.192*t),this.torsoGroup.add(k)}else if(d==="mascot_suit"){const f=this.trackGeo(new Ee(.265*t,20,16)),a=new C(f,n);a.position.y=.29*e,a.scale.set(1.06,1.12,.98),a.castShadow=!0,a.receiveShadow=!0,this.torsoGroup.add(a);const p=this.trackGeo(new Ee(.185*t,16,14)),v=new C(p,o);v.position.set(0,.26*e,.135*t),v.scale.set(.95,1.05,.68),v.castShadow=!0,this.torsoGroup.add(v);const m=this.trackGeo(new at(.145*t,.042*t,10,18)),g=new C(m,n);g.rotation.x=Math.PI/2,g.position.y=.515*e,this.torsoGroup.add(g);const S=this.makeToyMat("#e63946",.48),_=this.trackGeo(new St(.045*t,.092*t,6));for(const E of[-1,1]){const M=new C(_,S);M.position.set(E*.048*t,.49*e,.22*t),M.rotation.z=E*(Math.PI/2),M.scale.set(1,1,.45),this.torsoGroup.add(M)}const y=this.trackGeo(new Ee(.026*t,8,8)),b=new C(y,S);b.position.set(0,.49*e,.222*t),this.torsoGroup.add(b);const w=this.trackGeo(new Ee(.098*t,12,10)),T=new C(w,o);T.position.set(0,.14*e,-.275*t),T.castShadow=!0,this.torsoGroup.add(T)}else if(d==="aloha_shirt"){const f=this.trackGeo(new Te(.188*t,.225*t,.41*e,20)),a=new C(f,n);a.position.y=.32*e,a.castShadow=!0,a.receiveShadow=!0,this.torsoGroup.add(a);const p=this.trackGeo(new Te(.205*t,.218*t,.16*e,18)),v=new C(p,s);v.position.y=.08*e,v.castShadow=!0,v.receiveShadow=!0,this.torsoGroup.add(v);const m=new ki;m.moveTo(-.075*t,.15*e),m.lineTo(.075*t,.15*e),m.lineTo(0,-.02*e),m.closePath();const g=this.trackGeo(new fs(m)),S=new C(g,c);S.position.set(0,.375*e,.197*t),this.torsoGroup.add(S);const _=this.trackGeo(new Ue(.068*t,.13*e,.024*t));for(const P of[-1,1]){const k=new C(_,n);k.position.set(P*.072*t,.465*e,.194*t),k.rotation.z=P*-.42,k.rotation.y=P*.22,this.torsoGroup.add(k)}const y=this.trackGeo(new Ee(.014*t,8,8));for(let P=0;P<3;P++){const k=new C(y,r);k.position.set(0,(.31-P*.072)*e,.214*t),this.torsoGroup.add(k)}const b=this.trackGeo(new pn(.032*t,0)),w=this.trackGeo(new Ee(.013*t,6,6)),T=this.trackGeo(new Ee(.026*t,8,6)),E=this.makeToyMat("#52d17c",.6),M=this.makeToyMat("#ffe066",.45),x=[[-.65,.4,!0],[.72,.36,!0],[-.36,.22,!1],[.42,.2,!0],[-1.32,.32,!0],[1.36,.28,!1],[2.45,.38,!0],[-2.4,.26,!0],[Math.PI,.33,!1]];for(const[P,k,U]of x){const L=ht.lerp(.222,.192,(k-.14)/.36)*t,B=Math.sin(P)*L,F=Math.cos(P)*L;if(U){const G=new C(b,o);G.position.set(B,k*e,F),G.scale.set(1,.95,.55),G.rotation.y=P,this.torsoGroup.add(G);const O=new C(w,M);O.position.set(Math.sin(P)*(L+.015*t),k*e,Math.cos(P)*(L+.015*t)),this.torsoGroup.add(O)}else{const G=new C(T,E);G.position.set(B,k*e,F),G.scale.set(1.35,.65,.55),G.rotation.y=P,G.rotation.z=.4,this.torsoGroup.add(G)}}}else if(d==="swimwear"){const f=this.trackGeo(new Te(.178*t,.194*t,.31*e,18)),a=new C(f,n);a.position.y=.37*e,a.castShadow=!0,a.receiveShadow=!0,this.torsoGroup.add(a);const p=this.trackGeo(new at(.12*t,.022*t,8,18)),v=new C(p,o);v.rotation.x=Math.PI/2,v.position.y=.52*e,this.torsoGroup.add(v);const m=this.trackGeo(new at(.189*t,.018*t,8,22)),g=new C(m,o);g.rotation.x=Math.PI/2,g.position.y=.37*e,this.torsoGroup.add(g);const S=this.trackGeo(new Te(.196*t,.222*t,.22*e,18)),_=new C(S,s);_.position.y=.11*e,_.castShadow=!0,_.receiveShadow=!0,this.torsoGroup.add(_);const y=this.trackGeo(new at(.198*t,.02*t,8,20)),b=new C(y,o);b.rotation.x=Math.PI/2,b.position.y=.22*e,this.torsoGroup.add(b);const w=this.trackGeo(new Xt(.009*t,.055*e,4,6));for(const T of[-1,1]){const E=new C(w,r);E.position.set(T*.02*t,.18*e,.205*t),E.rotation.z=T*.22,this.torsoGroup.add(E)}}if(l.accessory==="bow_tie"){const f=new ye;f.position.set(0,.49*e,.195*t);const a=this.trackGeo(new St(.042*t,.085*t,6));for(const v of[-1,1]){const m=new C(a,o);m.position.x=v*.044*t,m.rotation.z=v*(Math.PI/2),m.scale.set(1,1,.45),f.add(m)}const p=this.trackGeo(new Ee(.025*t,8,8));f.add(new C(p,o)),this.torsoGroup.add(f)}l.accessory==="swim_ring"&&this.buildSwimRingProp(e,t)}buildSwimRingProp(e,t){const n=this.spec.appearance,s=document.createElement("canvas");s.width=256,s.height=64;const o=s.getContext("2d");if(o){const u=s.width/8,f=n.accentColor==="#ffffff"?"#ff6b6b":n.accentColor,a="#ffffff",p=n.outfitTopColor;for(let v=0;v<8;v++)o.fillStyle=v%2===0?a:v%4===1?f:p,o.fillRect(v*u,0,u,s.height);o.fillStyle="rgba(255, 255, 255, 0.35)",o.fillRect(0,s.height*.46,s.width,4)}const r=this.trackTex(new Mt(s));r.colorSpace=et,r.wrapS=Gt,r.wrapT=Gt;const c=this.trackMat(new lt({map:r,roughness:.24,metalness:.05})),l=this.trackGeo(new at(.285*t,.095*t,14,28)),d=new C(l,c);d.position.set(0,.2*e,.01*t),d.rotation.x=Math.PI/2+.06,d.castShadow=!0,d.receiveShadow=!0,this.torsoGroup.add(d)}buildHair(e,t,n){const s=this.headRadius,o=this.spec.appearance.hairStyle,r=new ye;r.position.y=e,this.headPivot.add(r);const c=(d=Math.PI*1.18)=>{const h=this.trackGeo(new Ee(s*1.075,22,16,0,Math.PI*2,0,Math.PI*.56)),u=new C(h,t);u.rotation.x=-.26,u.castShadow=!0,r.add(u);const f=this.trackGeo(new Ee(s*1.06,18,14,Math.PI*.5-d*.5,d,Math.PI*.25,Math.PI*.58)),a=new C(f,t);a.rotation.y=Math.PI,a.castShadow=!0,r.add(a)},l=(d,h,u=.28,f=.88,a=.64)=>{const p=this.trackGeo(new Ee(s*.27,10,8));for(let v=0;v<d;v++){const m=d===1?0:v/(d-1)*2-1,g=m*h,S=new C(p,t);S.position.set(Math.sin(g)*s*.86,s*(a-Math.abs(m)*.1),Math.cos(g)*s*f),S.scale.set(.95,.62,.55),S.rotation.x=u,S.castShadow=!0,r.add(S)}};switch(o){case"short":{c(Math.PI*1.15),l(4,.58,.24,.78,.68);const d=this.trackGeo(new Ee(s*.22,8,8));for(const h of[-1,1]){const u=new C(d,t);u.position.set(h*s*.92,.04*s,.22*s),u.scale.set(.45,1.35,.72),r.add(u)}break}case"bob":{c(Math.PI*1.28),l(5,.65);const d=this.trackGeo(new Xt(s*.26,s*.55,6,10));for(const h of[-1,1]){const u=new C(d,t);u.position.set(h*s*.95,-.18*s,-.05*s),u.rotation.z=h*-.12,u.scale.set(.75,1,1.15),u.castShadow=!0,r.add(u)}break}case"bun":{c(Math.PI*1.18),l(4,.58);const d=this.trackGeo(new Ee(s*.46,16,12)),h=new C(d,t);h.position.set(0,s*1.12,-s*.34),h.castShadow=!0,r.add(h);const u=this.trackGeo(new at(s*.34,s*.075,8,16)),f=new C(u,n);f.position.set(0,s*.94,-s*.28),f.rotation.x=Math.PI/2-.3,r.add(f);break}case"spiky":{c(Math.PI*1.12);const d=this.spec.appearance.accessory==="headband"?s*.09:0,h=this.trackGeo(new St(s*.27,s*.82,7)),u=[[0,s*1.2+d,s*.14,.3,0],[-s*.42,s*1.1+d,s*.16,.28,.5],[s*.42,s*1.1+d,s*.16,.28,-.5],[-s*.72,s*.86+d*.6,-s*.12,-.15,.85],[s*.72,s*.86+d*.6,-s*.12,-.15,-.85],[0,s*1.05,-s*.45,-.55,0],[-s*.35,s*.92,-s*.55,-.62,.42],[s*.35,s*.92,-s*.55,-.62,-.42]];for(const[f,a,p,v,m]of u){const g=new C(h,t);g.position.set(f,a,p),g.rotation.set(v,0,m),g.castShadow=!0,r.add(g)}break}case"long":{c(Math.PI*1.25),l(5,.62);const d=this.trackGeo(new Te(s*.96,s*1.12,s*1.95,16,1,!1,Math.PI*.58,Math.PI*.84)),h=new C(d,t);h.position.set(0,-s*.82,-s*.08),h.castShadow=!0,r.add(h);const u=this.trackGeo(new Xt(s*.18,s*.95,6,10));for(const f of[-1,1]){const a=new C(u,t);a.position.set(f*s*.96,-s*.48,-s*.08),a.castShadow=!0,r.add(a)}break}case"curly":{c(Math.PI*1.2);const d=this.spec.appearance.accessory==="glasses",h=this.trackGeo(new Ee(s*.34,12,10)),u=[[0,1.04,.24],[-.45,d?1:.95,.32],[.45,d?1:.95,.32],[-.86,d?.78:.65,d?.1:.18],[.86,d?.78:.65,d?.1:.18],[-.98,d?.36:.25,d?-.12:-.05],[.98,d?.36:.25,d?-.12:-.05],[-.86,-.18,-.25],[.86,-.18,-.25],[-.45,.82,-.58],[.45,.82,-.58],[0,.55,-.92],[0,0,-.95]];for(const[f,a,p]of u){const v=new C(h,t);v.position.set(f*s,a*s,p*s),v.castShadow=!0,r.add(v)}break}case"ponytail":{c(Math.PI*1.18),l(4,.62);const d=new ye;d.position.set(0,s*.65,-s*.92),r.add(d),this.ponytailPivot=d;const h=this.trackGeo(new at(s*.22,s*.07,8,14)),u=new C(h,n);u.rotation.y=Math.PI/2,d.add(u);const f=this.trackGeo(new Xt(s*.26,s*.78,8,12)),a=new C(f,t);a.position.set(0,-s*.38,-s*.28),a.rotation.x=.45,a.castShadow=!0,d.add(a);break}case"bald_sides":{const d=this.trackGeo(new Ee(s*.28,12,10)),h=[-2.55,-2.15,-1.75,1.75,2.15,2.55,Math.PI];for(const u of h){const f=new C(d,t);f.position.set(Math.sin(u)*s*.96,s*.14,Math.cos(u)*s*.96),f.scale.set(.82,.92,.82),f.castShadow=!0,r.add(f)}break}}}buildHeadAccessory(e,t,n){const s=this.spec.appearance.accessory,o=this.headRadius,r=new ye;r.position.y=e,this.headPivot.add(r);const c=new ye;switch(c.position.y=-o*.82,this.hatPivot.add(c),s){case"veil":{const l=this.makeToyMat("#ffe8a3",.24,.55),d=this.trackGeo(new at(o*.55,o*.045,8,18,Math.PI)),h=new C(d,l);h.position.set(0,o*.92,o*.16),h.rotation.x=-.35,c.add(h);const u=this.trackGeo(new ao(o*.095,0)),f=new C(u,n);f.position.set(0,o*1.24,o*.35),c.add(f);const a=new ye;a.position.set(0,o*.88,-o*.36),c.add(a),this.veilPivot=a;const p=this.trackMat(new lt({color:"#ffffff",transparent:!0,opacity:.54,roughness:.5,side:At,depthWrite:!1})),v=this.trackGeo(new Te(o*.42,o*1.45,o*2.55,18,1,!0,Math.PI*.42,Math.PI*1.16)),m=new C(v,p);m.position.set(0,-o*1.15,-o*.25),m.rotation.x=.22,a.add(m);break}case"top_hat":{const l=this.makeToyMat("#252730",.45,.08),d=new ye;d.position.set(0,o*.96,-o*.02),d.rotation.x=-.08,c.add(d);const h=this.trackGeo(new Te(o*1.15,o*1.15,.025,22)),u=new C(h,l);u.castShadow=!0,d.add(u);const f=this.trackGeo(new Te(o*.78,o*.68,o*.92,20)),a=new C(f,l);a.position.y=o*.46,a.castShadow=!0,d.add(a);const p=this.trackGeo(new Te(o*.73,o*.71,o*.16,20)),v=new C(p,t);v.position.y=o*.12,d.add(v);break}case"sunglasses":{const l=new ye;l.position.set(0,-o*.04,o*.98),r.add(l),this.sunglassesGroup=l;const d=this.makeToyMat("#1d1f2a",.26,.32),h=this.trackMat(new lt({color:"#3a4268",roughness:.16,metalness:.22,transparent:!0,opacity:.38})),u=this.trackGeo(new Te(o*.26,o*.26,.016,16)),f=this.trackGeo(new at(o*.265,.015,8,16));for(const p of[-1,1]){const v=new C(u,h);v.rotation.x=Math.PI/2,v.position.set(p*o*.31,0,0),v.scale.set(1.12,1,.85),l.add(v);const m=new C(f,d);m.position.set(p*o*.31,0,.005),m.scale.set(1.12,.85,1),l.add(m)}const a=this.trackGeo(new Ue(o*.2,.018,.016));l.add(new C(a,d));break}case"glasses":{const l=new ye;l.position.set(0,-o*.04,o*.98),r.add(l);const d=this.makeToyMat("#3a2f2a",.35,.45),h=this.trackMat(new lt({color:"#eef8ff",roughness:.1,metalness:.1,transparent:!0,opacity:.22})),u=this.trackGeo(new at(o*.23,.011,8,18)),f=this.trackGeo(new cn(o*.22,16));for(const p of[-1,1]){const v=new C(u,d);v.position.set(p*o*.29,0,0),l.add(v);const m=new C(f,h);m.position.set(p*o*.29,0,-.002),l.add(m)}const a=this.trackGeo(new Ue(o*.16,.012,.012));l.add(new C(a,d));break}case"beret":{const l=this.makeToyMat(this.spec.appearance.accentColor==="#ffffff"?"#f47292":this.spec.appearance.accentColor,.7),d=new ye;d.position.set(o*.16,o*.96,-o*.05),d.rotation.z=-.28,d.rotation.x=-.14,c.add(d);const h=this.trackGeo(new Ee(o*.88,18,12)),u=new C(h,l);u.scale.set(1.12,.38,1.08),u.castShadow=!0,d.add(u);const f=this.trackGeo(new Te(.014,.018,.06,8)),a=new C(f,l);a.position.y=o*.36,d.add(a);break}case"headband":{const l=this.spec.appearance.hairStyle==="spiky",d=l?o*1.02:o*.96,h=l?o*.082:o*.092,u=this.trackGeo(new at(d,h,10,24)),f=new C(u,t);f.position.set(0,l?o*.44:o*.56,0),f.rotation.x=Math.PI/2-(l?.14:.22),f.castShadow=!0,r.add(f);const a=this.trackGeo(new Ue(.04,.16,.015));for(const p of[-1,1]){const v=new C(a,t);v.position.set(p*.04,l?o*.26:o*.32,-o*1.07),v.rotation.z=p*.38,v.rotation.x=.25,r.add(v)}break}case"flower_crown":{const l=new ye;l.position.set(0,o*.82,0),l.rotation.x=-.18,c.add(l);const d=this.makeToyMat("#58b368",.65),h=this.trackGeo(new at(o*.82,.02,8,22)),u=new C(h,d);u.rotation.x=Math.PI/2,l.add(u);const f=["#ff85a2","#ffd166","#fff5f7","#c7a2ff","#ffad85"],a=this.trackGeo(new pn(o*.17,0)),p=this.trackGeo(new Ee(o*.075,8,8)),v=this.makeToyMat("#ffe066",.5);for(let m=0;m<8;m++){const g=m/8*Math.PI*2,S=this.makeToyMat(f[m%f.length],.55),_=new C(a,S);_.position.set(Math.sin(g)*o*.85,.02,Math.cos(g)*o*.85),_.scale.set(1,.68,1),l.add(_);const y=new C(p,v);y.position.set(Math.sin(g)*o*.85,.04,Math.cos(g)*o*.85),l.add(y)}break}case"cap":{const l=new ye;l.position.set(0,o*.42,-o*.04),l.rotation.x=-.32,c.add(l);const d=this.trackGeo(new Ee(o*1.07,18,12,0,Math.PI*2,0,Math.PI*.48)),h=new C(d,t);h.castShadow=!0,l.add(h);const u=this.trackGeo(new Te(o*.82,o*.88,.022,16,1,!1,-Math.PI*.36,Math.PI*.72)),f=new C(u,n);f.position.set(0,.01,o*.58),f.scale.set(1.05,1,1),f.castShadow=!0,l.add(f);const a=this.trackGeo(new Ee(.026,8,8)),p=new C(a,n);p.position.y=o*1.08,l.add(p);break}case"straw_hat":{const l=this.makeToyMat("#f2cf7e",.78,.02),d=this.makeToyMat("#d8ae58",.82,.02),h=this.spec.appearance.accentColor==="#ffffff"?"#ff6b6b":this.spec.appearance.accentColor,u=this.makeToyMat(h,.5),f=new ye;f.position.set(0,o*.86,-o*.08),f.rotation.x=-.18,c.add(f);const a=this.trackGeo(new Te(o*1.56,o*1.62,.026,26)),p=new C(a,l);p.castShadow=!0,p.receiveShadow=!0,f.add(p);const v=this.trackGeo(new at(o*1.58,.018,8,28)),m=new C(v,d);m.rotation.x=Math.PI/2,f.add(m);const g=this.trackGeo(new Te(o*.78,o*.94,o*.52,22)),S=new C(g,l);S.position.y=o*.26,S.castShadow=!0,f.add(S);const _=this.trackGeo(new Ee(o*.78,18,10,0,Math.PI*2,0,Math.PI*.5)),y=new C(_,l);y.position.y=o*.5,y.scale.set(1,.28,1),f.add(y);const b=this.trackGeo(new Te(o*.91,o*.95,o*.16,22)),w=new C(b,u);w.position.y=o*.1,f.add(w);const T=this.trackGeo(new Ee(o*.16,10,8));for(const E of[-1,1]){const M=new C(T,u);M.position.set(o*.94,o*.11,E*o*.14),M.scale.set(.45,.65,1.15),f.add(M)}break}case"mascot_ears":{const l=this.makeToyMat(this.spec.appearance.outfitTopColor,.74),d=this.makeToyMat(this.spec.appearance.accentColor,.68),h=this.makeToyMat(this.spec.appearance.outfitBottomColor,.62),u=new ye;u.position.set(0,o*.56,0),c.add(u);const f=this.trackGeo(new at(o*1.04,o*.075,10,22,Math.PI)),a=new C(f,h);a.position.y=-o*.08,a.castShadow=!0,u.add(a);const p=this.trackGeo(new Ee(o*.44,16,12)),v=this.trackGeo(new Ee(o*.26,12,10));for(const m of[-1,1]){const g=new ye;g.position.set(m*o*.78,o*.68,-o*.02),g.rotation.z=m*-.22,u.add(g);const S=new C(p,l);S.scale.set(1,1,.52),S.castShadow=!0,g.add(S);const _=new C(v,d);_.position.set(0,-o*.03,o*.17),_.scale.set(.92,.92,.45),g.add(_)}break}case"snorkel":{const l=t,d=this.makeToyMat("#ff595e",.38,.08),h=this.makeToyMat("#1d3557",.68),u=this.trackMat(new lt({color:"#9bf6ff",roughness:.12,metalness:.12,transparent:!0,opacity:.26})),f=new ye;f.position.set(0,o*.42,o*.94),f.rotation.x=-.32,r.add(f);const a=this.trackGeo(new at(o*.24,o*.052,10,18)),p=this.trackGeo(new cn(o*.22,16));for(const M of[-1,1]){const x=new C(a,l);x.position.set(M*o*.28,0,0),x.scale.set(1.12,.88,1),x.castShadow=!0,f.add(x);const P=new C(p,u);P.position.set(M*o*.28,0,.008),P.scale.set(1.1,.86,1),f.add(P)}const v=this.trackGeo(new Ue(o*.16,o*.08,o*.08));f.add(new C(v,l));const m=this.trackGeo(new at(o*1.05,o*.045,8,24)),g=new C(m,h);g.position.set(0,o*.24,0),g.rotation.x=Math.PI/2-.24,r.add(g);const S=new Ch([new z(o*.56,-o*.44,o*.72),new z(o*1.12,-o*.42,o*.42),new z(o*1.18,o*.06,o*.14),new z(o*1.16,o*.82,o*.02),new z(o*1.12,o*1.38,-o*.06)]),_=this.trackGeo(new ro(S,18,o*.082,10,!1)),y=new C(_,l);y.castShadow=!0,r.add(y);const b=this.trackGeo(new Te(o*.105,o*.095,o*.28,10)),w=new C(b,d);w.position.set(o*1.12,o*1.46,-o*.07),w.rotation.x=-.1,w.castShadow=!0,r.add(w);const T=this.trackGeo(new Te(o*.07,o*.07,o*.16,8)),E=new C(T,h);E.position.set(o*.54,-o*.44,o*.74),E.rotation.z=Math.PI/2,r.add(E);break}}}buildFlagProp(e,t,n){const s=new ye;s.position.set(.02,-.31*t,.04),s.rotation.set(1.05,0,-.18),e.add(s);const o=this.makeToyMat("#d6a86e",.55),r=this.trackGeo(new Te(.014,.016,.82,8)),c=new C(r,o);c.position.y=.35,c.castShadow=!0,s.add(c);const l=this.trackGeo(new Ee(.03,10,8)),d=new C(l,this.makeToyMat("#ffd166",.3,.4));d.position.y=.77,s.add(d);const h=new ye;h.position.set(0,.64,0),s.add(h),this.flagBannerPivot=h;const u=new ki;u.moveTo(0,.11),u.lineTo(.38,0),u.lineTo(0,-.11),u.closePath();const f=this.trackGeo(new fs(u)),a=this.trackMat(new lt({color:this.spec.appearance.accentColor,roughness:.55,side:At})),p=new C(f,a);p.castShadow=!0,h.add(p)}buildBouquetProp(e,t,n,s){const o=new ye;o.position.set(-.02,-.3*t,.08),o.rotation.x=-.75,e.add(o);const r=this.trackGeo(new St(.11,.24,12)),c=new C(r,n);c.rotation.x=Math.PI,c.position.y=.04,c.castShadow=!0,o.add(c);const l=this.trackGeo(new at(.052,.014,8,12)),d=new C(l,s);d.rotation.x=Math.PI/2,d.position.y=-.01,o.add(d);const h=this.makeToyMat("#65b874",.6),u=this.trackGeo(new Ee(.055,8,8)),f=this.trackGeo(new pn(.052,0)),a=["#ff8fab","#ffe5ec","#ffd6a5","#d8b4fe","#ffb3c6"];for(let v=0;v<5;v++){const m=v/5*Math.PI*2,g=new C(u,h);g.position.set(Math.cos(m)*.095,.14,Math.sin(m)*.095),g.scale.set(1,.5,1),o.add(g);const S=new C(f,this.makeToyMat(a[v],.55));S.position.set(Math.cos(m)*.065,.175+v%2*.02,Math.sin(m)*.065),S.castShadow=!0,o.add(S)}const p=new C(f,this.makeToyMat("#fff0f5",.55));p.position.set(0,.2,0),o.add(p)}buildTrophyProp(e,t){const n=new ye;n.position.set(.015,-.31*t,.045),n.rotation.set(1.08,0,-.14),e.add(n);const s=this.trackMat(new lt({color:"#ffd54f",roughness:.2,metalness:.72,emissive:"#ff9f1c",emissiveIntensity:.14})),o=this.makeToyMat("#5c3317",.48,.08),r=this.makeToyMat("#fff3b0",.25,.65),c=this.trackGeo(new Te(.068,.084,.085,14)),l=new C(c,o);l.position.y=.01,l.castShadow=!0,n.add(l);const d=this.trackGeo(new Ue(.072,.036,.018)),h=new C(d,r);h.position.set(0,.01,.072),n.add(h);const u=this.trackGeo(new Te(.024,.042,.12,12)),f=new C(u,s);f.position.y=.11,f.castShadow=!0,n.add(f);const a=this.trackGeo(new at(.038,.012,8,14)),p=new C(a,s);p.rotation.x=Math.PI/2,p.position.y=.16,n.add(p);const v=this.trackGeo(new Te(.118,.044,.19,18)),m=new C(v,s);m.position.y=.265,m.castShadow=!0,n.add(m);const g=this.trackGeo(new at(.118,.016,10,20)),S=new C(g,s);S.rotation.x=Math.PI/2,S.position.y=.36,n.add(S);const _=this.trackGeo(new at(.062,.014,8,16,Math.PI*1.15));for(const b of[-1,1]){const w=new C(_,s);w.position.set(b*.105,.27,0),w.rotation.z=b>0?-Math.PI*.56:Math.PI*.42,w.castShadow=!0,n.add(w)}const y=new C(this.shared.starGeometry,r);y.position.set(0,.275,.092),y.scale.setScalar(.72),n.add(y)}buildPomPomProp(e,t,n,s,o){const r=new ye;r.position.set(0,-.31*t-.045,.025),e.add(r);const c=this.trackGeo(new Si(.088,1)),l=new C(c,s);l.castShadow=!0,r.add(l);const d=this.trackGeo(new St(.042,.155,6)),h=[s,o,n],u=[[1,.2,.1],[-1,.2,.1],[.1,1,.2],[.1,-1,.2],[.2,.1,1],[.2,.1,-1],[.7,.7,.5],[-.7,.7,.5],[.7,-.7,.5],[-.7,-.7,.5],[.65,.55,-.65],[-.65,.55,-.65],[.65,-.55,-.65],[-.65,-.55,-.65]],f=new z(0,1,0),a=new z;return u.forEach(([p,v,m],g)=>{a.set(p,v,m).normalize();const S=new C(d,h[g%h.length]);S.position.copy(a).multiplyScalar(.082),S.quaternion.setFromUnitVectors(f,a),S.castShadow=g<6,r.add(S)}),r}setPhotoCaptureMode(e){this.isPhotoMode=e,this.updateReactionVisibility()}updateReactionVisibility(){if(!this.currentReaction||this.isPhotoMode){this.reactionSprite.visible=!1;return}this.reactionSprite.visible=!0}syncFromState(e,t,n){if(this.disposed)return;const s=n+this.phaseOffset;this.root.position.copy(e.position),this.facingGroup.rotation.y=e.facingYaw;const o=Math.max(0,e.position.y-e.groundY);this.contactShadow.position.y=e.groundY-e.position.y+.015;const r=Math.max(.45,1-o*.26);this.contactShadow.scale.set(r,r,1),this.contactShadowMat.opacity=Math.max(.18,.72-o*.28),e.expression!==this.currentExpression&&(this.currentExpression=e.expression,this.faceMaterial.map=this.faceCache.getTexture(e.expression,this.spec.appearance.skinColor,this.spec.appearance.rosyCheeks),this.faceMaterial.needsUpdate=!0);let c=0,l=0,d=0,h=.04*Math.sin(s*2.2),u=-.16,f=-.04*Math.sin(s*2.2),a=.16,p=0,v=0,m=0,g=0,S=!1,_=!1;const y=e.action;switch(y){case"idle":{c=Math.sin(s*2.5)*.012,this.holdsRightProp?(f=(this.spec.appearance.accessory==="flag"||this.spec.appearance.accessory==="trophy"?-.96:-.78)+Math.sin(s*2.4)*.08,a=.26):this.holdsPomPoms&&(h=-.65+Math.sin(s*5.2)*.18,f=-.65-Math.sin(s*5.2)*.18,u=-.45,a=.45);break}case"moving":{const N=e.walkPhase,V=Math.sin(N);c=Math.abs(Math.sin(N))*.045,h=V*.72,f=this.holdsRightProp?-.95+V*.22:-V*.72,u=-.22,a=.22,p=-V*.68,m=V*.68;break}case"shoving":{const N=Math.sin(s*16)*.22;c=-.04,h=-1.55+N,f=-1.55-N,u=-.14,a=.14,p=.35,m=-.35;break}case"hiding":{c=-.16*this.heightScale,h=-1.05,f=-1.05,u=.26,a=-.26,p=-.25,m=-.25,v=-.1,g=.1;break}case"peeking":{c=.04+Math.abs(Math.sin(s*5.2))*.03,h=-.35,u=-.38,f=-2.45+Math.sin(s*9.5)*.28,a=-.58,_=!this.holdsRightProp;break}case"tiptoe":{c=.095+Math.sin(s*8.5)*.025,h=-2.75+Math.sin(s*10)*.22,f=-2.75-Math.sin(s*10)*.22,u=.55,a=-.55,p=.14,m=.14,S=!0,_=!this.holdsRightProp;break}case"jump_charge":{const N=Math.sin(s*32)*.015;c=-.18*this.heightScale+N,h=.85,f=.85,u=-.36,a=.36,p=-.32,m=-.32;break}case"jumping":{c=.04,h=-2.78,f=-2.78,u=.62,a=-.62,p=.52,m=-.45,v=-.18,g=.18,S=!0,_=!this.holdsRightProp;break}case"posing":{const N=Math.max(.5,e.poseIntensity);c=Math.sin(s*5.2)*.026,this.poseVariant===0||this.holdsRightProp?(l=-.26*N,d=Math.sin(s*4.2)*.08,this.spec.appearance.accessory==="flag"||this.spec.appearance.accessory==="trophy"?(f=-1.32-.18*N+Math.sin(s*5.5)*.1,a=.3):(f=-2.62*N,a=-.52),h=-1.95*N,u=.38,p=-.18,m=.22,v=-.1,g=.1,S=!0,_=!this.holdsRightProp):this.poseVariant===1?(c=.045+Math.sin(s*7.5)*.02,d=.15+Math.sin(s*7.5)*.14,l=-.12*N,h=-2.28*N+Math.sin(s*8)*.14,f=-2.28*N-Math.sin(s*8)*.14,u=.62,a=-.62,p=.06,v=-.06,m=-1.16+Math.sin(s*6.5)*.12,g=.36,S=!0,_=!0):(l=-.2*N,d=-.22*N+Math.sin(s*5.5)*.07,h=-.45,u=-.62,f=-2.68*N,a=-.54+Math.sin(s*8.5)*.18,p=-.24,v=-.18,g=.12,_=!0);break}case"staggering":{const N=Math.sin(s*20);c=.02,h=-.42+N*.55,f=-.42-N*.55,u=-1.15-N*.35,a=1.15+N*.35,p=N*.55,m=-N*.55;break}case"fallen":{const N=Math.hypot(e.tiltX,e.tiltZ);c=.2*this.heightScale,N<.85&&(l=-1.42,d=Math.sin(this.phaseOffset)*.25);const V=Math.sin(s*14);h=-.45,f=-.45,u=-1.15-V*.15,a=1.15+V*.15,p=-.55+V*.38,m=-.55-V*.38,v=-.22,g=.22;break}case"getting_up":{const N=Math.sin(s*9)*.12;c=-.08*this.heightScale,l=.35,h=-1.1+N,f=-1.1-N,u=-.38,a=.38,p=-.45,m=.25;break}case"helping":{c=-.05,l=.32,h=-1.42+Math.sin(s*8)*.14,f=-1.42-Math.sin(s*8)*.14,u=.12,a=-.12,p=.25,m=-.25;break}case"riding_shoulders":{c=Math.sin(s*5)*.025,h=-2.65+Math.sin(s*8.5)*.26,f=-2.65-Math.sin(s*8.5)*.26,u=.58,a=-.58,p=-.82,m=-.82,v=-.48,g=.48,S=!0,_=!this.holdsRightProp;break}case"carrying_rider":{c=-.03+Math.sin(s*9.5)*.015,h=-2.35,f=-2.35,u=.26,a=-.26,v=-.16,g=.16;break}}let b=0,w=0;const T=y!=="fallen"&&y!=="staggering";if(e.expression==="hen_gao"&&T){const N=this.poseVariant===1?-1:1;b+=N*.28+Math.sin(s*7.5)*.14,w-=.08,(y==="idle"||y==="moving")&&(d+=N*.16+Math.sin(s*6.8)*.09,l-=.14,y==="idle"&&(m=-.92,g=.3,h=-2.2,u=.55,S=!0))}else y==="posing"&&(b+=(this.poseVariant===1?-.22:.2)+Math.sin(s*5.2)*.08);if(e.lensBombProgress>.35&&T){const N=ht.clamp((e.lensBombProgress-.35)/.65,0,1),V=Math.sin(s*14)*.14;l=.24+.24*N,h=-2.18+V,f=-2.18-V,u=.32,a=-.32,S=!0,_=!0,w-=.16+.14*N}const E=Math.max(0,e.sneezeCharge||0);E>0&&T&&(h=ht.lerp(h,-.75,E*.7),f=ht.lerp(f,-.75,E*.7),u=ht.lerp(u,-.42,E*.7),a=ht.lerp(a,.42,E*.7)),e.expression==="cheese"&&e.poseIntensity>.35&&y!=="fallen"&&y!=="staggering"&&y!=="hiding"&&(this.holdsRightProp||(f=Math.min(f,-2.25),a=Math.min(a,-.45),_=!0)),this.wearsSwimRing&&T&&(Math.abs(h)<1.35&&(u=Math.min(u,-.44)),Math.abs(f)<1.35&&(a=Math.max(a,.44)));const M=13;this.animBodyY=dn(this.animBodyY,c,M,t),this.animFallX=dn(this.animFallX,l,10,t),this.animFallZ=dn(this.animFallZ,d,10,t),this.animLArmX=dn(this.animLArmX,h,M,t),this.animLArmZ=dn(this.animLArmZ,u,M,t),this.animRArmX=dn(this.animRArmX,f,M,t),this.animRArmZ=dn(this.animRArmZ,a,M,t),this.animLLegX=dn(this.animLLegX,p,M,t),this.animLLegZ=dn(this.animLLegZ,v,M,t),this.animRLegX=dn(this.animRLegX,m,M,t),this.animRLegZ=dn(this.animRLegZ,g,M,t);const x=E>0?Math.sin(n*52)*.05*E:0,P=y==="carrying_rider"?Math.sin(n*9.5)*.11:0,k=ht.clamp((e.squashY||1)+E*.13,.62,1.5),U=1/Math.sqrt(k)*(1+E*.09);this.bodyPivot.scale.set(U,k,U),this.bodyPivot.position.set(x,this.animBodyY,0),this.bodyPivot.rotation.set(e.tiltX+this.animFallX,0,e.tiltZ+this.animFallZ+P),this.leftArmPivot.rotation.set(this.animLArmX,0,this.animLArmZ),this.rightArmPivot.rotation.set(this.animRArmX,0,this.animRArmZ),this.leftLegPivot.rotation.set(this.animLLegX,0,this.animLLegZ),this.rightLegPivot.rotation.set(this.animRLegX,0,this.animRLegZ),this.leftPeaceSign.visible=S&&!this.holdsPomPoms,this.rightPeaceSign.visible=_&&!this.holdsPomPoms;const L=E>0?-.38*E:0,B=E>0?Math.cos(n*61)*.04*E:0,F=x*1.4;if(this.headPivot.rotation.set(-e.headPitchOffset+w+L,e.headYawOffset+B,b+F),e.hatPopHeight>.001?(this.hatPivot.position.set(0,e.hatPopHeight,0),this.hatPivot.rotation.set(e.hatSpin*.65,e.hatSpin,e.hatSpin*.45)):(this.hatPivot.position.set(0,0,0),this.hatPivot.rotation.set(0,0,0)),this.ponytailPivot&&(this.ponytailPivot.rotation.z=Math.sin(s*4.5+e.walkPhase)*.14,this.ponytailPivot.rotation.x=Math.min(.4,Math.abs(e.velocity.length())*.12)),this.veilPivot&&(this.veilPivot.rotation.x=.06+Math.sin(s*2.1)*.07,this.veilPivot.rotation.z=Math.cos(s*1.7)*.05),this.flagBannerPivot&&(this.flagBannerPivot.rotation.y=Math.sin(s*7.5)*.34),this.leftPomPom&&this.rightPomPom){const N=y==="jumping"||y==="posing"||y==="tiptoe"||e.expression==="cheese"?1:.38,V=N>.5?24:9,$=Math.sin(s*V)*.48*N,he=1+Math.sin(s*V*.5)*.12*N;this.leftPomPom.rotation.set($,s*4.5*N,-$*.8),this.rightPomPom.rotation.set(-$,-s*4.5*N,$*.8),this.leftPomPom.scale.setScalar(he),this.rightPomPom.scale.setScalar(he)}if(this.sunglassesGroup){const N=e.expression==="surprised"||e.expression==="hen_gao"||e.action==="staggering"||e.action==="fallen"?1:e.expression==="cheese"||e.action==="posing"?.55:0;this.animSunglassesRaise=dn(this.animSunglassesRaise,N,14,t);const V=this.headRadius;this.sunglassesGroup.position.y=-V*.04+this.animSunglassesRaise*V*.42,this.sunglassesGroup.rotation.x=-this.animSunglassesRaise*.42}const G=e.action==="fallen"||e.expression==="dizzy";if(this.dizzyStarsGroup.visible=G,G){this.dizzyStarsGroup.rotation.y=n*4.4+this.phaseOffset,this.dizzyStarsGroup.rotation.z=Math.sin(n*3.2)*.18;for(let N=0;N<this.dizzyStars.length;N++)this.dizzyStars[N].rotation.y=n*5+N*2,this.dizzyStars[N].position.y=Math.sin(n*6+N*2.1)*.04}const O=e.reactionTimer>0?e.reactionIcon:"";if(O!==this.currentReaction&&(this.currentReaction=O,this.reactionPopAge=0,O&&(this.reactionSpriteMat.map=c1(this.shared,O),this.reactionSpriteMat.needsUpdate=!0),this.updateReactionVisibility()),this.reactionSprite.visible){this.reactionPopAge+=t;const N=this.reactionPopAge<.25?1+Math.sin(this.reactionPopAge/.25*Math.PI)*.35:1+Math.sin(n*6+this.phaseOffset)*.05,V=.3;this.reactionSprite.scale.set(V*N,V*N,1);const $=e.action==="fallen"?.72*this.heightScale:.93*this.heightScale+this.headRadius*1.96+.38;this.reactionSprite.position.y=$+Math.sin(n*5+this.phaseOffset)*.04}}syncHeadTransformToState(e){this.root.updateMatrixWorld(!0),this.headMesh.getWorldPosition(e.headWorldPos),this.headPivot.getWorldQuaternion(this.tmpHeadQuat),e.headForward.set(0,0,1).applyQuaternion(this.tmpHeadQuat).normalize(),e.headRadius=this.headRadius}dispose(){if(!this.disposed){this.disposed=!0;for(const e of this.ownedGeometries)e.dispose();this.ownedGeometries.length=0;for(const e of this.ownedMaterials)e.dispose();this.ownedMaterials.length=0;for(const e of this.ownedTextures)e.dispose();this.ownedTextures.length=0,r1()}}}class h1{geometries=[];materials=[];textures=[];disposed=!1;geo(e){return this.geometries.push(e),e}mat(e){return this.materials.push(e),e}tex(e){return this.textures.push(e),e}stdMat(e,t=.72,n=.04,s){return this.mat(new lt({color:e,roughness:t,metalness:n,...s}))}disposeAll(){if(!this.disposed){this.disposed=!0;for(const e of this.geometries)e.dispose();for(const e of this.materials)e.dispose();for(const e of this.textures)e.dispose();this.geometries.length=0,this.materials.length=0,this.textures.length=0}}}function d1(i){const t=document.createElement("canvas");t.width=512,t.height=512;const n=t.getContext("2d");if(n){for(let d=0;d<8;d++)n.fillStyle=d%2===0?"#7ed162":"#71c456",n.fillRect(d*64,0,64,512);let c=1337;const l=()=>(c=c*16807%2147483647,(c-1)/2147483646);for(let d=0;d<650;d++){const h=l()*512,u=l()*512;n.fillStyle=l()>.5?"rgba(164, 232, 114, 0.38)":"rgba(84, 158, 62, 0.25)",n.beginPath(),n.ellipse(h,u,2.5+l()*3.5,1.2+l()*1.8,l()*Math.PI,0,Math.PI*2),n.fill()}for(let d=0;d<36;d++){const h=l()*512,u=l()*512;n.fillStyle="rgba(255, 253, 245, 0.85)",n.beginPath(),n.arc(h,u,2.6,0,Math.PI*2),n.fill(),n.fillStyle="#ffd166",n.beginPath(),n.arc(h,u,1.2,0,Math.PI*2),n.fill()}}const s=i.tex(new Mt(t));return s.colorSpace=et,s.wrapS=Gt,s.wrapT=Gt,s.repeat.set(6,6),s.anisotropy=4,s}function u1(i,e="#fcf8f2"){const n=document.createElement("canvas");n.width=256,n.height=256;const s=n.getContext("2d");if(s){s.fillStyle=e,s.fillRect(0,0,256,256);const r=6,c=256/r;for(let l=0;l<r;l++)s.fillStyle=l%2===0?"rgba(210, 195, 178, 0.14)":"rgba(255, 255, 255, 0.22)",s.fillRect(0,l*c,256,c),s.fillStyle="rgba(175, 158, 142, 0.42)",s.fillRect(0,l*c,256,2)}const o=i.tex(new Mt(n));return o.colorSpace=et,o.wrapS=Gt,o.wrapT=Gt,o.repeat.set(3,1),o}function f1(i){const t=document.createElement("canvas");t.width=512,t.height=512;const n=t.getContext("2d");if(n){n.fillStyle="#e5dac6",n.fillRect(0,0,512,512),n.strokeStyle="rgba(202, 188, 164, 0.35)",n.lineWidth=3;for(let c=8;c<512;c+=16)n.beginPath(),n.moveTo(0,c),n.lineTo(512,c),n.stroke();let o=4242;const r=()=>(o=o*16807%2147483647,(o-1)/2147483646);for(let c=0;c<1200;c++){const l=r()*512,d=r()*512,h=1+r()*2.2;n.fillStyle=r()>.55?"rgba(255, 250, 240, 0.55)":"rgba(166, 150, 128, 0.35)",n.beginPath(),n.arc(l,d,h,0,Math.PI*2),n.fill()}}const s=i.tex(new Mt(t));return s.colorSpace=et,s.wrapS=Gt,s.wrapT=Gt,s.repeat.set(7,7),s.anisotropy=4,s}function p1(i){const t=document.createElement("canvas");t.width=512,t.height=512;const n=t.getContext("2d");if(n){n.fillStyle="#d3cec4",n.fillRect(0,0,512,512);const o=4,r=2,c=512/o,l=512/r;for(let u=0;u<r;u++){const f=u%2===0?0:c*.5;for(let a=-1;a<=o;a++){const p=(u*7+a*13)%3===0?"#cbc6bc":"#d8d3c9";n.fillStyle=p,n.fillRect(a*c+f+3,u*l+3,c-6,l-6)}}let d=8891;const h=()=>(d=d*16807%2147483647,(d-1)/2147483646);for(let u=0;u<900;u++){const f=h()*512,a=h()*512;n.fillStyle=h()>.5?"rgba(255,255,255,0.28)":"rgba(105,100,94,0.25)",n.fillRect(f,a,2.5,2.5)}n.fillStyle="rgba(118, 166, 92, 0.16)";for(let u=0;u<18;u++)n.beginPath(),n.arc(h()*512,h()*512,8+h()*14,0,Math.PI*2),n.fill()}const s=i.tex(new Mt(t));return s.colorSpace=et,s.wrapS=Gt,s.wrapT=Gt,s.repeat.set(2,1),s.anisotropy=4,s}function Nh(i,e,t,n){if(i.save(),i.textAlign="center",i.textBaseline="middle",n==="wedding"){const s=i.createRadialGradient(e*.5,t*.5,e*.04,e*.5,t*.5,e*.36);s.addColorStop(0,"rgba(255, 251, 245, 0.88)"),s.addColorStop(.75,"rgba(255, 250, 242, 0.52)"),s.addColorStop(1,"rgba(255, 250, 242, 0)"),i.fillStyle=s,i.fillRect(0,0,e,t),i.shadowColor="rgba(255, 250, 244, 0.9)",i.shadowBlur=6,i.fillStyle="#c48636",i.font='italic 700 50px "Georgia", "Times New Roman", serif',i.fillText("Happy Wedding",e*.5,t*.41),i.strokeStyle="#e58aa0",i.lineWidth=3,i.beginPath(),i.moveTo(e*.28,t*.51),i.lineTo(e*.44,t*.51),i.moveTo(e*.56,t*.51),i.lineTo(e*.72,t*.51),i.stroke(),i.fillStyle="#e87a96",i.font="bold 26px system-ui, sans-serif",i.fillText("♥",e*.5,t*.512),i.fillStyle="#b95370",i.font='700 44px "Hiragino Mincho ProN", "Yu Mincho", "Hiragino Maru Gothic ProN", serif',i.fillText("記念撮影",e*.5,t*.63)}else if(n==="school_trip"){const s=i.createRadialGradient(e*.5,t*.5,e*.05,e*.5,t*.5,e*.38);s.addColorStop(0,"rgba(255, 249, 236, 0.9)"),s.addColorStop(.76,"rgba(255, 248, 234, 0.56)"),s.addColorStop(1,"rgba(255, 248, 234, 0)"),i.fillStyle=s,i.fillRect(0,0,e,t),i.strokeStyle="#c93326",i.lineWidth=4,i.beginPath(),i.moveTo(e*.24,t*.32),i.lineTo(e*.76,t*.32),i.moveTo(e*.24,t*.69),i.lineTo(e*.76,t*.69),i.stroke(),i.shadowColor="rgba(255, 250, 240, 0.85)",i.shadowBlur=5,i.fillStyle="#2a1d17",i.font='900 50px "Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif',i.fillText("祝・修学旅行",e*.5,t*.44),i.fillStyle="#c93326",i.font='700 36px "Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif',i.fillText("3年2組 記念写真",e*.5,t*.59),i.shadowBlur=0,i.fillStyle="#d13426",i.fillRect(e*.76,t*.54,34,34),i.strokeStyle="#fff8ec",i.lineWidth=2,i.strokeRect(e*.76+3,t*.54+3,28,28),i.fillStyle="#fff8ec",i.font="bold 18px serif",i.fillText("古",e*.76+17,t*.54+18)}else if(n==="sports_day"){const s=i.createRadialGradient(e*.5,t*.5,e*.06,e*.5,t*.5,e*.42);s.addColorStop(0,"rgba(255, 253, 244, 0.93)"),s.addColorStop(.75,"rgba(255, 250, 236, 0.64)"),s.addColorStop(1,"rgba(255, 250, 236, 0)"),i.fillStyle=s,i.fillRect(0,0,e,t),i.strokeStyle="#d62828",i.lineWidth=5,i.beginPath(),i.moveTo(e*.16,t*.31),i.lineTo(e*.84,t*.31),i.moveTo(e*.16,t*.69),i.lineTo(e*.84,t*.69),i.stroke(),i.strokeStyle="#f4b400",i.lineWidth=3,i.beginPath(),i.moveTo(e*.22,t*.335),i.lineTo(e*.78,t*.335),i.moveTo(e*.22,t*.665),i.lineTo(e*.78,t*.665),i.stroke(),i.shadowColor="rgba(255, 255, 255, 0.92)",i.shadowBlur=6,i.fillStyle="#1b263b",i.font='900 40px "Hiragino Kaku Gothic ProN", "Hiragino Maru Gothic ProN", "Noto Sans JP", sans-serif',i.fillText("第32回 社内大運動会",e*.5,t*.44),i.fillStyle="#d62828",i.font='900 42px "Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif',i.fillText("優勝記念撮影",e*.5,t*.58)}else{const s=i.createRadialGradient(e*.5,t*.5,e*.06,e*.5,t*.5,e*.42);s.addColorStop(0,"rgba(255, 252, 240, 0.92)"),s.addColorStop(.75,"rgba(255, 250, 236, 0.6)"),s.addColorStop(1,"rgba(255, 250, 236, 0)"),i.fillStyle=s,i.fillRect(0,0,e,t),i.strokeStyle="#00b4d8",i.lineWidth=5,i.beginPath();for(let o=e*.2;o<=e*.8;o+=6){const r=t*.525+Math.sin(o/e*Math.PI*10)*6;o===e*.2?i.moveTo(o,r):i.lineTo(o,r)}i.stroke(),i.shadowColor="rgba(255, 255, 255, 0.92)",i.shadowBlur=6,i.fillStyle="#0077b6",i.font='900 42px "Hiragino Maru Gothic ProN", "Rounded Mplus 1c", "Noto Sans JP", sans-serif',i.fillText("南国サマーバカンス",e*.5,t*.42),i.fillStyle="#ff595e",i.font='900 44px "Hiragino Maru Gothic ProN", "Rounded Mplus 1c", "Noto Sans JP", sans-serif',i.fillText("記念撮影",e*.5,t*.63)}i.restore()}function m1(i,e,t){const n=document.createElement("canvas");n.width=512,n.height=512;const s=n.getContext("2d");s&&(s.fillStyle="#fff9f0",s.fillRect(0,0,512,512),s.strokeStyle=e,s.lineWidth=14,s.strokeRect(22,22,468,468),Nh(s,512,512,t));const o=i.tex(new Mt(n));return o.colorSpace=et,o}function g1(i){const e=document.createElement("canvas");e.width=128,e.height=256;const t=e.getContext("2d");t&&(t.fillStyle="#1b1d24",t.fillRect(0,0,128,256),t.strokeStyle="#f5ca47",t.lineWidth=8,t.strokeRect(8,8,112,240),t.lineWidth=2,t.strokeRect(18,18,92,220),t.fillStyle="#ffe066",t.textAlign="center",t.textBaseline="middle",t.font='900 44px "Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif',["古","都","神","社"].forEach((o,r)=>{t.fillText(o,64,54+r*49)}));const n=i.tex(new Mt(e));return n.colorSpace=et,n.anisotropy=4,n}function v1(i,e,t,n){const s=i.geo(new Ee(68,32,20)),o=i.mat(new Nn({side:Kt,depthWrite:!1,uniforms:{uZenith:{value:new Ye(e)},uMid:{value:new Ye(t)},uHorizon:{value:new Ye(n)},uSunDir:{value:new z(.45,.65,.55).normalize()}},vertexShader:`
        varying vec3 vWorldDir;
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorldDir = normalize(position);
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,fragmentShader:`
        uniform vec3 uZenith;
        uniform vec3 uMid;
        uniform vec3 uHorizon;
        uniform vec3 uSunDir;
        varying vec3 vWorldDir;
        void main() {
          vec3 d = normalize(vWorldDir);
          float h = clamp(d.y, 0.0, 1.0);
          vec3 col = mix(uHorizon, uMid, smoothstep(0.0, 0.34, h));
          col = mix(col, uZenith, smoothstep(0.30, 0.88, h));
          float sunAmt = max(dot(d, uSunDir), 0.0);
          col += vec3(1.0, 0.96, 0.84) * pow(sunAmt, 14.0) * 0.28;
          gl_FragColor = vec4(col, 1.0);
        }
      `}));return new C(s,o)}function y1(i,e,t){const n=i.stdMat("#ffffff",.92,0,{emissive:"#fff4e6",emissiveIntensity:.22}),s=i.geo(new Ee(1,14,10));[{x:-16,y:12.5,z:-26,s:1.5,speed:.32},{x:-5,y:14.2,z:-30,s:1.9,speed:.24},{x:9,y:11.8,z:-24,s:1.45,speed:.38},{x:21,y:15,z:-32,s:2.1,speed:.21},{x:-24,y:10.5,z:-20,s:1.25,speed:.42},{x:2,y:10.8,z:-22,s:1.35,speed:.35}].forEach((r,c)=>{const l=new ye;l.position.set(r.x,r.y,r.z);const d=[[0,.25,0,1.25],[-1.1,-.05,.1,.95],[1.15,-.05,-.05,1],[-.55,.45,-.25,.85],[.6,.38,.2,.88]];for(const[h,u,f,a]of d){const p=new C(s,n);p.position.set(h*r.s,u*r.s,f*r.s),p.scale.set(a*r.s*1.15,a*r.s*.72,a*r.s*.85),l.add(p)}e.add(l),t.push({group:l,speed:r.speed,minX:-32,maxX:32,baseY:r.y,bobPhase:c*1.3})})}function _1(i,e){const t=e==="wedding"?"#d6e8a8":e==="school_trip"?"#edd5be":e==="sports_day"?"#b8e49a":"#ffe6b0",n=e==="tropical_beach"?"#d4f7ff":"#c8ecff",s=new qg(n,t,e==="tropical_beach"?1.04:.96);i.add(s);const o=e==="tropical_beach"?1.86:e==="sports_day"?1.82:1.78,r=new Ml("#fff5de",o);r.position.set(6.5,11.5,8.2),r.castShadow=!0;const c=typeof window<"u"&&window.innerWidth<800?1024:2048;r.shadow.mapSize.set(c,c),r.shadow.camera.left=-7.5,r.shadow.camera.right=7.5,r.shadow.camera.top=7.5,r.shadow.camera.bottom=-7.5,r.shadow.camera.near=1,r.shadow.camera.far=30,r.shadow.bias=-5e-4,r.shadow.normalBias=.024,i.add(r);const l=e==="school_trip"?"#ffdbe8":e==="tropical_beach"?"#9cf3ff":"#d9f2ff",d=new Ml(l,.5);d.position.set(-6.5,5.2,-5.5),i.add(d)}function S1(i,e,t){const n=i.geo(new Ee(1,18,12,0,Math.PI*2,0,Math.PI*.52)),s=i.stdMat(t?"#89cf72":"#7cb06f",.9,0),o=i.stdMat(t?"#a9d89c":"#9cc29a",.92,0),r=i.stdMat(t?"#68ba64":"#73a86b",.86,0),c=i.stdMat(t?"#ffd2df":"#ffc2d9",.78,0),l=i.geo(new Si(1.5,1)),d=14;for(let f=0;f<d;f++){const a=f/d*Math.PI*2+.15,p=25+f%3*3.5,v=new C(n,s);v.position.set(Math.sin(a)*p,-.5,Math.cos(a)*p-2),v.scale.set(9.5+f%3*2.5,2.8+f%4*.75,8.5+f%2*2),e.add(v)}const h=12;for(let f=0;f<h;f++){const a=f/h*Math.PI*2,p=36+f%2*4,v=new C(n,o);v.position.set(Math.sin(a)*p,-.6,Math.cos(a)*p-4),v.scale.set(13.5+f%3*3,4.8+f%3*1.4,11),e.add(v)}const u=28;for(let f=0;f<u;f++){const a=f/(u-1),p=ht.lerp(-Math.PI*.82,Math.PI*.82,a),v=17.5+f%4*2.4,m=f%5===0?c:r,g=new C(l,m),S=.95+f%3*.35;g.position.set(Math.sin(p)*v,1.15*S,-2.5-Math.cos(p)*v),g.scale.set(1.15*S,1.05*S,1*S),e.add(g)}}function x1(i,e){const t=i.geo(new Si(.13,1)),n=i.geo(new ao(.085,0)),s=[],o=56;for(let l=0;l<o;l++){const d=l%4===0,h=i.stdMat(d?"#ffe066":"#fffbf2",.75,0,{transparent:!0,opacity:.9,emissive:d?"#ffb703":"#fff5e4",emissiveIntensity:d?.35:.12}),u=new C(d?n:t,h);u.visible=!1,e.add(u),s.push({mesh:u,mat:h,velocity:new z,age:0,maxAge:.6,baseScale:d?.85:1,spinSpeed:(l%2===0?1:-1)*4.5,active:!1})}let r=0;return{particles:s,spawn:(l,d=7)=>{const h=Math.min(d,16);for(let u=0;u<h;u++){const f=s[r];r=(r+1)%s.length;const a=u/h*Math.PI*2+(Math.random()-.5)*.5,p=.8+Math.random()*1.35;f.mesh.position.set(l.x+(Math.random()-.5)*.24,l.y+.08+Math.random()*.16,l.z+(Math.random()-.5)*.24),f.velocity.set(Math.cos(a)*p,1.15+Math.random()*1.25,Math.sin(a)*p),f.age=0,f.maxAge=.45+Math.random()*.3,f.baseScale=.65+Math.random()*.7,f.active=!0,f.mesh.visible=!0,f.mesh.scale.setScalar(.1),f.mat.opacity=.92}}}}function ra(i,e,t,n){const s=new ye,o=n==="school_trip",r=n==="school_trip"?"#7c4d2f":n==="tropical_beach"?"#d8b482":n==="sports_day"?"#c4834b":"#c8925a",c=n==="school_trip"?"#5c361e":n==="tropical_beach"?"#b8905c":"#a06a3a",l=i.stdMat(r,.68),d=i.stdMat(c,.72),h=i.geo(new Te(.032,.038,1.85,8)),u=new C(h,l);u.position.set(-.34,.88,.04),u.rotation.set(-.14,0,-.15),u.castShadow=!0,s.add(u);const f=new C(h,l);f.position.set(.34,.88,.04),f.rotation.set(-.14,0,.15),f.castShadow=!0,s.add(f);const a=new C(h,d);a.position.set(0,.86,-.34),a.rotation.set(.36,0,0),a.castShadow=!0,s.add(a);const p=i.geo(new Ue(1.18,.06,.14)),v=new C(p,d);v.position.set(0,.72,.12),v.rotation.x=-.14,v.castShadow=!0,s.add(v);const m=new ye;m.position.set(0,1.18,.04),m.rotation.x=-.14,s.add(m);const g=i.geo(new Ue(1.12,.86,.06)),S=n==="school_trip"?d:n==="sports_day"?i.stdMat("#e63946",.5):n==="tropical_beach"?i.stdMat("#f6e4c4",.62):i.stdMat("#fffbf5",.58),_=new C(g,S);_.castShadow=!0,_.receiveShadow=!0,m.add(_);const y=m1(i,t,n),b=i.mat(new lt({map:y,roughness:.55,metalness:0})),w=i.geo(new Jt(.98,.72)),T=new C(w,b);if(T.position.z=.034,m.add(T),new Xg().load(e,M=>{if(i.disposed){M.dispose();return}const x=document.createElement("canvas");x.width=512,x.height=512;const P=x.getContext("2d");P&&M.image&&(P.drawImage(M.image,0,0,512,512),Nh(P,512,512,n)),M.dispose();const k=i.tex(new Mt(x));k.colorSpace=et,k.anisotropy=4,b.map=k,b.needsUpdate=!0},void 0,()=>{}),o){const M=i.geo(new Ue(1.32,.07,.34)),x=new C(M,i.stdMat("#3b3e47",.75));x.position.set(0,.48,.03),x.rotation.x=.2,x.castShadow=!0,m.add(x)}else if(n==="sports_day"){const M=i.geo(new St(.06,.13,3)),x=["#e63946","#ffffff","#ffd166","#3a86ff","#e63946","#ffffff","#ffd166"];for(let P=0;P<x.length;P++){const k=P/(x.length-1),U=ht.lerp(-.48,.48,k),L=Math.sin(k*Math.PI)*.035,B=new C(M,i.stdMat(x[P],.48));B.position.set(U,.47-L,.045),B.rotation.z=Math.PI,m.add(B)}}else if(n==="tropical_beach"){const M=i.geo(new Ee(.08,8,8)),x=i.stdMat("#38b000",.62),P=i.geo(new pn(.082,0)),k=["#ff595e","#ffca3a","#00bbf9","#ff595e","#ffca3a"];for(let U=0;U<5;U++){const L=U/4,B=ht.lerp(-.42,.42,L),F=Math.sin(L*Math.PI)*.04,G=new C(M,x);G.position.set(B,.44+F,.04),G.scale.set(1.4,.48,.55),m.add(G);const O=new C(P,i.stdMat(k[U],.48));O.position.set(B,.47+F,.064),m.add(O)}}else{const M=i.geo(new pn(.078,0)),x=i.geo(new Ee(.075,8,8)),P=i.stdMat("#67bc70",.65),k=["#ff8fab","#ffe0b5","#fff0f5","#ffb3c6","#fff0f5","#ffe0b5","#ff8fab"],U=7;for(let L=0;L<U;L++){const B=L/(U-1),F=ht.lerp(-.46,.46,B),G=Math.sin(B*Math.PI)*.035,O=new C(x,P);O.position.set(F,.44+G,.04),O.scale.set(1.2,.55,.6),m.add(O);const N=new C(M,i.stdMat(k[L],.55));N.position.set(F,.465+G,.062),m.add(N)}}return s}function ca(i,e,t,n,s){const o=i.geo(new cn(.055,6)),r=n.map(c=>i.stdMat(c,.5,0,{side:At,emissive:c,emissiveIntensity:.15}));for(let c=0;c<s;c++){const l=new C(o,r[c%r.length]);l.scale.set(1.15,.72,1);const d=-6.5,h=6.5,u=-4.2,f=3.2,a=5.4;l.position.set(d+Math.random()*(h-d),.5+Math.random()*a,u+Math.random()*(f-u)),l.rotation.set(Math.random()*6,Math.random()*6,Math.random()*6),e.add(l),t.push({mesh:l,speedY:.28+Math.random()*.34,driftX:.22+Math.random()*.26,driftZ:(Math.random()-.5)*.18,swayPhase:Math.random()*Math.PI*2,swayAmp:.35+Math.random()*.35,spinX:(Math.random()-.5)*2.2,spinY:(Math.random()-.5)*2.4,spinZ:(Math.random()-.5)*2,minX:d,maxX:h,minZ:u,maxZ:f,maxY:a})}}function M1(i,e,t,n,s){const o=d1(e),r=e.mat(new lt({map:o,roughness:.85,metalness:0})),c=e.geo(new cn(38,48)),l=new C(c,r);l.rotation.x=-Math.PI/2,l.receiveShadow=!0,t.add(l);const d=e.stdMat("#f6efe2",.82),h=e.geo(new Te(.45,.48,.03,12)),u=[[-1.4,1.35,1.2,.8],[-.1,1.55,1.35,.88],[1.3,1.38,1.2,.82],[-.75,2.5,1.15,.78],[.65,2.65,1.25,.82],[0,3.7,1.4,.9]];for(const[g,S,_,y]of u){const b=new C(h,d);b.position.set(g,.008,S),b.scale.set(_,1,y),b.receiveShadow=!0,t.add(b)}const f=u1(e,"#fffdf9"),a=e.mat(new lt({map:f,roughness:.62,metalness:.02})),p=e.stdMat("#fcfaf5",.62),v=e.stdMat("#efe7dc",.66);for(const g of i.platforms)b1(g,e,t,a,p,v);w1(e,t);const m=ra(e,"./assets/wedding-board.jpg","#f2849e","wedding");m.position.set(3.95,0,-.35),m.rotation.y=-.44,t.add(m),T1(e,t,p),E1(e,t),A1(e,t,p,s),ca(e,t,n,["#ffb3c6","#ffe5ec","#ffd6a5","#fff5f7"],38)}function b1(i,e,t,n,s,o){const r=i.maxX-i.minX,c=i.maxZ-i.minZ,l=(i.minX+i.maxX)*.5,d=(i.minZ+i.maxZ)*.5,h=.07,u=i.height-h,f=new ye;f.position.set(l,0,d),t.add(f);const a=e.geo(new Ue(r-.1,u,c-.08)),p=new C(a,o);p.position.y=u*.5,p.castShadow=!0,p.receiveShadow=!0,f.add(p);const v=e.geo(new Ue(r,h,c)),m=new C(v,n);m.position.y=i.height-h*.5,m.castShadow=!0,m.receiveShadow=!0,f.add(m);const g=e.geo(new Te(.032,.032,r,10)),S=new C(g,s);S.rotation.z=Math.PI/2,S.position.set(0,i.height-.032,c*.5),S.castShadow=!0,f.add(S);const _=e.geo(new Ue(.08,u,.06)),y=6;for(let T=0;T<y;T++){const E=-r*.46+T/(y-1)*r*.92,M=new C(_,s);M.position.set(E,u*.5,c*.5-.03),M.castShadow=!0,f.add(M)}const b=e.geo(new Ue(r+.04,.06,c+.04)),w=new C(b,s);w.position.y=.03,w.receiveShadow=!0,f.add(w)}function w1(i,e){const t=new ye;t.position.set(0,0,-2.65),e.add(t);const n=i.stdMat("#ffffff",.55),s=i.stdMat("#f7f0e6",.6),o=2.65,r=2.55,c=i.geo(new Ue(.46,.34,.46)),l=i.geo(new Te(.14,.16,r,16)),d=i.geo(new Ue(.42,.14,.42));for(const y of[-1,1]){const b=new C(c,s);b.position.set(y*o,.17,0),b.castShadow=!0,b.receiveShadow=!0,t.add(b);const w=new C(l,n);w.position.set(y*o,.34+r*.5,0),w.castShadow=!0,w.receiveShadow=!0,t.add(w);const T=new C(d,s);T.position.set(y*o,.34+r,0),T.castShadow=!0,t.add(T)}const h=i.geo(new at(o,.14,12,36,Math.PI)),u=new C(h,n);u.position.y=.34+r,u.scale.set(1,.72,1),u.castShadow=!0,t.add(u);const f=i.geo(new at(o-.28,.06,10,32,Math.PI)),a=new C(f,s);a.position.y=.34+r,a.scale.set(1,.7,1),t.add(a);const p=[i.stdMat("#52ad63",.68),i.stdMat("#6ec473",.65),i.stdMat("#3f9152",.72)],v=[i.stdMat("#ff8fab",.52),i.stdMat("#ffb3c6",.52),i.stdMat("#ffd6a5",.52),i.stdMat("#fff4f6",.52),i.stdMat("#f76e92",.52)],m=i.geo(new pn(.24,1)),g=i.geo(new pn(.15,0)),S=.34+r,_=26;for(let y=0;y<=_;y++){const b=y/_,w=b*Math.PI,T=Math.cos(w)*o,E=S+Math.sin(w)*o*.72,M=Math.sin(y*2.7)*.14,x=new C(m,p[y%p.length]);if(x.position.set(T,E,M),x.scale.set(1.2,.9,1),x.castShadow=!0,t.add(x),y%2===0||b>.35&&b<.65){const P=new C(g,v[y%v.length]);P.position.set(T+Math.cos(y*1.9)*.14,E+Math.sin(y*2.3)*.12,.18+Math.abs(M)*.5),P.castShadow=!0,t.add(P)}}for(const y of[-1,1])for(let b=0;b<5;b++){const w=b/5*Math.PI*2,T=new C(g,v[(b+(y>0?2:0))%v.length]);T.position.set(y*o+Math.cos(w)*.24,S-.08+Math.sin(w)*.16,.22),t.add(T)}}function T1(i,e,t){const n=new ye;e.add(n);const s=i.geo(new Ue(.11,.92,.04)),o=i.geo(new St(.075,.14,4)),r=i.geo(new Ue(.62,.07,.05)),c=8.4,l=34;for(let d=0;d<l;d++){const h=d/(l-1),u=ht.lerp(-Math.PI*.68,Math.PI*.68,h),f=Math.sin(u)*c,a=-1.2-Math.cos(u)*c,p=new ye;p.position.set(f,0,a),p.rotation.y=-u;const v=new C(s,t);v.position.y=.46,v.castShadow=!0,v.receiveShadow=!0,p.add(v);const m=new C(o,t);if(m.position.y=.99,m.rotation.y=Math.PI/4,p.add(m),d<l-1)for(const g of[.28,.72]){const S=new C(r,t);S.position.set(.28,g,-.02),p.add(S)}n.add(p)}}function E1(i,e){const t=i.stdMat("#9c6b43",.8),n=i.stdMat("#5dbb63",.75),s=i.stdMat("#7dd46f",.72),o=i.stdMat("#3d8b59",.78),r=i.stdMat("#ffb3c6",.64),c=i.stdMat("#fff0d4",.64),l=i.geo(new Te(.22,.34,2.2,10)),d=i.geo(new Si(1.2,2)),h=i.geo(new St(.75,4.2,12)),u=i.geo(new pn(.62,1)),f=[[-6.6,-4.8,1.15,r],[6.8,-5,1.2,r],[-8.5,-1.6,1.05,s],[8.6,-1.8,1.1,s],[-4.2,-7.8,1.35,n],[4.6,-7.6,1.3,c]];for(const[g,S,_,y]of f){const b=new ye;b.position.set(g,0,S),b.scale.setScalar(_);const w=new C(l,t);w.position.y=1.1,w.castShadow=!0,b.add(w);const T=new C(d,y);T.position.set(0,2.75,0),T.castShadow=!0,b.add(T);const E=new C(d,y);E.position.set(-.78,2.25,.35),E.scale.setScalar(.68),b.add(E);const M=new C(d,y);M.position.set(.75,2.3,-.25),M.scale.setScalar(.72),b.add(M),e.add(b)}const a=[[-4.4,-4.9,1.05],[-3.5,-5.8,.92],[3.8,-5.7,.98],[4.9,-4.8,1.1]];for(const[g,S,_]of a){const y=new C(h,o);y.position.set(g,2.1*_,S),y.scale.set(_,_,_),y.castShadow=!0,e.add(y)}const p=i.geo(new Ee(.11,8,8)),v=["#ff85a2","#ffd166","#ffffff","#ff9f68"];[[-5.2,-1.9,1.05],[-5.5,.2,.9],[5.4,-2,1.1],[5.6,.5,.88],[-3.6,-3.5,.95],[3.6,-3.5,.95]].forEach(([g,S,_],y)=>{const b=new ye;b.position.set(g,0,S);const w=new C(u,y%2===0?n:s);w.position.y=.42*_,w.scale.set(1.25*_,.85*_,1.05*_),w.castShadow=!0,w.receiveShadow=!0,b.add(w);const T=i.stdMat(v[y%v.length],.55);for(let E=0;E<4;E++){const M=E*1.6+y,x=new C(p,T);x.position.set(Math.cos(M)*.48*_,(.55+E%2*.2)*_,Math.sin(M)*.42*_),b.add(x)}e.add(b)})}function A1(i,e,t,n){const s=i.geo(new Te(.055,.065,3.6,10)),o=i.geo(new Ee(.11,10,8)),r=[[-5.3,-2.65],[5.3,-2.65]];for(const[a,p]of r){const v=new C(s,t);v.position.set(a,1.8,p),v.castShadow=!0,e.add(v);const m=new C(o,t);m.position.set(a,3.65,p),e.add(m)}const l=["#ff8fab","#ffe066","#95e1d3","#a0c4ff","#fff0f5"].map(a=>i.stdMat(a,.58,0,{side:At})),d=new ki;d.moveTo(-.14,0),d.lineTo(.14,0),d.lineTo(0,-.32),d.closePath();const h=i.geo(new fs(d)),u=i.stdMat("#ffffff",.7);[[new z(-5.3,3.45,-2.65),new z(-2.65,3.15,-2.65)],[new z(2.65,3.15,-2.65),new z(5.3,3.45,-2.65)]].forEach(([a,p],v)=>{const m=a.clone().lerp(p,.5);m.y-=.52;const g=new oa(a,m,p),S=i.geo(new ro(g,18,.015,6,!1));e.add(new C(S,u));const _=7;for(let y=1;y<=_;y++){const b=y/(_+1),w=g.getPoint(b),T=new C(h,l[(y+v*2)%l.length]);T.position.copy(w),e.add(T),n.push({obj:T,axis:"x",baseRot:.06,amp:.22,speed:2.6+y%3*.35,phase:y*.7+v})}})}function C1(i,e,t,n,s){const o=f1(e),r=e.mat(new lt({map:o,roughness:.9,metalness:0})),c=e.geo(new cn(14,40)),l=new C(c,r);l.rotation.x=-Math.PI/2,l.receiveShadow=!0,t.add(l);const d=e.stdMat("#67a85d",.88),h=e.geo(new oc(13.5,42,40)),u=new C(h,d);u.rotation.x=-Math.PI/2,u.position.y=-.02,u.receiveShadow=!0,t.add(u);const f=p1(e),a=e.mat(new lt({map:f,roughness:.82,metalness:.03})),p=e.stdMat("#c4beb3",.8),v=e.stdMat("#8f8b84",.84),m=e.geo(new Ue(2.8,.04,4.2)),g=new C(m,a);g.position.set(0,.01,2.2),g.receiveShadow=!0,t.add(g);let S=.72,_=-2.45,y=4.1;for(const k of i.platforms)P1(k,e,t,a,p),k.height>S&&(S=k.height),k.minZ<_&&(_=k.minZ),k.maxX>y&&(y=k.maxX);const b=13.5,w=e.geo(new Ue(16,S,b)),T=new C(w,a);T.position.set(0,S*.5,_-b*.5),T.receiveShadow=!0,t.add(T);const E=e.geo(new Ue(.42,S+.35,2.7)),M=e.geo(new Ue(.5,.1,2.8)),x=e.geo(new Ee(.22,12,10));for(const k of[-1,1]){const U=k*(y+.28),L=new C(E,p);L.position.set(U,(S+.35)*.5,-1.25),L.castShadow=!0,L.receiveShadow=!0,t.add(L);const B=new C(M,v);B.position.set(U,S+.4,-1.25),B.castShadow=!0,t.add(B);const F=new C(x,v);F.position.set(U,S+.56,.02),F.castShadow=!0,t.add(F)}R1(e,t,S),I1(e,t,S),L1(e,t,p,v,s);const P=ra(e,"./assets/shrine-board.jpg","#d93829","school_trip");P.position.set(4.35,0,1.05),P.rotation.y=-.48,t.add(P),ca(e,t,n,["#ffb7d5","#ffd6e7","#fff0f6","#ffa3c8"],52)}function P1(i,e,t,n,s){const o=i.maxX-i.minX,r=i.maxZ-i.minZ,c=(i.minX+i.maxX)*.5,l=(i.minZ+i.maxZ)*.5,d=.08,h=e.geo(new Ue(o,i.height-d,r)),u=new C(h,s);u.position.set(c,(i.height-d)*.5,l),u.castShadow=!0,u.receiveShadow=!0,t.add(u);const f=e.geo(new Ue(o+.04,d,r+.05)),a=new C(f,n);a.position.set(c,i.height-d*.5,l+.015),a.castShadow=!0,a.receiveShadow=!0,t.add(a)}function R1(i,e,t){const n=new ye;n.position.set(0,t,-3.85),e.add(n);const s=i.stdMat("#e03b26",.48,.05),o=i.stdMat("#2a2c33",.65,.08),r=i.stdMat("#f6c945",.32,.48),c=2.65,l=3.55,d=i.geo(new Te(.28,.34,.5,16)),h=i.geo(new Te(.185,.23,l,16));for(const ie of[-1,1]){const D=new C(d,o);D.position.set(ie*c,.25,0),D.castShadow=!0,D.receiveShadow=!0,n.add(D);const re=new C(h,s);re.position.set(ie*(c-.08),l*.5+.12,0),re.rotation.z=ie*.035,re.castShadow=!0,re.receiveShadow=!0,n.add(re)}const u=i.geo(new Ue(c*2+1.5,.22,.22)),f=new C(u,s);f.position.set(0,l-.68,0),f.castShadow=!0,n.add(f);const a=i.geo(new Ue(c*2+1.85,.26,.34)),p=new C(a,s);p.position.set(0,l+.06,0),p.castShadow=!0,n.add(p);const v=i.geo(new Ue(c*2+1.76,.13,.44)),m=new C(v,o);m.position.set(0,l+.24,0),m.castShadow=!0,n.add(m);const g=i.geo(new Ue(.92,.22,.4)),S=i.geo(new Ue(.98,.11,.46));for(const ie of[-1,1]){const D=new C(g,s);D.position.set(ie*(c+1.22),l+.22,0),D.rotation.z=ie*.28,D.castShadow=!0,n.add(D);const re=new C(S,o);re.position.set(ie*(c+1.23),l+.38,0),re.rotation.z=ie*.28,n.add(re)}const _=i.geo(new Ue(.54,.72,.14)),y=new C(_,o);y.position.set(0,l-.3,.06),y.castShadow=!0,n.add(y);const b=g1(i),w=i.mat(new lt({map:b,roughness:.42,metalness:.18})),T=i.geo(new Jt(.46,.64)),E=new C(T,w);E.position.set(0,l-.3,.135),n.add(E);const M=new ye;M.position.set(0,t,-12),e.add(M);const x=i.stdMat("#b88354",.78),P=i.stdMat("#fbf4e6",.84),k=i.stdMat("#7a4528",.72),U=i.stdMat("#474f5e",.72),L=i.stdMat("#3b4250",.74),B=i.geo(new Ue(11.6,.45,4.8)),F=new C(B,i.stdMat("#cbc5ba",.84));F.position.y=.225,M.add(F);const G=i.geo(new Ue(10.6,1.55,3.8)),O=new C(G,x);O.position.y=1.22,M.add(O);const N=i.geo(new Ue(10.5,1.55,3.74)),V=new C(N,P);V.position.y=2.75,M.add(V);const $=i.geo(new Ue(.24,3.2,.24));for(let ie=-3;ie<=3;ie++){const D=new C($,k);D.position.set(ie*1.65,2,1.98),M.add(D)}const he=i.geo(new Ue(10.8,.22,.26)),_e=new C(he,k);_e.position.set(0,3.45,1.98),M.add(_e);const Z=i.geo(new Ue(12.6,.36,5.2)),ne=new C(Z,U);ne.position.set(0,3.75,.15),M.add(ne);const fe=i.geo(new Ue(11.4,.52,4.3)),q=new C(fe,L);q.position.set(0,4.18,.05),M.add(q);const ee=i.geo(new Ue(9.8,.56,3.1)),K=new C(ee,L);K.position.set(0,4.72,0),M.add(K);const oe=i.geo(new Ue(10.4,.28,.42)),be=new C(oe,o);be.position.set(0,5.12,0),M.add(be);const Y=i.geo(new Ue(.28,.42,.46));for(const ie of[-1,1]){const D=new C(Y,r);D.position.set(ie*5.1,5.26,0),M.add(D)}}function I1(i,e,t){const n=i.stdMat("#5d4137",.82),s=i.stdMat("#ffd1e3",.65),o=i.stdMat("#ffabc9",.65),r=i.stdMat("#fff0f6",.64),c=i.geo(new Te(.24,.38,2.7,10)),l=i.geo(new Te(.12,.2,1.6,8)),d=i.geo(new Si(1.15,2));[[-5.4,t,-3.4,1.18],[5.5,t,-3.3,1.22],[-6.9,0,-.4,1.02],[6.9,0,-.6,1.05],[-4.8,t,-6.5,1.3],[4.9,t,-6.4,1.28]].forEach(([u,f,a,p],v)=>{const m=new ye;m.position.set(u,f,a),m.scale.setScalar(p);const g=new C(c,n);g.position.y=1.3,g.rotation.z=u<0?-.14:.14,g.castShadow=!0,m.add(g);const S=new C(l,n);S.position.set(u<0?.65:-.65,2.35,.1),S.rotation.z=u<0?-.65:.65,m.add(S);const _=[[0,3.15,0,1.12,o],[u<0?1.15:-1.15,2.85,.25,.92,s],[u<0?-.9:.9,2.75,-.2,.86,r],[.15,3.65,-.35,.85,r],[u<0?.55:-.55,2.45,.72,.72,s]];for(const[y,b,w,T,E]of _){const M=new C(d,E);M.position.set(y,b,w),M.scale.set(T*1.15,T*.82,T*1.05),M.castShadow=v<4,m.add(M)}e.add(m)})}function L1(i,e,t,n,s){const o=i.stdMat("#fff2b2",.4,0,{emissive:"#ffb703",emissiveIntensity:.75}),r=i.geo(new Te(.32,.42,.24,6)),c=i.geo(new Te(.14,.18,.85,6)),l=i.geo(new Te(.32,.22,.16,6)),d=i.geo(new Te(.19,.19,.34,6)),h=i.geo(new St(.48,.36,6)),u=i.geo(new Ee(.09,10,8));for(const b of[-1,1]){const w=new ye;w.position.set(b*4.55,0,.32);const T=new C(r,n);T.position.y=.12,T.castShadow=!0,w.add(T);const E=new C(c,t);E.position.y=.64,E.castShadow=!0,w.add(E);const M=new C(l,n);M.position.y=1.12,M.castShadow=!0,w.add(M);const x=new C(d,o);x.position.y=1.36,w.add(x);const P=new C(h,n);P.position.y=1.68,P.castShadow=!0,w.add(P);const k=new C(u,t);k.position.y=1.9,w.add(k),e.add(w)}const f=i.stdMat("#6e4228",.75),a=i.geo(new Te(.06,.07,3.2,8)),p=i.geo(new Ue(.75,.08,.08)),v=i.geo(new Ee(.24,14,12)),m=i.geo(new Te(.13,.13,.07,12)),g=i.stdMat("#222228",.5),S=i.stdMat("#ff5447",.45,0,{emissive:"#ff4233",emissiveIntensity:.3}),_=i.stdMat("#fff5d6",.45,0,{emissive:"#ffd166",emissiveIntensity:.35});[[-4.85,.36,-1.6],[4.85,.36,-1.6]].forEach(([b,w,T],E)=>{const M=b<0?1:-1,x=new ye;x.position.set(b,w,T);const P=new C(a,f);P.position.y=1.6,P.castShadow=!0,x.add(P);const k=new C(p,f);k.position.set(M*.32,3.05,0),x.add(k);const U=new ye;U.position.set(M*.62,3.02,0),x.add(U);const L=new C(v,E%2===0?S:_);L.position.y=-.34,L.scale.set(.88,1.28,.88),L.castShadow=!0,U.add(L);const B=new C(m,g);B.position.y=-.05,U.add(B);const F=new C(m,g);F.position.y=-.63,U.add(F),e.add(x),s.push({obj:U,axis:"z",baseRot:0,amp:.14,speed:2.2+E*.4,phase:E*1.5})})}function D1(i){const t=document.createElement("canvas");t.width=128,t.height=128;const n=t.getContext("2d");if(n){const l=n.createRadialGradient(64,64,7.3728,64,64,61.44);l.addColorStop(0,"#eab66e"),l.addColorStop(.72,"#d69545"),l.addColorStop(.92,"#b8732a"),l.addColorStop(1,"#9c5c1e"),n.fillStyle=l,n.fillRect(0,0,128,128),n.strokeStyle="rgba(138, 78, 22, 0.35)",n.lineWidth=3,n.beginPath(),n.arc(64,64,61.44*.78,0,Math.PI*2),n.stroke();let d=7719;const h=()=>(d=d*16807%2147483647,(d-1)/2147483646);for(let u=0;u<95;u++){const f=h()*Math.PI*2,a=Math.sqrt(h())*61.44*.9,p=64+Math.cos(f)*a,v=64+Math.sin(f)*a;n.fillStyle=h()>.45?"rgba(128, 68, 20, 0.42)":"rgba(255, 226, 178, 0.38)",n.beginPath(),n.arc(p,v,1.4+h()*2.8,0,Math.PI*2),n.fill()}}const s=i.tex(new Mt(t));return s.colorSpace=et,s.anisotropy=4,s}function k1(i,e){const t=new ye;t.name="intruder_dove",t.visible=!1,e.add(t);const n=new ye;t.add(n);const s=i.stdMat("#fffdf9",.56),o=i.stdMat("#dce5f0",.62),r=i.stdMat("#ff942e",.42),c=i.stdMat("#f43f5e",.45),l=i.stdMat("#ffffff",.24),d=i.stdMat("#141218",.12),h=i.stdMat("#ff9eb5",.65),u=i.geo(new Ee(.24,18,14)),f=new C(u,s);f.scale.set(.95,.88,1.38),f.castShadow=!0,n.add(f);const a=i.geo(new Ee(.185,14,12)),p=new C(a,s);p.position.set(0,-.02,.2),p.scale.set(.96,.92,.92),p.castShadow=!0,n.add(p);const v=new ye;v.position.set(0,.23,.24),n.add(v);const m=i.geo(new Ee(.165,16,12)),g=new C(m,s);g.castShadow=!0,v.add(g);const S=i.geo(new St(.04,.12,8)),_=new C(S,s);_.position.set(0,.17,-.02),_.rotation.x=-.45,v.add(_);const y=new C(S,o);y.position.set(0,.15,-.07),y.rotation.x=-.82,y.scale.setScalar(.8),v.add(y);const b=i.geo(new Ee(.068,12,10)),w=i.geo(new Ee(.036,10,8)),T=i.geo(new Ee(.013,8,6)),E=i.geo(new Ee(.036,8,8));for(const q of[-1,1]){const ee=new C(b,l);ee.position.set(q*.115,.045,.105),v.add(ee);const K=new C(w,d);K.position.set(q*.135,q<0?.068:.028,.158),K.scale.setScalar(q<0?1.08:.82),v.add(K);const oe=new C(T,l);oe.position.set(q*.128,q<0?.082:.04,.188),v.add(oe);const be=new C(E,h);be.position.set(q*.125,-.03,.095),be.scale.set(.85,.55,.55),v.add(be)}const M=i.geo(new St(.056,.16,10)),x=new C(M,r);x.position.set(0,.005,.21),x.rotation.x=Math.PI/2-.08,x.scale.set(1,1,.78),x.castShadow=!0,v.add(x);const P=i.geo(new St(.042,.12,8)),k=new C(P,r);k.position.set(0,-.045,.195),k.rotation.x=Math.PI/2+.34,k.scale.set(.95,1,.65),v.add(k);const U=new ye;U.position.set(0,.08,.31),n.add(U);const L=i.geo(new St(.046,.095,6));for(const q of[-1,1]){const ee=new C(L,c);ee.position.x=q*.052,ee.rotation.z=q*(Math.PI/2),ee.scale.set(1,1,.45),ee.castShadow=!0,U.add(ee)}const B=i.geo(new Ee(.028,8,8));U.add(new C(B,c));const F=i.geo(new Ee(.18,12,10)),G=i.geo(new Xt(.048,.26,6,8)),O=q=>{const ee=new ye;ee.position.set(q*.18,.06,.02),n.add(ee);const K=new C(F,s);K.position.set(q*.18,.02,.01),K.scale.set(1.35,.26,.95),K.castShadow=!0,ee.add(K);const oe=[[.36,.05,.18,s],[.38,-.05,-.05,o],[.32,-.14,-.32,o]];for(const[be,Y,ie,D]of oe){const re=new C(G,D);re.position.set(q*be,.01,Y),re.rotation.z=Math.PI/2,re.rotation.y=q*ie,re.scale.set(1,1,.42),re.castShadow=!0,ee.add(re)}return ee},N=O(-1),V=O(1),$=new ye;$.position.set(0,-.01,-.28),n.add($);const he=i.geo(new Xt(.052,.22,6,8));for(let q=-1;q<=1;q++){const ee=new C(he,q===0?s:o);ee.position.set(q*.075,.02,-.13),ee.rotation.x=Math.PI/2-.15,ee.rotation.z=-q*.34,ee.scale.set(1,1,.35),ee.castShadow=!0,$.add(ee)}const _e=new ye;_e.position.set(0,-.2,-.04),n.add(_e);const Z=i.geo(new Te(.018,.018,.11,8)),ne=i.geo(new St(.036,.09,6));for(const q of[-1,1]){const ee=new C(Z,r);ee.position.set(q*.075,-.04,0),_e.add(ee);const K=new C(ne,r);K.position.set(q*.075,-.1,.03),K.rotation.x=-Math.PI/2,K.scale.set(1.2,1,.35),_e.add(K)}return{root:t,sync:(q,ee,K)=>{if(t.visible=q.active,!q.active)return;t.position.copy(q.position),t.rotation.y=q.facingYaw;const oe=K*22+q.phase,be=Math.sin(oe);N.rotation.z=be*.95+.16,V.rotation.z=-be*.95-.16,N.rotation.y=Math.cos(oe)*.24,V.rotation.y=-Math.cos(oe)*.24,n.position.y=-be*.07,n.rotation.x=.14+Math.sin(K*11+q.phase)*.09,n.rotation.z=Math.sin(K*8+q.phase)*.14,v.position.z=.24+Math.sin(K*18)*.035,v.rotation.z=Math.cos(K*10)*.12,$.rotation.x=.18+Math.cos(oe)*.28,_e.rotation.x=-.55+Math.sin(oe*.5)*.22}}}function z1(i,e){const t=new ye;t.name="intruder_deer",t.visible=!1,e.add(t);const n=new ye;t.add(n);const s=i.stdMat("#c88546",.72),o=i.stdMat("#f6e4c4",.76),r=i.stdMat("#2e201a",.48),c=i.stdMat("#ebd8b7",.6),l=i.stdMat("#fffdf8",.8),d=i.stdMat("#ffffff",.22),h=i.stdMat("#141218",.12),u=D1(i),f=i.mat(new lt({map:u,roughness:.72,metalness:.02})),a=i.geo(new Xt(.24,.46,10,16)),p=new C(a,s);p.position.set(0,.58,0),p.rotation.x=Math.PI/2,p.scale.set(1.02,1.05,.96),p.castShadow=!0,p.receiveShadow=!0,n.add(p);const v=i.geo(new Ee(.2,12,10)),m=new C(v,o);m.position.set(0,.45,.01),m.scale.set(.88,.52,1.75),n.add(m);const g=i.geo(new Ee(.044,8,8)),S=[[-.22,.65,.14,1],[-.23,.58,-.02,.85],[-.21,.66,-.18,.95],[-.17,.74,.02,.78],[-.15,.72,-.26,.82],[.22,.65,.14,1],[.23,.58,-.02,.85],[.21,.66,-.18,.95],[.17,.74,.02,.78],[.15,.72,-.26,.82]];for(const[re,te,pe,ae]of S){const xe=new C(g,o);xe.position.set(re,te,pe),xe.scale.set(.45*ae,.9*ae,1.05*ae),n.add(xe)}const _=i.geo(new Te(.052,.04,.42,10)),y=i.geo(new Te(.044,.052,.085,10)),b=(re,te)=>{const pe=new ye;pe.position.set(re,.48,te),n.add(pe);const ae=new C(_,s);ae.position.y=-.21,ae.castShadow=!0,pe.add(ae);const xe=new C(y,r);return xe.position.y=-.438,xe.castShadow=!0,pe.add(xe),pe},w=b(-.14,.25),T=b(.14,.25),E=b(-.145,-.24),M=b(.145,-.24),x=new ye;x.position.set(0,.68,-.42),n.add(x);const P=i.geo(new Ee(.095,12,10)),k=new C(P,l);k.position.set(0,.05,-.05),k.scale.set(.88,1.28,.92),k.castShadow=!0,x.add(k);const U=i.geo(new Te(.115,.155,.34,12)),L=new C(U,s);L.position.set(0,.77,.34),L.rotation.x=.26,L.castShadow=!0,n.add(L);const B=i.geo(new Ee(.125,10,8)),F=new C(B,o);F.position.set(0,.68,.42),F.scale.set(.85,1.15,.55),n.add(F);const G=new ye;G.position.set(0,.96,.43),n.add(G);const O=i.geo(new Ee(.19,16,14)),N=new C(O,s);N.scale.set(.98,.94,1.12),N.castShadow=!0,G.add(N);const V=i.geo(new Ee(.118,14,10)),$=new C(V,o);$.position.set(0,-.055,.19),$.scale.set(1.06,.82,1.18),$.castShadow=!0,G.add($);const he=i.geo(new Ee(.045,10,8)),_e=new C(he,r);_e.position.set(0,-.015,.31),_e.scale.set(1.18,.85,.78),G.add(_e);const Z=i.geo(new Ee(.095,10,8)),ne=i.geo(new Ee(.064,8,8));for(const re of[-1,1]){const te=new ye;te.position.set(re*.175,.11,-.02),te.rotation.set(-.1,re*.25,re*-.52),G.add(te);const pe=new C(Z,s);pe.scale.set(.55,1.25,.42),pe.castShadow=!0,te.add(pe);const ae=new C(ne,o);ae.position.z=.022,ae.scale.set(.52,1.12,.3),te.add(ae)}const fe=i.geo(new Xt(.024,.22,5,8)),q=i.geo(new Xt(.018,.12,5,8));for(const re of[-1,1]){const te=new ye;te.position.set(re*.088,.16,-.02),te.rotation.set(-.18,0,re*-.34),G.add(te);const pe=new C(fe,c);pe.position.y=.11,pe.castShadow=!0,te.add(pe);const ae=new C(q,c);ae.position.set(re*-.035,.14,.055),ae.rotation.set(.65,0,re*.42),ae.castShadow=!0,te.add(ae);const xe=new C(q,c);xe.position.set(re*.055,.23,-.02),xe.rotation.set(-.22,0,re*-.62),xe.castShadow=!0,te.add(xe)}const ee=i.geo(new Ee(.068,12,10)),K=i.geo(new Ee(.029,10,8)),oe=i.geo(new Ee(.011,8,6)),be=i.geo(new Ue(.12,.026,.055));for(const re of[-1,1]){const te=new C(ee,d);te.position.set(re*.112,.048,.142),G.add(te);const pe=new C(K,h);pe.position.set(re*.116,.046,.204),G.add(pe);const ae=new C(oe,d);ae.position.set(re*.106,.058,.228),G.add(ae);const xe=new C(be,s);xe.position.set(re*.114,.098,.172),xe.rotation.y=re*.2,G.add(xe)}const Y=i.geo(new Te(.145,.145,.024,20)),ie=new C(Y,f);return ie.position.set(.01,-.092,.315),ie.rotation.set(.18,.14,-.08),ie.castShadow=!0,G.add(ie),{root:t,sync:(re,te,pe)=>{if(t.visible=re.active,!re.active)return;t.position.copy(re.position),t.rotation.y=re.facingYaw;const ae=pe*18+re.phase,xe=Math.sin(ae)*.78;w.rotation.x=xe,M.rotation.x=xe,T.rotation.x=-xe,E.rotation.x=-xe,n.position.y=Math.abs(Math.sin(ae))*.085,n.rotation.x=.06+Math.sin(ae*2)*.045,n.rotation.z=Math.sin(ae)*.075,G.rotation.x=-.04+Math.cos(ae*2)*.055,G.rotation.z=-Math.sin(ae)*.06,x.rotation.z=Math.sin(ae*1.6)*.45,x.rotation.x=-.32+Math.cos(ae*2)*.16}}}function U1(i){const t=document.createElement("canvas");t.width=1024,t.height=1024;const n=t.getContext("2d");if(n){const r=73.14285714285714;for(let f=0;f<14;f++)n.fillStyle=f%2===0?"#69c452":"#5eb948",n.fillRect(f*r,0,r,1024);const c=1024*.5,l=472,d=(f,a)=>{n.beginPath(),n.ellipse(c,l,f,a,0,0,Math.PI*2)};n.save(),n.fillStyle="#f8fafc",d(296,188),n.fill(),n.fillStyle="#d4683f",d(289,182),n.fill(),n.strokeStyle="rgba(182, 74, 38, 0.24)",n.lineWidth=18,d(266,159),n.stroke(),d(225,118),n.stroke(),n.strokeStyle="rgba(255, 253, 248, 0.94)",n.lineWidth=4;for(const[f,a]of[[268,161],[247,140],[226,119],[205,98]])d(f,a),n.stroke();n.save(),d(202,95),n.clip();for(let f=0;f<16;f++)n.fillStyle=f%2===0?"#74cf59":"#66c24d",n.fillRect(0,f*(1024/16),1024,1024/16);n.strokeStyle="rgba(255, 255, 255, 0.72)",n.lineWidth=4.5,n.strokeRect(c-140,l-58,280,116),n.beginPath(),n.arc(c,l,34,0,Math.PI*2),n.stroke(),n.restore(),n.fillStyle="rgba(255, 255, 255, 0.9)";for(let f=0;f<5;f++)n.fillRect(c-7,l+104+f*16,14,7);let h=31415;const u=()=>(h=h*16807%2147483647,(h-1)/2147483646);for(let f=0;f<1200;f++){const a=u()*1024,p=u()*1024;n.fillStyle=u()>.5?"rgba(255,255,255,0.14)":"rgba(52,32,20,0.08)",n.fillRect(a,p,2.5,2.5)}n.restore()}const s=i.tex(new Mt(t));return s.colorSpace=et,s.anisotropy=4,s}function N1(i,e){const t=document.createElement("canvas");t.width=512,t.height=256;const n=t.getContext("2d");if(n){n.fillStyle="#fffdf8",n.fillRect(0,0,512,256);const o=e===1?"#f5c542":e===2?"#b8c4d4":"#d68c54",r=e===1?"#f5b700":e===2?"#94a3b8":"#c6733b",c=e===1?"#ffe066":e===2?"#e2e8f0":"#efb07a",l=e===1?"#9e6200":e===2?"#334155":"#6c3412";n.strokeStyle=o,n.lineWidth=14,n.strokeRect(14,14,484,228);const d=256,h=128,u=84;n.save(),n.shadowColor="rgba(30, 20, 10, 0.22)",n.shadowBlur=12,n.shadowOffsetY=6,n.fillStyle=r,n.beginPath(),n.arc(d,h,u,0,Math.PI*2),n.fill(),n.restore(),n.fillStyle=c,n.beginPath(),n.arc(d,h,u-11,0,Math.PI*2),n.fill(),n.strokeStyle="#ffffff",n.lineWidth=4,n.beginPath(),n.arc(d,h,u-17,0,Math.PI*2),n.stroke(),e===1&&(n.fillStyle="#f5b700",n.font="bold 42px system-ui, sans-serif",n.textAlign="center",n.textBaseline="middle",n.fillText("★",112,h),n.fillText("★",400,h)),n.textAlign="center",n.textBaseline="middle",n.font='900 124px "Arial Black", "Hiragino Kaku Gothic ProN", system-ui, sans-serif',n.lineWidth=10,n.strokeStyle=l,n.strokeText(String(e),d,h+6),n.fillStyle="#ffffff",n.fillText(String(e),d,h+6)}const s=i.tex(new Mt(t));return s.colorSpace=et,s.anisotropy=4,s}function B1(i){const e=document.createElement("canvas");e.width=512,e.height=256;const t=e.getContext("2d");if(t){const o=e.width/12;for(let r=0;r<12;r++){t.fillStyle=r%2===0?"#d92626":"#fffdf8",t.fillRect(r*o,0,o+1,e.height);const c=t.createLinearGradient(r*o,0,(r+1)*o,0);c.addColorStop(0,"rgba(30, 10, 10, 0.16)"),c.addColorStop(.35,"rgba(255, 255, 255, 0.12)"),c.addColorStop(.7,"rgba(20, 10, 10, 0.05)"),c.addColorStop(1,"rgba(30, 10, 10, 0.18)"),t.fillStyle=c,t.fillRect(r*o,0,o,e.height)}t.fillStyle="rgba(40, 10, 10, 0.18)",t.fillRect(0,0,e.width,10),t.fillRect(0,e.height-10,e.width,10)}const n=i.tex(new Mt(e));return n.colorSpace=et,n.wrapS=Gt,n.repeat.set(2,1),n.anisotropy=4,n}function F1(i){const e=document.createElement("canvas");e.width=192,e.height=640;const t=e.getContext("2d");if(t){t.fillStyle="#fffdf5",t.fillRect(0,0,192,640),t.strokeStyle="#d62828",t.lineWidth=14,t.strokeRect(7,7,178,626),t.strokeStyle="#f5b700",t.lineWidth=5,t.strokeRect(20,20,152,600),t.fillStyle="rgba(245, 183, 0, 0.32)";const s=[[42,66,8],[150,92,7],[38,250,6],[154,340,8],[44,490,7],[148,560,8]];for(const[r,c,l]of s)t.beginPath(),t.arc(r,c,l,0,Math.PI*2),t.fill();t.textAlign="center",t.textBaseline="middle",["祝","・","優","勝","！"].forEach((r,c)=>{const l=96+c*112;t.font=c===1?'900 58px "Hiragino Mincho ProN", "Yu Mincho", serif':'900 84px "Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif',t.lineWidth=6,t.strokeStyle="#ffd166",t.strokeText(r,96,l),t.fillStyle=c===0||c===4?"#d62828":"#1b1b24",t.fillText(r,96,l)})}const n=i.tex(new Mt(e));return n.colorSpace=et,n.anisotropy=4,n}function G1(i){return[(t,n,s)=>{t.fillStyle="#ffffff",t.fillRect(0,0,n,s),t.fillStyle="#e62e36",t.beginPath(),t.arc(n*.5,s*.5,s*.3,0,Math.PI*2),t.fill()},(t,n,s)=>{t.fillStyle="#2563eb",t.fillRect(0,0,n/3,s),t.fillStyle="#ffffff",t.fillRect(n/3,0,n/3,s),t.fillStyle="#ef4444",t.fillRect(n*2/3,0,n/3,s)},(t,n,s)=>{t.fillStyle="#16a34a",t.fillRect(0,0,n,s),t.fillStyle="#facc15",t.beginPath(),t.moveTo(n*.5,s*.12),t.lineTo(n*.88,s*.5),t.lineTo(n*.5,s*.88),t.lineTo(n*.12,s*.5),t.closePath(),t.fill(),t.fillStyle="#1d4ed8",t.beginPath(),t.arc(n*.5,s*.5,s*.2,0,Math.PI*2),t.fill()},(t,n,s)=>{t.fillStyle="#0284c7",t.fillRect(0,0,n,s),t.fillStyle="#fde047",t.fillRect(n*.28,0,n*.16,s),t.fillRect(0,s*.4,n,s*.2)},(t,n,s)=>{t.fillStyle="#10b981",t.fillRect(0,0,n/3,s),t.fillStyle="#ffffff",t.fillRect(n/3,0,n/3,s),t.fillStyle="#f43f5e",t.fillRect(n*2/3,0,n/3,s)},(t,n,s)=>{t.fillStyle="#ff595e",t.fillRect(0,0,n,s),t.fillStyle="#ffca3a",t.fillRect(0,s*.25,n,s*.5),t.fillStyle="#ffffff",t.beginPath(),t.arc(n*.5,s*.5,s*.16,0,Math.PI*2),t.fill()}].map(t=>{const n=document.createElement("canvas");n.width=96,n.height=64;const s=n.getContext("2d");s&&t(s,96,64);const o=i.tex(new Mt(n));return o.colorSpace=et,o})}function O1(i,e,t,n){const s=i.maxX-i.minX,o=i.maxZ-i.minZ,r=(i.minX+i.maxX)*.5,c=(i.minZ+i.maxZ)*.5,l=new ye;l.position.set(r,0,c),n.add(l);const d=t.stdMat("#fffdf9",.34,.06),h=t.stdMat("#f5c542",.24,.52),u=e===1?"#e63946":e===2?"#3b82f6":"#10b981",f=t.stdMat(u,.78,.02),a=.055,p=Math.max(.1,i.height-a),v=t.geo(new Ue(s-.02,p,o-.02)),m=new C(v,d);m.position.y=p*.5,m.castShadow=!0,m.receiveShadow=!0,l.add(m);const g=t.geo(new Ue(s,a,o)),S=new C(g,h);S.position.y=i.height-a*.5,S.castShadow=!0,S.receiveShadow=!0,l.add(S);const _=t.geo(new Ue(s-.14,.012,o-.14)),y=new C(_,f);y.position.y=i.height-.004,y.receiveShadow=!0,l.add(y);const b=t.geo(new Ue(s+.03,.04,o+.03)),w=new C(b,h);w.position.y=.02,w.receiveShadow=!0,l.add(w);const T=N1(t,e),E=t.mat(new lt({map:T,roughness:.34,metalness:.08})),M=s-.12,x=Math.max(.22,p-.08),P=t.geo(new Jt(M,x)),k=new C(P,E);k.position.set(0,p*.5+.01,o*.5-.004),l.add(k)}function V1(i,e){const t=new ye;t.position.set(0,4.15,-.9),e.add(t);const n=i.stdMat("#ffd147",.24,.54,{emissive:"#ffaa00",emissiveIntensity:.12}),s=i.stdMat("#e63946",.55,.12,{side:At}),o=i.stdMat("#f8fafc",.65),r=i.stdMat("#e63946",.48),c=i.geo(new Te(.022,.022,.88,8)),l=new C(c,o);l.position.y=.92,t.add(l);const d=i.geo(new Te(.14,.19,.12,12)),h=new C(d,r);h.position.y=.52,t.add(h);const u=.5,f=new ye;f.position.set(0,.46,0),t.add(f);const a=new ye;a.position.set(0,.46,0),t.add(a);const p=i.geo(new Ee(u,20,16,-Math.PI/2,Math.PI,0,Math.PI)),v=i.geo(new Ee(u,20,16,Math.PI/2,Math.PI,0,Math.PI)),m=i.geo(new cn(u*.96,20)),g=i.geo(new pn(.095,0)),S=i.stdMat("#fffdf8",.52),_=(fe,q,ee)=>{const K=new C(q,n);K.position.y=-.46,K.castShadow=!0,fe.add(K);const oe=new C(m,s);oe.position.set(ee*.008,-.46,0),oe.rotation.y=ee>0?-Math.PI/2:Math.PI/2,fe.add(oe);for(let be=0;be<4;be++){const Y=-.75+be/3*1.5,ie=new C(g,be%2===0?r:S);ie.position.set(ee*Math.cos(Y)*(u+.02),-.46+Math.sin(Y)*u*.72,Math.cos(Y)*.24),fe.add(ie)}};_(f,p,-1),_(a,v,1);const y=new ye;y.position.set(0,-.52,0),t.add(y);const b=i.geo(new Te(.015,.015,.45,6)),w=new C(b,r);w.position.y=-.22,y.add(w);const T=i.geo(new St(.06,.14,10)),E=new C(T,n);E.position.y=-.48,y.add(E);const M=new ye;M.position.set(0,.18,.02),M.visible=!1,t.add(M);const x=F1(i),P=i.mat(new lt({map:x,roughness:.45,metalness:.06,side:At})),k=1.88,U=i.geo(new Jt(.58,k)),L=new C(U,P);L.position.y=-k*.5,L.castShadow=!0,M.add(L);const B=i.geo(new Te(.026,.026,.66,10)),F=new C(B,n);F.rotation.z=Math.PI/2,F.position.y=-k,M.add(F);const G=i.geo(new Jt(.11,.075)),N=["#ffd166","#ff4d6d","#00bbf9","#52b788","#ffffff","#ff9f1c"].map(fe=>i.stdMat(fe,.32,.28,{side:At,emissive:fe,emissiveIntensity:.16})),V=[];for(let fe=0;fe<64;fe++){const q=new C(G,N[fe%N.length]);q.visible=!1,e.add(q),V.push({mesh:q,vel:new z,spin:new z,age:0,maxAge:2.2,active:!1})}let $=0,he=!1,_e=0;const Z=(fe,q)=>{for(let ee=0;ee<fe;ee++){const K=V[$];$=($+1)%V.length;const oe=Math.random()*Math.PI*2,be=(.55+Math.random()*1.4)*q;K.mesh.position.set((Math.random()-.5)*.65,3.95+(Math.random()-.5)*.25,-.9+(Math.random()-.5)*.45),K.vel.set(Math.cos(oe)*be,.4+Math.random()*1.15*q,Math.sin(oe)*be*.75),K.spin.set((Math.random()-.5)*9,(Math.random()-.5)*9,(Math.random()-.5)*9),K.age=0,K.maxAge=1.9+Math.random()*1.35,K.active=!0,K.mesh.visible=!0,K.mesh.rotation.set(Math.random()*6,Math.random()*6,Math.random()*6)}};return{sync:(fe,q,ee)=>{const K=Math.min(q,.1),oe=ht.clamp(fe.kusudamaOpen,0,1);if(t.rotation.z=Math.sin(ee*1.8)*.045,t.rotation.x=Math.cos(ee*1.3)*.025,f.rotation.z=-oe*1.18,a.rotation.z=oe*1.18,y.visible=oe<.25,oe>.04){M.visible=!0;const Y=ht.clamp(oe*1.18,.05,1);M.scale.set(1,Y,1),M.rotation.x=Math.sin(ee*3.8)*.07,M.rotation.z=Math.cos(ee*2.9)*.045}else M.visible=!1;oe>.12||fe.kusudamaTimer>0?(he||(he=!0,Z(36,1.45)),_e+=K,_e>=.085&&(_e=0,Z(4,.72))):he=!1;for(const Y of V)if(Y.active){if(Y.age+=K,Y.age>=Y.maxAge||Y.mesh.position.y<.06){Y.active=!1,Y.mesh.visible=!1;continue}Y.vel.y=Math.max(-1.45,Y.vel.y-2.4*K),Y.vel.x*=Math.exp(-1.2*K),Y.vel.z*=Math.exp(-1.2*K),Y.mesh.position.x+=(Y.vel.x+Math.sin(ee*5+Y.age*4)*.35)*K,Y.mesh.position.y+=Y.vel.y*K,Y.mesh.position.z+=Y.vel.z*K,Y.mesh.rotation.x+=Y.spin.x*K,Y.mesh.rotation.y+=Y.spin.y*K,Y.mesh.rotation.z+=Y.spin.z*K}}}}function H1(i,e,t,n,s){const o=U1(e),r=e.mat(new lt({map:o,roughness:.86,metalness:0})),c=e.geo(new Jt(36,36)),l=new C(c,r);l.rotation.x=-Math.PI/2,l.position.set(0,0,-1.8),l.receiveShadow=!0,t.add(l);const d=e.stdMat("#67be50",.9),h=e.geo(new cn(54,48)),u=new C(h,d);u.rotation.x=-Math.PI/2,u.position.y=-.025,u.receiveShadow=!0,t.add(u);for(const q of i.platforms){const ee=q.id==="podium_1"?1:q.id==="podium_2"?2:3;O1(q,ee,e,t)}const f=B1(e),a=e.mat(new lt({map:f,roughness:.68,metalness:.02,side:At})),p=9.8,v=2.35,m=e.geo(new Jt(p,v)),g=new C(m,a);g.position.set(0,v*.5+.05,-3.45),g.castShadow=!0,g.receiveShadow=!0,t.add(g);const S=e.stdMat("#f1f5f9",.45,.25),_=e.stdMat("#e63946",.6),y=e.geo(new Te(.055,.062,2.75,10));for(const q of[-4.95,-2.5,0,2.5,4.95]){const ee=new C(y,S);ee.position.set(q,1.375,-3.52),ee.castShadow=!0,t.add(ee)}const b=e.geo(new Te(.042,.042,p+.3,10)),w=new C(b,_);w.rotation.z=Math.PI/2,w.position.set(0,v+.06,-3.42),t.add(w);const T=e.geo(new Te(.072,.088,5.7,10)),E=e.geo(new Ee(.14,12,10)),M=e.stdMat("#f5c542",.28,.52),x=[[-5.6,-3.4],[5.6,-3.4],[-5.3,-.9],[5.3,-.9]];for(const[q,ee]of x){const K=new C(T,S);K.position.set(q,2.85,ee),K.castShadow=!0,t.add(K);const oe=new C(E,M);oe.position.set(q,5.75,ee),t.add(oe)}const P=e.geo(new Te(.02,.02,10.6,8)),k=new C(P,S);k.rotation.z=Math.PI/2,k.position.set(0,5.5,-.9),t.add(k);const L=G1(e).map(q=>e.mat(new lt({map:q,roughness:.56,metalness:.02,side:At}))),B=e.geo(new Jt(.42,.29)),F=e.stdMat("#ffffff",.65);[[new z(-5.6,5.35,-3.4),new z(5.6,5.35,-3.4),.72],[new z(-5.3,5.35,-.9),new z(5.6,5.15,-3.4),.55],[new z(5.3,5.35,-.9),new z(-5.6,5.15,-3.4),.55]].forEach(([q,ee,K],oe)=>{const be=q.clone().lerp(ee,.5);be.y-=K;const Y=new oa(q,be,ee),ie=e.geo(new ro(Y,22,.014,6,!1));t.add(new C(ie,F));const D=13;for(let re=1;re<=D;re++){const te=re/(D+1),pe=Y.getPoint(te),ae=Y.getTangent(te),xe=new ye;xe.position.copy(pe),xe.rotation.y=Math.atan2(ae.z,ae.x)*-1,t.add(xe);const we=new C(B,L[(re+oe*2)%L.length]);we.position.y=-.16,xe.add(we),s.push({obj:xe,axis:"x",baseRot:.06,amp:.26,speed:2.8+re%4*.35,phase:re*.65+oe*1.4})}});const O=e.stdMat("#ffffff",.64),N=e.stdMat("#cbd5e1",.42,.35),V=e.stdMat("#ef4444",.58),$=e.stdMat("#3b82f6",.58),he=e.geo(new Te(.05,.05,2.35,8)),_e=e.geo(new St(2.55,1.15,4)),Z=e.geo(new Ue(3.6,.38,.08)),ne=[[-7.3,-5,.28,V],[7.3,-5,-.28,$]];for(const[q,ee,K,oe]of ne){const be=new ye;be.position.set(q,0,ee),be.rotation.y=K,t.add(be);for(const D of[-1.65,1.65])for(const re of[-1.25,1.25]){const te=new C(he,N);te.position.set(D,1.175,re),te.castShadow=!0,be.add(te)}const Y=new C(_e,O);Y.position.y=2.88,Y.rotation.y=Math.PI/4,Y.scale.set(1.06,1,.85),Y.castShadow=!0,be.add(Y);const ie=new C(Z,oe);ie.position.set(0,2.18,1.32),be.add(ie)}const fe=ra(e,"./assets/sports-board.jpg","#e63946","sports_day");return fe.position.set(4.25,0,.55),fe.rotation.y=-.5,t.add(fe),ca(e,t,n,["#ffd166","#ff6b6b","#4cc9f0","#ffffff"],28),V1(e,t)}function W1(i){const t=document.createElement("canvas");t.width=512,t.height=512;const n=t.getContext("2d");if(n){n.fillStyle="#f6d897",n.fillRect(0,0,512,512),n.strokeStyle="rgba(222, 178, 102, 0.34)",n.lineWidth=6;for(let c=12;c<512;c+=26){n.beginPath();for(let l=0;l<=512;l+=32){const d=c+Math.sin(l/512*Math.PI*4+c*.05)*4;l===0?n.moveTo(l,d):n.lineTo(l,d)}n.stroke()}let o=9001;const r=()=>(o=o*16807%2147483647,(o-1)/2147483646);for(let c=0;c<1400;c++){const l=r()*512,d=r()*512,h=1+r()*2.1;n.fillStyle=r()>.55?"rgba(255, 251, 232, 0.55)":"rgba(204, 158, 86, 0.32)",n.beginPath(),n.arc(l,d,h,0,Math.PI*2),n.fill()}}const s=i.tex(new Mt(t));return s.colorSpace=et,s.wrapS=Gt,s.wrapT=Gt,s.repeat.set(5,4),s.anisotropy=4,s}function Tl(i,e,t){const n=document.createElement("canvas");n.width=256,n.height=64;const s=n.getContext("2d");if(s){const c=n.width/8;for(let l=0;l<8;l++)s.fillStyle=l%2===0?e:t,s.fillRect(l*c,0,c,n.height)}const o=i.tex(new Mt(n));return o.colorSpace=et,o.wrapS=Gt,o}function X1(i){const e=document.createElement("canvas");e.width=256,e.height=512;const t=e.getContext("2d");if(t){const s=t.createLinearGradient(0,0,0,512);s.addColorStop(0,"#ffca3a"),s.addColorStop(.5,"#ff7f51"),s.addColorStop(1,"#ff595e"),t.fillStyle=s,t.fillRect(0,0,256,512),t.fillStyle="#00bbf9",t.fillRect(104,0,48,512),t.fillStyle="#ffffff",t.fillRect(96,0,8,512),t.fillRect(152,0,8,512),t.fillStyle="#ffffff";for(let o=0;o<5;o++){const r=o/5*Math.PI*2;t.beginPath(),t.arc(128+Math.cos(r)*28,220+Math.sin(r)*28,20,0,Math.PI*2),t.fill()}t.fillStyle="#ffbe0b",t.beginPath(),t.arc(128,220,14,0,Math.PI*2),t.fill()}const n=i.tex(new Mt(e));return n.colorSpace=et,n.anisotropy=4,n}function q1(i){const e=document.createElement("canvas");e.width=512,e.height=256;const t=e.getContext("2d");if(t){const s=t.createLinearGradient(0,0,0,256);s.addColorStop(0,"rgba(255, 255, 255, 0.98)"),s.addColorStop(.22,"rgba(218, 252, 255, 0.92)"),s.addColorStop(.52,"rgba(24, 202, 220, 0.88)"),s.addColorStop(.85,"rgba(0, 168, 204, 0.78)"),s.addColorStop(1,"rgba(0, 150, 199, 0.28)"),t.fillStyle=s,t.fillRect(0,0,512,256);let o=5511;const r=()=>(o=o*16807%2147483647,(o-1)/2147483646);for(let c=0;c<160;c++){const l=r()*512,d=r()*145,h=4+r()*16;t.fillStyle=`rgba(255, 255, 255, ${.22+(1-d/150)*.48})`,t.beginPath(),t.arc(l,d,h,0,Math.PI*2),t.fill()}}const n=i.tex(new Mt(e));return n.colorSpace=et,n.wrapS=Gt,n.wrapT=mi,n.repeat.set(3,1),n}function Y1(i,e,t,n,s,o,r,c,l,d){const h=new ye;h.position.set(t,n,s),h.scale.setScalar(o),e.add(h);const u=i.stdMat("#9c6b43",.82),f=i.stdMat("#7d5130",.85),a=i.stdMat("#5c381f",.56),p=i.stdMat("#36b34a",.62,.02,{side:At}),v=i.stdMat("#57cc59",.6,.02,{side:At}),m=7;let g=0,S=0,_=0;const y=.62;for(let x=0;x<m;x++){const P=x/(m-1),k=ht.lerp(.24,.11,P),U=ht.lerp(.21,.1,P),L=i.geo(new Te(U,k,y+.06,9)),B=new C(L,x%2===0?u:f),F=r*(.14+P*.34),G=c*(.14+P*.34);B.position.set(g+F*.45,S+y*.5,_+G*.45),B.rotation.z=-F*.85,B.rotation.x=G*.85,B.castShadow=!0,h.add(B),g+=F,S+=y*.94,_+=G}const b=new ye;b.position.set(g,S,_),h.add(b);const w=i.geo(new Ee(.15,10,8));for(let x=0;x<3;x++){const P=x/3*Math.PI*2+.4,k=new C(w,a);k.position.set(Math.cos(P)*.17,-.1,Math.sin(P)*.17),k.castShadow=!0,b.add(k)}const T=i.geo(new Jt(.68,2.15,3,6)),E=T.attributes.position;for(let x=0;x<E.count;x++){const P=E.getX(x),k=E.getY(x),U=ht.clamp((k+1.075)/2.15,0,1),L=Math.sin(Math.pow(U,.72)*Math.PI),B=-Math.pow(U,2)*.92,F=-Math.abs(P)*.22;E.setXYZ(x,P*L,U*2.1,B+F)}T.computeVertexNormals();const M=7;for(let x=0;x<M;x++){const P=x/M*Math.PI*2+d*.3,k=new ye;k.rotation.y=P,b.add(k);const U=new C(T,x%2===0?p:v);U.rotation.x=Math.PI*.36+x%2*.12,U.castShadow=!0,k.add(U)}l.push({obj:b,axis:"z",baseRot:0,amp:.085,speed:1.55+d%1*.4,phase:d})}function Z1(i,e){const t=i.stdMat("#4db39c",.88),n=i.stdMat("#75c9bd",.92),s=i.stdMat("#f2dda6",.85),o=i.geo(new St(1,1,14)),r=i.geo(new Ee(1,16,10,0,Math.PI*2,0,Math.PI*.5)),c=[[-22,-28,7.5,5.2,!0],[-11,-34,9.2,6.8,!1],[13,-31,8.4,5.8,!0],[25,-26,6.8,4.4,!1],[2,-40,12,4.2,!1]];for(const[l,d,h,u,f]of c){const a=new ye;a.position.set(l,-.2,d),e.add(a);const p=new C(r,s);p.scale.set(h*1.15,.55,h*.85),a.add(p);const v=new C(o,f?t:n);v.position.y=u*.48,v.scale.set(h*.82,u,h*.72),a.add(v);const m=new C(r,f?t:n);m.position.set(h*.42,0,.4),m.scale.set(h*.55,u*.45,h*.5),a.add(m)}}function $1(i,e){const t=new ye;t.position.set(0,0,2.8),e.add(t);const n=12.2,s=q1(i),o=i.mat(new lt({map:s,roughness:.24,metalness:.05,transparent:!0,opacity:.9,side:At})),r=i.geo(new Jt(n,1.55,24,8)),c=r.attributes.position;for(let w=0;w<c.count;w++){const T=c.getX(w),E=c.getY(w),M=ht.clamp((E+.775)/1.55,0,1),x=Math.sin(T*1.1)*.09,P=Math.sin(M*Math.PI*.72)*1.05+x*M,k=(1-M)*1.15-Math.pow(M,1.8)*.48+x;c.setXYZ(w,T,Math.max(.02,P),k)}r.computeVertexNormals();const l=new C(r,o);t.add(l);const d=i.stdMat("#ffffff",.42,.02,{emissive:"#dff9ff",emissiveIntensity:.28,transparent:!0,opacity:.94}),h=new ye;h.position.set(0,.82,-.34),t.add(h);const u=i.geo(new Te(.16,.16,n,14,1,!1)),f=new C(u,d);f.rotation.z=Math.PI/2,h.add(f);const a=[],p=i.geo(new Si(.24,1)),v=22;for(let w=0;w<v;w++){const T=w/(v-1),E=ht.lerp(-n*.48,n*.48,T),M=new C(p,d);M.position.set(E,w%2===0?.06:-.05,(w%3-1)*.09),M.scale.set(1.15,.85,.95),h.add(M),a.push(M)}const m=i.stdMat("#35d6e6",.22,.04,{transparent:!0,opacity:.62}),g=i.geo(new Jt(n+.6,3.6)),S=new C(g,m);S.rotation.x=-Math.PI/2,S.position.set(0,.035,1.9),t.add(S);const _=i.geo(new Te(.085,.11,n+.2,12)),y=new C(_,d);return y.rotation.z=Math.PI/2,y.position.set(0,.07,-.45),t.add(y),{sync:(w,T,E)=>{if(s.offset.x=E*.18%1,w.waveActive){const M=ht.clamp(w.waveProgress,0,1),x=Math.sin(M*Math.PI),P=ht.lerp(2.8,-.35,x),k=.42+x*.92;t.position.set(0,0,P),l.scale.set(1,k,1+x*.22),h.position.set(0,.78*k,-.36-x*.14),h.rotation.x=-E*11.5,m.opacity=.42+x*.34,y.scale.set(1,1+x*.45,1);for(let U=0;U<a.length;U++){const L=.92+Math.sin(E*14+U*1.3)*.26;a[U].scale.set(1.15*L,.9*L,.95*L)}}else if(w.waveWarningTimer>0){const M=ht.clamp(1-w.waveWarningTimer/2.2,.15,1),x=Math.sin(E*10)*.08,P=.45+M*.72+x;t.position.set(0,0,ht.lerp(2.85,2.42,M)),l.scale.set(1,P,1),h.position.set(0,.78*P,-.34),h.rotation.x=-E*6.5,m.opacity=.44,y.scale.set(1,1.15,1)}else{const M=Math.sin(E*2.1),x=.26+M*.05;t.position.set(0,0,2.85+M*.18),l.scale.set(1,x,.85),h.position.set(0,.75*x,-.25),h.rotation.x=-E*1.8,m.opacity=.32,y.scale.set(1,.72,1)}}}}function j1(i,e,t,n,s,o){const r={uTime:{value:0},uShallowColor:{value:new Ye("#27dce8")},uDeepColor:{value:new Ye("#008dc4")},uFoamColor:{value:new Ye("#f4feff")}};o.push(r);const c=e.mat(new Nn({uniforms:r,vertexShader:`
        varying vec3 vWorldPos;
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorldPos = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,fragmentShader:`
        uniform float uTime;
        uniform vec3 uShallowColor;
        uniform vec3 uDeepColor;
        uniform vec3 uFoamColor;
        varying vec3 vWorldPos;
        void main() {
          vec2 p = vWorldPos.xz;
          float dist = length(p * vec2(0.75, 1.0));
          float depthT = smoothstep(5.0, 28.0, dist);
          vec3 col = mix(uShallowColor, uDeepColor, depthT);

          // Layered sunny tropical wave caustics & glints
          float w1 = sin(p.x * 0.85 + uTime * 1.4 + sin(p.y * 0.55) * 1.2);
          float w2 = cos(p.y * 1.15 - uTime * 1.9 + sin(p.x * 0.45));
          float crest = smoothstep(0.65, 1.0, (w1 + w2) * 0.5);
          col = mix(col, uFoamColor, crest * 0.28);

          // Shimmering sun sparkles across the turquoise water
          float sp = pow(max(0.0, sin(p.x * 3.1 + uTime * 2.6) * cos(p.y * 2.8 - uTime * 2.1)), 10.0);
          col += vec3(1.0, 0.98, 0.88) * sp * 0.55;

          // Soft foamy surf halo hugging the sandbar perimeter
          float shoreHalo = smoothstep(8.2, 4.2, dist);
          float foamBand = smoothstep(0.2, 0.9, sin(dist * 3.2 - uTime * 2.4) * 0.5 + 0.5) * shoreHalo;
          col = mix(col, uFoamColor, foamBand * 0.45);

          gl_FragColor = vec4(col, 1.0);
        }
      `})),l=e.geo(new cn(66,48)),d=new C(l,c);d.rotation.x=-Math.PI/2,d.position.y=-.08,t.add(d);const h=W1(e),u=e.mat(new lt({map:h,roughness:.88,metalness:0})),f=e.stdMat("#dfb672",.48,.04),a=e.geo(new Te(7.2,8.6,.24,36)),p=new C(a,u);p.position.set(0,-.12,-.55),p.scale.set(1.22,1,.72),p.receiveShadow=!0,t.add(p);const v=e.geo(new Ue(10.8,.014,2.35)),m=new C(v,f);m.position.set(0,.002,1.65),m.receiveShadow=!0,t.add(m);const g=e.stdMat("#fae3a7",.88);for(const $ of i.platforms){const he=$.maxX-$.minX,_e=$.maxZ-$.minZ,Z=($.minX+$.maxX)*.5,ne=($.minZ+$.maxZ)*.5,fe=e.geo(new Ue(he,$.height,_e)),q=new C(fe,u);q.position.set(Z,$.height*.5,ne),q.castShadow=!0,q.receiveShadow=!0,t.add(q);const ee=e.geo(new Te($.height*.62,$.height*.95,he+.16,12)),K=new C(ee,g);K.rotation.z=Math.PI/2,K.position.set(Z,$.height*.36,$.maxZ+.02),K.scale.set(1,1,1.4),K.receiveShadow=!0,t.add(K);const oe=new C(ee,g);oe.rotation.z=Math.PI/2,oe.position.set(Z,$.height*.36,$.minZ-.02),oe.scale.set(1,1,1.4),t.add(oe)}const S=Tl(e,"#ff6b6b","#fff5e4"),_=e.mat(new lt({map:S,roughness:.82})),y=e.geo(new Ue(1.45,.02,.88)),b=new C(y,_);b.position.set(-4.95,.02,-1.55),b.rotation.y=.25,b.receiveShadow=!0,t.add(b);const w=e.geo(new ao(.11,0)),T=e.stdMat("#ff6b6b",.58);for(const[$,he,_e]of[[-3.7,1.2,.03],[3.5,1.35,.03],[-4.2,-.6,.04]]){const Z=new C(w,T);Z.position.set($,_e,he),Z.scale.set(1.2,.35,1.2),t.add(Z)}const E=[[-5.6,-2.5,1.15,.72,.25,0],[5.8,-2.6,1.2,-.78,.2,1.3],[-7.1,-.2,1.02,.65,-.18,2.5],[7.2,-.5,1.05,-.68,-.14,3.7],[-3.9,-4.1,1.28,.45,.35,4.9],[4.2,-4.2,1.24,-.48,.32,5.8]];for(const[$,he,_e,Z,ne,fe]of E)Y1(e,t,$,-.04,he,_e,Z,ne,s,fe);const M=e.stdMat("#fffdf8",.55),x=e.geo(new Te(.042,.048,2.55,10)),P=e.geo(new St(1.45,.56,16)),k=[[-4.95,-1.75,.16,"#ff595e","#ffffff"],[5.15,-1.95,-.18,"#00bbf9","#ffca3a"],[-6.2,-3.45,.12,"#ff85a2","#fffdf8"]];for(const[$,he,_e,Z,ne]of k){const fe=new ye;fe.position.set($,0,he),fe.rotation.z=_e,t.add(fe);const q=new C(x,M);q.position.y=1.24,q.castShadow=!0,fe.add(q);const ee=Tl(e,Z,ne),K=e.mat(new lt({map:ee,roughness:.55,side:At})),oe=new C(P,K);oe.position.y=2.48,oe.castShadow=!0,fe.add(oe)}const U=new ye;U.position.set(-4.55,0,.45),U.rotation.set(.1,.52,-.14),t.add(U);const L=X1(e),B=e.mat(new lt({map:L,roughness:.22,metalness:.06})),F=e.geo(new Xt(.32,1.35,10,18)),G=new C(F,B);G.position.y=.92,G.scale.set(1,1,.18),G.castShadow=!0,U.add(G);const O=e.geo(new St(.12,.28,4)),N=new C(O,e.stdMat("#00bbf9",.35));N.position.set(0,.36,-.1),N.rotation.x=-Math.PI/2-.35,U.add(N),Z1(e,t);const V=ra(e,"./assets/beach-board.jpg","#00bbf9","tropical_beach");return V.position.set(4.25,0,.52),V.rotation.y=-.5,t.add(V),ca(e,t,n,["#fffbe0","#a8f9ff","#ffe066","#ffffff"],32),$1(e,t)}function K1(i){const e=document.createElement("canvas");e.width=512,e.height=256;const t=e.getContext("2d");if(t){t.fillStyle="#e62e36",t.fillRect(0,0,512,128),t.fillStyle="#fffdf9",t.fillRect(0,128,512,128),t.fillStyle="rgba(40, 20, 20, 0.14)",t.fillRect(0,124,512,8),t.strokeStyle="rgba(0, 0, 0, 0.1)",t.lineWidth=3;for(let s=0;s<8;s++){const o=s/8*512;t.beginPath(),t.moveTo(o,0),t.lineTo(o,256),t.stroke()}}const n=i.tex(new Mt(e));return n.colorSpace=et,n.anisotropy=4,n}function J1(i,e){const n=new ye;n.name="intruder_oodama",n.visible=!1,e.add(n);const s=K1(i),o=i.mat(new lt({map:s,roughness:.24,metalness:.04})),r=i.geo(new Ee(.88,32,24)),c=new C(r,o);c.castShadow=!0,c.receiveShadow=!0,n.add(c);const l=i.mat(new so({color:"#1b1426",transparent:!0,opacity:.34,depthWrite:!1})),d=i.geo(new cn(.88*.92,24)),h=new C(d,l);return h.rotation.x=-Math.PI/2,n.add(h),{root:n,sync:(f,a,p)=>{if(n.visible=f.active,!f.active)return;const v=Math.max(.88,f.position.y);n.position.set(f.position.x,v,f.position.z),c.rotation.z=-f.position.x/.88,c.rotation.x=Math.sin(f.position.x*1.4)*.16;const m=1+Math.sin(p*14)*.035;c.scale.set(1/Math.sqrt(m),m,1/Math.sqrt(m)),h.position.y=-v+.025}}}function Q1(i){const e=document.createElement("canvas");e.width=512,e.height=256;const t=e.getContext("2d");if(t){const s=["#ff4d5a","#ffffff","#ffca3a","#ffffff","#00a8e8","#ffffff"],o=e.width/s.length;s.forEach((r,c)=>{t.fillStyle=r,t.fillRect(c*o,0,o+1,e.height)}),t.strokeStyle="rgba(20, 30, 50, 0.14)",t.lineWidth=3;for(let r=0;r<s.length;r++)t.beginPath(),t.moveTo(r*o,0),t.lineTo(r*o,e.height),t.stroke();t.fillStyle="#fffdf8",t.fillRect(0,0,e.width,30),t.fillRect(0,e.height-30,e.width,30)}const n=i.tex(new Mt(e));return n.colorSpace=et,n.anisotropy=4,n}function ev(i,e){const n=new ye;n.name="intruder_beach_ball",n.visible=!1,e.add(n);const s=Q1(i),o=i.mat(new lt({map:s,roughness:.16,metalness:.04})),r=new ye;n.add(r);const c=i.geo(new Ee(.72,30,22)),l=new C(c,o);l.castShadow=!0,l.receiveShadow=!0,r.add(l);const d=i.mat(new so({color:"#142230",transparent:!0,opacity:.34,depthWrite:!1})),h=i.geo(new cn(.72*.88,22)),u=new C(h,d);u.rotation.x=-Math.PI/2,n.add(u);let f=0,a=0,p=0;return{root:n,sync:(m,g,S)=>{if(n.visible=m.active,!m.active)return;const _=Math.min(g,.1),y=Math.max(.72,m.position.y);n.position.set(m.position.x,y,m.position.z),p-=m.velocity.x/.72*_*1.15,f+=_*3.1,a+=_*2.2,l.rotation.set(f,a,p);const b=Math.max(0,m.position.y-.72),w=b<.22?.82+b/.22*.18:1,T=Math.min(.16,Math.abs(m.velocity.y)*.025),E=ht.clamp(w+(b>=.22?T:0),.78,1.18),M=1/Math.sqrt(E);r.scale.set(M,E,M),u.position.y=-y+.025;const x=Math.max(.38,1-b*.24);u.scale.set(x,x,1),d.opacity=Math.max(.12,.34-b*.08)}}}function tv(i){const e=new h1,t=new ye;t.name=`stage_${i.id}`;let n="#4aa9f2",s="#a6e2ff",o="#fff0d2",r="#aee4ff";i.id==="school_trip"?(n="#5ca3e8",s="#c3e2ff",o="#ffe5df",r="#c6e2ff"):i.id==="sports_day"?(n="#2c8ef4",s="#93d5ff",o="#eef6ff",r="#7cc8ff"):i.id==="tropical_beach"&&(n="#1ca3ec",s="#7ce0ff",o="#dff8ff",r="#5ed5ff");const c=new Ye(r),l=new Ye(o),d=v1(e,n,s,o);t.add(d);const h=[];y1(e,t,h),i.id!=="tropical_beach"&&S1(e,t,i.id!=="school_trip"),_1(t,i.id);const u=x1(e,t),f=[],a=[],p=[];let v={sync:()=>{}};i.id==="wedding"?M1(i,e,t,f,a):i.id==="school_trip"?C1(i,e,t,f,a):i.id==="sports_day"?v=H1(i,e,t,f,a):v=j1(i,e,t,f,a,p);const m=i.id==="wedding"?k1(e,t):i.id==="school_trip"?z1(e,t):i.id==="sports_day"?J1(e,t):ev(e,t);return{root:t,skyColor:c,fogColor:l,update:(S,_)=>{const y=Math.min(S,.1);for(const b of p)b.uTime.value=_;for(const b of h)b.group.position.x+=b.speed*y,b.group.position.x>b.maxX&&(b.group.position.x=b.minX),b.group.position.y=b.baseY+Math.sin(_*.55+b.bobPhase)*.22;for(const b of a){const w=b.baseRot+Math.sin(_*b.speed+b.phase)*b.amp;b.axis==="x"?b.obj.rotation.x=w:b.obj.rotation.z=w}for(const b of f)b.mesh.position.y-=b.speedY*y,b.mesh.position.x+=(b.driftX+Math.sin(_*1.6+b.swayPhase)*b.swayAmp)*y,b.mesh.position.z+=(b.driftZ+Math.cos(_*1.2+b.swayPhase)*b.swayAmp*.45)*y,b.mesh.rotation.x+=b.spinX*y,b.mesh.rotation.y+=b.spinY*y,b.mesh.rotation.z+=b.spinZ*y,(b.mesh.position.y<.08||b.mesh.position.x>b.maxX)&&(b.mesh.position.y=b.maxY+Math.random()*.8,b.mesh.position.x=b.minX+Math.random()*(b.maxX-b.minX)*.75,b.mesh.position.z=b.minZ+Math.random()*(b.maxZ-b.minZ));for(const b of u.particles){if(!b.active)continue;if(b.age+=y,b.age>=b.maxAge){b.active=!1,b.mesh.visible=!1;continue}const w=b.age/b.maxAge;b.mesh.position.addScaledVector(b.velocity,y),b.velocity.multiplyScalar(Math.exp(-3.8*y)),b.velocity.y-=1.6*y,b.mesh.rotation.y+=b.spinSpeed*y,b.mesh.rotation.x+=b.spinSpeed*.6*y;const T=w<.22?ht.lerp(.2,1.18,w/.22):ht.lerp(1.18,.05,(w-.22)/.78);b.mesh.scale.setScalar(b.baseScale*T),b.mat.opacity=Math.max(0,.92*(1-w*w))}},syncIntruder:m.sync,syncHazard:v.sync,spawnDustPuff:u.spawn,dispose:()=>e.disposeAll()}}const ze={maxDt:.05,gravity:-18,maxHorizSpeed:7.5,damping:{grounded:4.5,shoving:2.6,helping:2.8,staggering:3.1,fallen:7.4,air:.85},maxStepUpHeight:.48,riserDropThreshold:.14,riserStumbleMinSpeed:1.25,riserStumbleBalanceLoss:.42,staggerBalanceThreshold:.48,shoveHitCooldown:.22,baseRestitution:.48,shoveRestitution:.82,separationFactor:.78,carrierVulnerabilityMult:1.48,vipSteadinessMult:.85,balanceRecoveryRate:.24,carrierBalanceRecoveryRate:.15,shoulderHeightRatio:.76,jumperLandingBumpRadius:1.08,jumperLandingBumpSpeed:1.28,helperTripSpeedThreshold:1.8,boundsBounceDamping:.35,hatPopMinHitLoss:.32,hatPopBaseVel:4.8,hatPopGravity:14.5,hatPopSpinRate:10.5,hatPopBounceFactor:.38,steepDropThreshold:.28,podiumDropExtraLoss:.38,deerBonkRadius:.68,deerBonkBalanceLoss:.78,deerBonkLaunchSpeed:4.3,doveStartleRadius:1.35,doveHatNudgeRadius:.82,oodamaHitRadius:1.02,oodamaMaxHitY:1.35,oodamaLaunchSpeed:5.5,oodamaLaunchVy:3.2,beachBallRadius:.75,beachBallHitRadius:.92,beachBallLaunchSpeed:3.45,beachBallLaunchVy:5.2,waveMaxShoreY:.16,waveFrontHalfWidth:.55,waveSweepVz:-3.4,waveSweepVy:1.9},Bh=new WeakMap,Fh=new WeakMap,Gh=new WeakMap,Ws=new WeakMap,Bo=new WeakMap;function ea(i){return Bh.get(i)??0}function $n(i,e){Bh.set(i,Math.max(0,e))}function ks(i){return Fh.get(i)??0}function zs(i,e){Fh.set(i,Math.max(0,e))}function El(i){return Gh.get(i)??0}function Al(i,e){Gh.set(i,Math.max(0,e))}function pt(i,e,t){return i<e?e:i>t?t:i}function wt(i,e=0){return Number.isFinite(i)?i:e}function bn(i,e,t,n,s){const o={type:t,npcId:i.spec.id,position:i.position.clone(),intensity:pt(wt(n,.5),.1,2)};e.push(o),i.events.push(o)}const nv=new Set(["top_hat","cap","beret","flower_crown","veil","straw_hat","mascot_ears"]);function In(i,e,t=ze.hatPopBaseVel,n=!1){if(!nv.has(i.spec.appearance.accessory)||!n&&i.hatPopHeight>.22&&i.hatPopVel>2.2)return;const s=.35*(1+Math.sin(i.walkPhase*3.7+i.position.x*2.1)),o=Math.max(t+s,i.hatPopVel);i.hatPopVel=pt(wt(o,ze.hatPopBaseVel),1.5,10.5),i.hatPopHeight=Math.max(i.hatPopHeight,.02),Ws.set(i,!1),bn(i,e,"hat_pop",pt(i.hatPopVel/5,.4,1.8))}function ta(i,e,t,n,s,o){const r=i.riderId;if(i.riderId=null,!r)return;const c=e.get(r);if(!c)return;c.carrierId=null,c.cooldownTimer=Math.max(c.cooldownTimer,3.8);let l=n,d=s;const h=Math.hypot(l,d);h>1e-4?(l/=h,d/=h):(l=Math.sin(i.facingYaw),d=Math.cos(i.facingYaw)),c.action="staggering",c.actionTimer=1.05,c.balance=Math.min(c.balance,.32),c.expression="surprised",c.reactionIcon="💫",c.reactionTimer=1.25,c.poseIntensity=0,c.velocity.set(l*2.35,2.9,d*2.35),c.tiltX=d*.45,c.tiltZ=-l*.45,c.squashY=1.16,In(c,t,ze.hatPopBaseVel+.5,!0),bn(c,t,"fall",.85)}function iv(i,e,t,n,s,o,r=!1){Ln(i,e,t,n,s,o,r)}function Ln(i,e,t,n,s,o,r=!1){if(i.action==="fallen"||i.action==="riding_shoulders")return;let c=e;(i.riderId!==null||i.action==="carrying_rider")&&(c*=ze.carrierVulnerabilityMult),i.spec.archetype==="vip"&&(c*=ze.vipSteadinessMult),i.balance=pt(i.balance-c,0,1),i.tiltX=pt(i.tiltX+n*.3,-.75,.75),i.tiltZ=pt(i.tiltZ-t*.3,-.75,.75),i.squashY=Math.min(i.squashY,.84);const l=i.balance<=0||r;(c>=ze.hatPopMinHitLoss||l)&&In(i,o,ze.hatPopBaseVel+pt(c,0,1.2)*1.15,l),l?(i.balance=0,i.action="fallen",i.actionTimer=r?2.4:2.65,i.helpTargetId=null,i.expression="dizzy",i.reactionIcon="💫",i.reactionTimer=1.8,i.poseIntensity=0,i.velocity.x+=t*1.45,i.velocity.z+=n*1.45,i.velocity.y=Math.max(i.velocity.y,1.55),bn(i,o,r?"pileup":"fall",r?1.25:1),i.riderId!==null&&ta(i,s,o,t,n)):i.balance<ze.staggerBalanceThreshold?(i.action="staggering",i.actionTimer=Math.max(i.actionTimer,.88),i.helpTargetId=null,i.expression="surprised",i.reactionIcon="💦",i.reactionTimer=Math.max(i.reactionTimer,.9),i.poseIntensity=0,bn(i,o,"shove",pt(c*1.3,.4,1.2)),i.riderId!==null&&i.balance<.3&&ta(i,s,o,t,n)):(bn(i,o,"shove",pt(c*1.1,.25,.8)),i.spec.archetype==="vip"&&(i.expression="surprised",i.reactionIcon="💦",i.reactionTimer=Math.max(i.reactionTimer,.75)))}function Cl(i){let e=i.spec.appearance.widthScale*i.spec.appearance.heightScale;return i.riderId!==null&&(e*=1.22),i.action==="fallen"&&(e*=1.45),i.action==="shoving"&&(e*=1.15),Math.max(.65,e)}function sv(i,e,t,n){const s=ze.jumperLandingBumpRadius,o=s*s;for(const r of e){if(r===i||r.action==="riding_shoulders"||r.action==="fallen"||Math.abs(r.position.y-i.position.y)>.5)continue;const c=r.position.x-i.position.x,l=r.position.z-i.position.z,d=c*c+l*l;if(d>=o||d<1e-6)continue;const h=Math.sqrt(d),u=c/h,f=l/h,a=1-h/s,p=ze.jumperLandingBumpSpeed*(.45+.55*a);r.velocity.x+=u*p,r.velocity.z+=f*p,r.squashY=Math.min(r.squashY,.9),a>.35&&ea(r)<=0&&($n(r,.28),Ln(r,.14*a+.08,u,f,t,n,!1))}}function ov(i,e,t,n,s,o){if(!Number.isFinite(t)||t<=0)return;const r=Math.min(t,ze.maxDt),c=new Map;for(const h of i){c.set(h.spec.id,h);const u=ea(h);u>0&&$n(h,u-r);const f=ks(h);f>0&&zs(h,f-r);const a=El(h);a>0&&Al(h,a-r)}if(s){const h=Bo.get(s)??0;h>0&&Bo.set(s,Math.max(0,h-r))}for(const h of i)if(h.carrierId!==null){const u=c.get(h.carrierId);(!u||u.riderId!==h.spec.id||u.action==="fallen")&&(u&&u.riderId===h.spec.id?ta(u,c,n,Math.sin(u.facingYaw),Math.cos(u.facingYaw)):(h.carrierId=null,h.action==="riding_shoulders"&&(h.action="idle")))}for(const h of i){if(h.action==="riding_shoulders"&&h.carrierId!==null)continue;const u=h.position.x,f=h.position.y,a=h.position.z,p=h.groundY,v=f<=p+.08;let m=ze.damping.grounded;!v||h.action==="jumping"?m=ze.damping.air:h.action==="fallen"?m=ze.damping.fallen:h.action==="staggering"?m=ze.damping.staggering:h.action==="shoving"?m=ze.damping.shoving:h.action==="helping"&&(m=ze.damping.helping);const g=Math.exp(-m*r);h.velocity.x*=g,h.velocity.z*=g;const S=Math.hypot(h.velocity.x,h.velocity.z);if(S>ze.maxHorizSpeed){const w=ze.maxHorizSpeed/S;h.velocity.x*=w,h.velocity.z*=w}const _=u+h.velocity.x*r,y=a+h.velocity.z*r;let b=an(e,_,y);if(v&&b>p+.08&&(h.action==="fallen"||h.action==="staggering")){const w=an(e,_,a),T=an(e,u,y);w<=p+.08?(h.position.x=_,h.velocity.z*=-.3):T<=p+.08?(h.position.z=y,h.velocity.x*=-.3):(h.velocity.x*=-.3,h.velocity.z*=-.3),b=an(e,h.position.x,h.position.z)}else h.position.x=_,h.position.z=y;if(v&&b>p+.04&&b-p<=ze.maxStepUpHeight)h.position.y=Math.max(h.position.y,b),h.groundY=b,h.velocity.x*=.88,h.velocity.z*=.88,h.squashY=Math.min(h.squashY,.93);else if(v&&b<p-ze.riserDropThreshold&&h.action!=="jumping"){const w=p-b,T=w>ze.steepDropThreshold,E=Math.hypot(h.velocity.x,h.velocity.z),M=e.id==="sports_day"&&T&&(E>.55||h.balance<.88);if((E>ze.riserStumbleMinSpeed||M||h.action==="staggering"||h.balance<.72)&&h.action!=="fallen"){const x=E>1e-4?E:1,P=E>1e-4?h.velocity.x/x:Math.sin(h.facingYaw),k=E>1e-4?h.velocity.z/x:Math.cos(h.facingYaw),U=T?(e.id==="sports_day"?ze.podiumDropExtraLoss:.18)+(w-ze.steepDropThreshold)*.55:0,L=ze.riserStumbleBalanceLoss+U+.14*Math.min(E,3);h.velocity.y=Math.max(h.velocity.y,T?1.85:1.35),Ln(h,L,P,k,c,n,!1)}}if((h.position.y>b+.004||h.velocity.y>0)&&(h.velocity.y+=ze.gravity*r,h.position.y+=h.velocity.y*r),h.position.y<=b){const w=-h.velocity.y;if(h.position.y=b,h.groundY=b,h.velocity.y=0,w>1.6){if(h.squashY=pt(1-w*.035,.72,.95),h.action==="jumping")h.balance<.7?(h.action="staggering",h.actionTimer=.65,h.poseIntensity=0,h.expression="surprised",h.reactionIcon="💫",h.reactionTimer=Math.max(h.reactionTimer,.85)):(h.action="posing",h.actionTimer=.65,h.poseIntensity=1,h.expression="cheese",h.reactionIcon="✌",h.reactionTimer=.7,bn(h,n,"pose",.65),sv(h,i,c,n));else if(h.action==="staggering"&&w>3.1){const T=Math.hypot(h.velocity.x,h.velocity.z),E=T>1e-4?h.velocity.x/T:Math.sin(h.facingYaw),M=T>1e-4?h.velocity.z/T:Math.cos(h.facingYaw);Ln(h,.38,E,M,c,n,!1)}}}else h.groundY=b}const l=i.length;for(let h=0;h<l;h++){const u=i[h];if(u.action!=="riding_shoulders")for(let f=h+1;f<l;f++){const a=i[f];if(a.action==="riding_shoulders"||Math.abs(u.position.y-a.position.y)>.85)continue;const p=u.radius*(u.action==="fallen"?1.18:1),v=a.radius*(a.action==="fallen"?1.18:1),m=p+v;let g=a.position.x-u.position.x,S=a.position.z-u.position.z;const _=g*g+S*S;if(_>=m*m)continue;let y,b,w;if(_<1e-6){const N=(h*1.91+f*2.73)%(Math.PI*2);b=Math.cos(N),w=Math.sin(N),y=.001}else y=Math.sqrt(_),b=g/y,w=S/y;const T=m-y,E=Cl(u),M=Cl(a),x=1/E,P=1/M,k=x+P,U=T*ze.separationFactor,L=U*(x/k),B=U*(P/k);u.position.x-=b*L,u.position.z-=w*L,a.position.x+=b*B,a.position.z+=w*B;const F=u.velocity.x*b+u.velocity.z*w,G=-(a.velocity.x*b+a.velocity.z*w),O=(a.velocity.x-u.velocity.x)*b+(a.velocity.z-u.velocity.z)*w;if(O<0){const $=-(1+(u.action==="shoving"||a.action==="shoving"||u.action==="staggering"||a.action==="staggering"?ze.shoveRestitution:ze.baseRestitution))*O/k;u.velocity.x-=b*$*x,u.velocity.z-=w*$*x,a.velocity.x+=b*$*P,a.velocity.z+=w*$*P}Pl(u,a,b,w,F,M,c,n),Pl(a,u,-b,-w,G,E,c,n)}}if(s&&s.active){if(s.kind==="deer"){const h=Math.hypot(s.velocity.x,s.velocity.z),u=h>.15?s.velocity.x/h:Math.sin(s.facingYaw),f=h>.15?s.velocity.z/h:Math.cos(s.facingYaw);for(const a of i){if(a.action==="riding_shoulders"||a.action==="fallen"||a.position.y>s.position.y+.78||ks(a)>0)continue;const p=a.position.x-s.position.x,v=a.position.z-s.position.z,m=Math.hypot(p,v);if(m>=ze.deerBonkRadius)continue;zs(a,.8),$n(a,.32);const g=m>1e-4?p/m:u,S=m>1e-4?v/m:1;let _=g*.7+u*.65,y=S*.7+f*.35+(v>=0?.3:-.3);const b=Math.hypot(_,y);b>1e-4?(_/=b,y/=b):(_=u,y=.5),a.velocity.x+=_*ze.deerBonkLaunchSpeed,a.velocity.z+=y*ze.deerBonkLaunchSpeed,a.velocity.y=Math.max(a.velocity.y,2.35),Ln(a,ze.deerBonkBalanceLoss,_,y,c,n,!1),a.balance<=0?(a.expression="dizzy",a.reactionIcon="💫"):(a.expression="surprised",a.reactionIcon="!"),a.reactionTimer=Math.max(a.reactionTimer,1.15),In(a,n,5.4,!0),bn(a,n,"intruder_bonk",1.4)}}else if(s.kind==="dove")for(const h of i){if(h.action==="riding_shoulders"||h.action==="fallen"||ks(h)>0)continue;const u=h.position.x-s.position.x,f=h.position.z-s.position.z,a=Math.hypot(u,f);if(a>=ze.doveStartleRadius)continue;zs(h,1.15),h.expression="surprised",h.reactionIcon="!",h.reactionTimer=Math.max(h.reactionTimer,.85),h.squashY=Math.min(h.squashY,.78);const p=a>1e-4?u/a:0,v=a>1e-4?f/a:-1;h.velocity.x+=p*1.1,h.velocity.z+=Math.min(v,-.35)*1.25,h.position.y<=h.groundY+.06&&(h.velocity.y=Math.max(h.velocity.y,1.2)),a<ze.doveHatNudgeRadius&&In(h,n,3.25,!1),(Bo.get(s)??0)<=0&&(Bo.set(s,.45),bn(h,n,"intruder_bonk",.85))}else if(s.kind==="oodama"){const h=Math.hypot(s.velocity.x,s.velocity.z),u=h>.15?s.velocity.x/h:Math.sin(s.facingYaw),f=h>.15?s.velocity.z/h:Math.cos(s.facingYaw);for(const a of i){if(a.action==="riding_shoulders"||a.action==="fallen"||a.position.y>=ze.oodamaMaxHitY||ks(a)>0)continue;const p=a.position.x-s.position.x,v=a.position.z-s.position.z,m=Math.hypot(p,v);if(m>=ze.oodamaHitRadius)continue;zs(a,.9),$n(a,.38);const g=m>1e-4?p/m:u,S=m>1e-4?v/m:v>=0?1:-1;let _=g*.65+u*.7,y=S*.75+f*.25+(v>=0?.5:-.5);const b=Math.hypot(_,y);b>1e-4?(_/=b,y/=b):(_=u,y=.6),a.sneezeCharge=0,a.lensBombProgress=0;const w=a.spec.archetype==="vip"?1.25:1.05;Ln(a,w,_,y,c,n,!1),a.velocity.x=_*ze.oodamaLaunchSpeed,a.velocity.z=y*ze.oodamaLaunchSpeed,a.velocity.y=Math.max(a.velocity.y,ze.oodamaLaunchVy),a.expression=a.balance<=0?"dizzy":"surprised",a.reactionIcon=a.balance<=0?"💫":"!",a.reactionTimer=Math.max(a.reactionTimer,1.45),In(a,n,6.4,!0),bn(a,n,"intruder_bonk",1.75)}}else if(s.kind==="beach_ball"){const h=Math.hypot(s.velocity.x,s.velocity.z),u=h>.15?s.velocity.x/h:Math.sin(s.facingYaw),f=h>.15?s.velocity.z/h:Math.cos(s.facingYaw);for(const a of i){if(a.action==="riding_shoulders"||a.action==="fallen"||s.position.y>a.position.y+a.height+ze.beachBallRadius+.25||ks(a)>0)continue;const p=a.position.x-s.position.x,v=a.position.z-s.position.z,m=Math.hypot(p,v);if(m>=ze.beachBallHitRadius)continue;zs(a,.85),$n(a,.34);const g=m>1e-4?p/m:u,S=m>1e-4?v/m:v>=0?1:-1;let _=g*.72+u*.55,y=S*.72+f*.35+(v>=0?.25:-.25);const b=Math.hypot(_,y);b>1e-4?(_/=b,y/=b):(_=u,y=-.45),a.riderId!==null&&ta(a,c,n,_,y),a.sneezeCharge=0,a.lensBombProgress=0,a.helpTargetId=null,a.balance=pt(Math.min(a.balance-.35,.52),.2,1),a.action="jumping",a.actionTimer=.48,a.expression="surprised",a.reactionIcon="!",a.reactionTimer=Math.max(a.reactionTimer,1.1),a.poseIntensity=.2,a.squashY=1.24,a.tiltX=pt(y*.48,-.75,.75),a.tiltZ=pt(-_*.48,-.75,.75),a.velocity.x+=_*ze.beachBallLaunchSpeed,a.velocity.z+=y*ze.beachBallLaunchSpeed,a.velocity.y=Math.max(a.velocity.y,ze.beachBallLaunchVy),In(a,n,6.2,!0),bn(a,n,"ball_boing",1.55)}}}if(e.id==="tropical_beach"&&o?.waveActive&&o.waveProgress>.12&&o.waveProgress<.72){const h=2.8-o.waveProgress/.72*3.15;for(const u of i){if(u.action==="fallen"||u.action==="riding_shoulders"||u.position.y>=ze.waveMaxShoreY||Math.abs(u.position.z-h)>=ze.waveFrontHalfWidth||El(u)>0)continue;Al(u,1.85),$n(u,.35),u.sneezeCharge=0,u.lensBombProgress=0;const f=Math.sin(u.position.x*2.3+u.walkPhase)*.55,a=u.spec.archetype==="vip"?1.2:1.02;Ln(u,a,f*.25,-1,c,n,!1),u.velocity.x+=f,u.velocity.z=ze.waveSweepVz,u.velocity.y=Math.max(u.velocity.y,ze.waveSweepVy),u.expression=u.balance<=0?"dizzy":"surprised",u.reactionIcon="💦",u.reactionTimer=Math.max(u.reactionTimer,1.55),In(u,n,6.1,!0),bn(u,n,"slip",1.5)}}for(const h of i){if(h.action==="riding_shoulders")continue;const u=h.radius+.08,f=e.stageBounds.minX+u,a=e.stageBounds.maxX-u,p=e.stageBounds.minZ+u,v=e.stageBounds.maxZ-u,m=e.stageBounds.maxZ+.95;let g=v;if(h.lensBombProgress>.3)g=m;else if(h.lensBombProgress>0){const _=pt(h.lensBombProgress/.3,0,1);g=v+(m-v)*_}h.action==="fallen"&&h.position.z>g&&(g=Math.min(m,h.position.z)),h.position.x<f?(h.position.x=f,h.velocity.x=Math.abs(h.velocity.x)*ze.boundsBounceDamping):h.position.x>a&&(h.position.x=a,h.velocity.x=-Math.abs(h.velocity.x)*ze.boundsBounceDamping),h.position.z<p?(h.position.z=p,h.velocity.z=Math.abs(h.velocity.z)*ze.boundsBounceDamping):h.position.z>g&&(h.position.z=g,h.velocity.z=-Math.abs(h.velocity.z)*ze.boundsBounceDamping);const S=an(e,h.position.x,h.position.z);h.groundY=S,h.position.y<S&&(h.position.y=S,h.velocity.y<0&&(h.velocity.y=0))}for(const h of i){if(h.action!=="riding_shoulders"||h.carrierId===null)continue;const u=c.get(h.carrierId);if(!u||u.action==="fallen"||u.riderId!==h.spec.id){h.carrierId=null,h.action="idle";continue}const f=-Math.sin(u.tiltZ)*.14,a=Math.sin(u.tiltX)*.14;h.position.set(u.position.x+f,u.position.y+u.height*ze.shoulderHeightRatio,u.position.z+a),h.groundY=u.groundY,h.velocity.copy(u.velocity)}const d=1-Math.exp(-10*r);for(const h of i)h.action==="idle"||h.action==="moving"||h.action==="posing"||h.action==="peeking"||h.action==="tiptoe"||h.action==="hiding"||h.action==="helping"?h.balance=Math.min(1,h.balance+ze.balanceRecoveryRate*r):h.action==="carrying_rider"?h.balance=Math.min(1,h.balance+ze.carrierBalanceRecoveryRate*r):h.action==="staggering"&&(h.balance=Math.min(1,h.balance+.1*r)),h.action!=="jump_charge"&&h.action!=="tiptoe"&&(h.squashY+=(1-h.squashY)*d),(h.hatPopHeight>0||h.hatPopVel>0)&&(h.hatPopHeight<=0&&h.hatPopVel>3&&Ws.set(h,!1),h.hatPopHeight+=h.hatPopVel*r,h.hatPopVel-=ze.hatPopGravity*r,h.hatSpin+=ze.hatPopSpinRate*r,h.hatPopHeight<=0&&(!(Ws.get(h)??!1)&&h.hatPopVel<-1?(Ws.set(h,!0),h.hatPopHeight=.004,h.hatPopVel=-h.hatPopVel*ze.hatPopBounceFactor):(Ws.set(h,!1),h.hatPopHeight=0,h.hatPopVel=0,h.hatSpin=0))),h.position.x=wt(h.position.x,h.spec.homePos.x),h.position.y=pt(wt(h.position.y,0),-.2,6),h.position.z=wt(h.position.z,h.spec.homePos.z),h.velocity.x=wt(h.velocity.x,0),h.velocity.y=pt(wt(h.velocity.y,0),-25,16),h.velocity.z=wt(h.velocity.z,0),h.groundY=wt(h.groundY,0),h.facingYaw=wt(h.facingYaw,0),h.headYawOffset=pt(wt(h.headYawOffset,0),-1.35,1.35),h.headPitchOffset=pt(wt(h.headPitchOffset,0),-.8,.8),h.tiltX=pt(wt(h.tiltX,0),-1.55,1.55),h.tiltZ=pt(wt(h.tiltZ,0),-1.55,1.55),h.squashY=pt(wt(h.squashY,1),.65,1.32),h.balance=pt(wt(h.balance,1),0,1),h.excitement=pt(wt(h.excitement,0),0,1),h.hatPopHeight=pt(wt(h.hatPopHeight,0),0,8),h.hatPopVel=pt(wt(h.hatPopVel,0),-22,16),h.hatSpin=wt(h.hatSpin,0),h.sneezeCharge=pt(wt(h.sneezeCharge,0),0,1),h.lensBombProgress=pt(wt(h.lensBombProgress,0),0,1)}function Pl(i,e,t,n,s,o,r,c){if(!(s<=.45)){if(i.action==="helping"&&(e.action==="fallen"||e.action==="staggering")&&s>ze.helperTripSpeedThreshold&&ea(i)<=0){$n(i,.6),i.velocity.x=t*1.45,i.velocity.z=n*1.45,i.velocity.y=1.9,Ln(i,1,t,n,r,c,!0);return}if(!(ea(e)>0)){if(i.action==="shoving"&&s>.6||s>1.65&&i.action!=="fallen"&&i.action!=="staggering"){if(e.action!=="fallen"&&e.action!=="getting_up"){$n(e,ze.shoveHitCooldown);const l=i.action==="shoving"?3.45:1.9;e.velocity.x+=t*l/o,e.velocity.z+=n*l/o;const h=(i.action==="shoving"?.64:.36)*(.85+.24*Math.min(s,3.2));Ln(e,h,t,n,r,c,!1)}return}if((i.action==="staggering"&&s>.52||i.action==="fallen"&&s>.78)&&e.action!=="fallen"&&e.action!=="staggering"&&e.action!=="getting_up"&&e.action!=="jumping"){$n(e,ze.shoveHitCooldown+.06);const l=2.25+.55*Math.min(s,2.8);e.velocity.x+=t*l/o,e.velocity.z+=n*l/o,i.velocity.x*=.68,i.velocity.z*=.68;const d=i.action==="staggering"?.72:.64;Ln(e,d,t,n,r,c,!1)}}}}const Se={maxDt:.05,attentionCenterRadius:.16,attentionOuterRadius:.58,referenceFov:42,zoomBoostScale:.55,showoffChargeAttention:.44,showoffLoseSpotlightAttention:.28,showoffTelegraphDuration:.8,showoffChargeSpeed:2.75,showoffLensBombChargeSpeed:3.2,showoffLensBombRate:.55,showoffLensBombDecay:.65,showoffLensBombMaxZOffset:.85,showoffSlipAngularSpeed:.65,showoffSlipMinProgress:.3,showoffDriftSpeed:1.05,shyHideAttention:.5,shyRelaxAttention:.35,shyCheeseCalmAttentionMax:.62,shyHighCameraRelief:.18,shyHighElevationThreshold:.34,shyHideSpeed:1.85,shyPeekSpeed:1.45,peekerOccludedPanicTime:.3,peekerSeekOccludedTime:.3,peekerMountOccludedTime:.45,peekerMountRange:1.45,peekerCarrierSeekRange:2.3,peekerCarrierMinHeightScale:.98,peekerRideDuration:5.5,peekerTiptoeSpeed:1.65,peekerHopVy:2.45,jumperAttentionMin:.25,jumperChargeDuration:.45,jumperLaunchVy:6.6,jumperCooldown:2.4,jumperCheeseTriggerRemaining:1.5,helperDetectRadius:3.2,helperBrakeDistance:1.3,helperRushSpeed:2.55,helperApproachSpeed:1.05,helperRescueDistance:.85,helperStabilizeTime:1.1,blinkerSweepWakeSpeed:.55,blinkerClosedDuration:1.1,sneezeFirstDelayMin:4.2,sneezeFirstDelayMax:6,sneezeRepeatDelayMin:9,sneezeRepeatDelayMax:12,sneezeChargeDuration:1.65,sneezeBlastRadius:2.2,sneezeBlastSpeed:3.8,sneezePostHoldDuration:.9,henGaoChance:.4,henGaoDuration:1.7,cameraShakeDizzySpeed:1.35,cheesePostSpikeThreshold:.45},Br=new WeakMap,Us=new WeakMap,Ha=new WeakMap,Wa=new WeakMap,Xa=new WeakMap,Ns=new WeakMap,Fo=new WeakMap,Go=new WeakMap,di=new WeakMap,Oo=new WeakMap,Bs=new WeakMap,rs=new WeakMap,Vo=new WeakMap,Fr=new WeakMap;function av(i){Fr.delete(i)}const qe=new z,ti=new z,Xs=new z,rv=new z,Ho=new z,Fs=new z,Ci=new z,ss=new z,os=new z,as=new z,cv=new z,Gs=new z;function nt(i,e,t){return i<e?e:i>t?t:i}function Oh(i,e,t){const n=nt((t-i)/(e-i),0,1);return n*n*(3-2*n)}function Gr(i){let e=i;for(;e>Math.PI;)e-=Math.PI*2;for(;e<-Math.PI;)e+=Math.PI*2;return e}function Rl(i,e,t){return Gr(i+Gr(e-i)*nt(t,0,1))}function on(i,e,t,n){const s={type:t,npcId:i.spec.id,position:i.position.clone(),intensity:nt(n,.1,2)};e.push(s),i.events.push(s)}function Zt(i,e,t,n,s,o=.12){const r=e-i.position.x,c=t-i.position.z,l=Math.hypot(r,c);if(l<=o||l<1e-5)return l;const d=l<o*2.5?n*(l/(o*2.5)):n,h=r/l*d,u=c/l*d,f=1-Math.exp(-13*s);return i.velocity.x+=(h-i.velocity.x)*f,i.velocity.z+=(u-i.velocity.z)*f,l}function lv(i,e){let t=null;for(const n of i.platforms)e.spec.homePos.x>=n.minX&&e.spec.homePos.x<=n.maxX&&e.spec.homePos.z>=n.minZ&&e.spec.homePos.z<=n.maxZ&&(!t||n.height>t.height)&&(t=n);return t}function hv(i){const e=i.id==="school_trip"?.95:.88,t=Math.abs(ti.z)>.08?ti.z:-1,n=nt((e-qe.z)/t,1.5,16),s=qe.x+ti.x*n,o=nt(s,i.stageBounds.minX+.7,i.stageBounds.maxX-.7),r=nt(e,i.stageBounds.minZ+.7,i.stageBounds.maxZ-.55);return cv.set(o,0,r)}function dv(i,e,t){const n=i.stageBounds.maxZ+Se.showoffLensBombMaxZOffset,s=nt(e,i.stageBounds.minZ+.7,n),o=Math.abs(ti.z)>.08?ti.z:-1,r=nt((s-qe.z)/o,1,16),c=qe.x+ti.x*r,l=nt(c,i.stageBounds.minX+.6,i.stageBounds.maxX-.6);return t.set(l,0,s)}function uv(i,e,t){e.updateMatrixWorld(),e.getWorldPosition(qe),e.getWorldDirection(ti),Xs.setFromMatrixColumn(e.matrixWorld,0).normalize(),rv.setFromMatrixColumn(e.matrixWorld,1).normalize();const n=(Se.referenceFov-e.fov)/18,s=n>=0?1+Se.zoomBoostScale*nt(n,0,1.1):Math.max(.76,1+.25*n);for(const o of i){if(Fs.subVectors(o.headWorldPos,qe),Fs.dot(ti)<=.25){o.screenNdc.set(0,0,2),o.cameraAttention=0,o.isOccludedFromCamera=!0;continue}Ho.copy(o.headWorldPos).project(e),o.screenNdc.copy(Ho);const c=Math.hypot(Ho.x,Ho.y);let l;c<Se.attentionCenterRadius?l=1:c>=Se.attentionOuterRadius?l=0:l=1-Oh(Se.attentionCenterRadius,Se.attentionOuterRadius,c),o.cameraAttention=nt(l*s,0,1)}for(const o of i){if(o.screenNdc.z>1.2){o.isOccludedFromCamera=!0;continue}Fs.subVectors(o.headWorldPos,qe);const r=Fs.length();if(r<.2){o.isOccludedFromCamera=!1;continue}Ci.copy(Fs).divideScalar(r);let c=!1;for(const u of i){if(u===o||u.action==="fallen"||u.spec.id===o.carrierId||u.spec.id===o.riderId)continue;os.subVectors(u.headWorldPos,qe);const f=os.dot(Ci);if(f>.15&&f<r-.14){as.copy(qe).addScaledVector(Ci,f);const v=u.headRadius*1.12;if(as.distanceToSquared(u.headWorldPos)<v*v){c=!0;break}}ss.set(u.position.x,u.position.y+u.height*.62*u.squashY,u.position.z),os.subVectors(ss,qe);const a=os.dot(Ci);if(a>.15&&a<r-.14){as.copy(qe).addScaledVector(Ci,a);const v=u.radius*.98;if(as.distanceToSquared(ss)<v*v){c=!0;break}}ss.set(u.position.x,u.position.y+u.height*.42*u.squashY,u.position.z),os.subVectors(ss,qe);const p=os.dot(Ci);if(p>.15&&p<r-.14){as.copy(qe).addScaledVector(Ci,p);const v=u.radius*.96;if(as.distanceToSquared(ss)<v*v){c=!0;break}}}o.isOccludedFromCamera=c;const l=Br.get(o)??0,h=o.position.y>o.groundY+.06?.45:2.2;Br.set(o,c?l+t:Math.max(0,l-t*h))}}function fv(i){return i.screenNdc.z>=-1&&i.screenNdc.z<=1&&Math.abs(i.screenNdc.x)<=.98&&Math.abs(i.screenNdc.y)<=.98}function ui(i,e,t,n,s,o=0,r=0,c=!1){const l=Math.hypot(i.velocity.x,i.velocity.z),d=Math.atan2(qe.x-i.position.x,qe.z-i.position.z);let h=d;if(c&&l>.45){const b=Math.atan2(i.velocity.x,i.velocity.z);h=Rl(d,b,.72)}const u=i.action==="shoving"||i.action==="helping"?9.5:5.5;i.facingYaw=Rl(i.facingYaw,h,1-Math.exp(-u*e));const f=t-i.headWorldPos.x,a=n-i.headWorldPos.y,p=s-i.headWorldPos.z,v=Math.max(.25,Math.hypot(f,p)),m=Math.atan2(f,p),g=nt(Gr(m-i.facingYaw)+o,-.95,.95),S=nt(Math.atan2(a,v)+r,-.4,.52),_=i.cheeseBuffTimer>0?13:6.8,y=1-Math.exp(-_*e);i.headYawOffset+=(g-i.headYawOffset)*y,i.headPitchOffset+=(S-i.headPitchOffset)*y,l>.15&&i.action!=="jumping"&&i.action!=="riding_shoulders"?i.walkPhase+=l*e*6.4:i.walkPhase+=e*(i.action==="tiptoe"?5.2:1.9)}function qn(i,e){let t=0,n=0;if(i.action==="fallen"){let r=Ha.get(i);r||(r=i.tiltZ>=0?1:-1,Ha.set(i,r)),t=.22,n=r*1.32}else{if(Ha.delete(i),i.sneezeCharge>0)t=-.32*i.sneezeCharge,n=Math.sin(i.walkPhase*20)*.1*i.sneezeCharge;else if(i.action==="staggering")t=Math.sin(i.walkPhase*2.2)*.28,n=Math.cos(i.walkPhase*2.5)*.34;else if(i.action==="shoving")t=.22+i.lensBombProgress*.14,n=Math.sin(i.walkPhase*1.4)*.09;else if(i.action==="helping")t=.26,n=Math.sin(i.walkPhase*1.2)*.06;else if(i.action==="hiding")t=.16,n=i.screenNdc.x>=0?-.14:.14;else if(i.action==="jump_charge")t=.18;else if(i.action==="jumping"&&(i.expression==="surprised"||i.balance<.7))t=Math.sin(i.walkPhase*4.5+i.position.x)*.48,n=Math.cos(i.walkPhase*5+i.position.z)*.54;else if(i.action==="carrying_rider")n=Math.sin(i.walkPhase*1.1)*.07;else if(i.action==="getting_up"){const c=nt(1-i.actionTimer/.75,0,1);t=(1-c)*.55,n=(1-c)*.45}const r=rs.get(i)??0;if(r>0&&i.sneezeCharge<=0){const c=Math.min(1,r/.45);t+=Math.sin(i.walkPhase*5.2+i.position.x)*.2*c,n+=Math.cos(i.walkPhase*5.8+i.position.z)*.28*c}}const s=i.action==="fallen"?9:7.5,o=1-Math.exp(-s*e);i.tiltX+=(t-i.tiltX)*o,i.tiltZ+=(n-i.tiltZ)*o}function pv(i,e,t,n,s,o,r,c){if(!Number.isFinite(s)||s<=0)return;const l=Math.min(s,Se.maxDt);uv(i,t,l);const d=hv(e),h=nt(-ti.y,-.5,1),u=new Map;for(const a of i)u.set(a.spec.id,a);let f=Fr.get(i);if(f||(f={nextSneezeTimer:Se.sneezeFirstDelayMin+o()*(Se.sneezeFirstDelayMax-Se.sneezeFirstDelayMin),activeSneezerId:null},Fr.set(i,f)),f.activeSneezerId!==null){const a=u.get(f.activeSneezerId);(!a||a.sneezeCharge<=0||a.action==="fallen"||a.action==="staggering"||a.action==="getting_up")&&(a&&a.sneezeCharge>0&&(a.sneezeCharge=0),f.activeSneezerId=null,f.nextSneezeTimer=Se.sneezeRepeatDelayMin+o()*(Se.sneezeRepeatDelayMax-Se.sneezeRepeatDelayMin))}else if(f.nextSneezeTimer-=l,f.nextSneezeTimer<=0){const a=[];for(const p of i)p.spec.archetype==="blinker"&&(p.action==="fallen"||p.action==="staggering"||p.action==="getting_up"||p.action==="riding_shoulders"||p.cheeseBuffTimer>0||(Bs.get(p)??0)>0||a.push(p));if(a.length===0)f.nextSneezeTimer=1;else{const p=a.find(m=>m.spec.id.includes("grandpa")),v=p&&(a.length===1||o()<.65)?p:a[Math.floor(o()*a.length)];v.sneezeCharge=.01,v.expression="sneeze",v.reactionIcon="🤧",v.reactionTimer=1.8,v.poseIntensity=.25,f.activeSneezerId=v.spec.id,on(v,r,"sneeze_charge",.95)}}for(const a of i){a.reactionTimer=Math.max(0,a.reactionTimer-l),a.reactionTimer<=0&&(a.reactionIcon=""),a.cooldownTimer=Math.max(0,a.cooldownTimer-l);const p=Fo.get(a)??0;p>0&&Fo.set(a,Math.max(0,p-l));const v=di.get(a)??0;v>0&&di.set(a,Math.max(0,v-l));const m=Bs.get(a)??0;m>0&&Bs.set(a,Math.max(0,m-l));const g=rs.get(a)??0;g>0&&rs.set(a,Math.max(0,g-l));const S=Vo.get(a)??0;S>0&&Vo.set(a,Math.max(0,S-l));const _=a.cheeseBuffTimer;if(a.cheeseBuffTimer=Math.max(0,a.cheeseBuffTimer-l),a.cheeseBuffTimer<=0&&(Wa.set(a,!1),Xa.set(a,!1)),_>=Se.cheesePostSpikeThreshold&&a.cheeseBuffTimer<Se.cheesePostSpikeThreshold&&!Xa.get(a)&&(Xa.set(a,!0),a.spec.archetype==="showoff"&&a.action!=="fallen"&&a.action!=="staggering"?(a.excitement=nt(a.excitement+.65,0,1),o()<Se.henGaoChance?(di.set(a,Se.henGaoDuration),a.expression="hen_gao",a.reactionIcon="🤪",a.reactionTimer=Se.henGaoDuration):(a.reactionIcon="💢",a.reactionTimer=.7)):a.spec.archetype==="jumper"&&a.action!=="fallen"&&a.action!=="staggering"&&(a.excitement=nt(a.excitement+.55,0,1),o()<Se.henGaoChance&&(di.set(a,Se.henGaoDuration),a.expression="hen_gao",a.reactionIcon="🤪",a.reactionTimer=Se.henGaoDuration))),a.action==="fallen"){a.actionTimer-=l,a.sneezeCharge=0;const L=(Vo.get(a)??0)>0;a.expression=L?"surprised":"dizzy",a.reactionIcon=L?"!":"💫",a.reactionTimer=Math.max(a.reactionTimer,.2),a.poseIntensity=0,a.actionTimer<=0&&(a.action="getting_up",a.actionTimer=.75,a.balance=.68,a.expression="nervous",a.reactionIcon="💦",a.reactionTimer=.7,on(a,r,"get_up",.7)),qn(a,l);continue}if(a.action==="getting_up"){a.actionTimer-=l,a.lensBombProgress=Math.max(0,a.lensBombProgress-l*1.2),a.poseIntensity=0,a.actionTimer<=0&&(a.action="idle",a.balance=Math.max(a.balance,.85),a.expression="smile",a.reactionIcon="✨",a.reactionTimer=.5),ui(a,l,qe.x,qe.y,qe.z),qn(a,l);continue}if(a.action==="staggering"){a.actionTimer-=l,a.sneezeCharge=0,a.lensBombProgress=Math.max(0,a.lensBombProgress-l*.9),a.expression="surprised",a.poseIntensity=0,a.actionTimer<=0&&(a.action=a.riderId!==null?"carrying_rider":"idle",a.balance=Math.max(a.balance,.58)),ui(a,l,qe.x,qe.y,qe.z),qn(a,l);continue}if(a.action==="jump_charge"){a.actionTimer-=l,a.squashY+=(.76-a.squashY)*(1-Math.exp(-14*l)),a.expression="smile",a.reactionIcon="★",a.reactionTimer=Math.max(a.reactionTimer,.2),a.poseIntensity=.3,a.actionTimer<=0&&(a.action="jumping",a.actionTimer=.35,a.velocity.y=Se.jumperLaunchVy,a.squashY=1.24,a.excitement=0,a.poseIntensity=1,o()<Se.henGaoChance?(di.set(a,Se.henGaoDuration),a.expression="hen_gao",a.reactionIcon="🤪",a.reactionTimer=Se.henGaoDuration):(a.expression="cheese",a.reactionIcon="✌",a.reactionTimer=.95),a.cooldownTimer=Se.jumperCooldown,on(a,r,"jump",1)),ui(a,l,qe.x,qe.y,qe.z),qn(a,l);continue}if(a.action==="jumping"){a.actionTimer=Math.max(0,a.actionTimer-l);const L=a.expression==="surprised"||a.balance<.7;if(L)a.expression="surprised",a.reactionIcon="!",a.reactionTimer=Math.max(a.reactionTimer,.25),a.poseIntensity=.2;else{const B=(di.get(a)??0)>0;a.expression=B?"hen_gao":"cheese",a.reactionIcon=B?"🤪":"✌",a.reactionTimer=Math.max(a.reactionTimer,.25),a.poseIntensity=1}a.position.y<=a.groundY+.03&&a.velocity.y<=0&&a.actionTimer<=0&&(L?(a.action="staggering",a.actionTimer=.55):(a.action="posing",a.actionTimer=.55)),ui(a,l,qe.x,qe.y,qe.z),qn(a,l);continue}if(a.action==="riding_shoulders"){a.actionTimer-=l;const L=a.carrierId?u.get(a.carrierId):void 0;if(!L||L.action==="fallen"||a.actionTimer<=0){L&&L.riderId===a.spec.id&&(L.riderId=null,L.action==="carrying_rider"&&(L.action="idle")),a.carrierId=null,a.action="idle",a.cooldownTimer=4.6;const B=a.spec.homePos.x>=0?1:-1;a.position.x+=B*.45,a.velocity.set(B*.9,1.8,.3),a.reactionIcon="✨",a.reactionTimer=.6}else{a.expression="cheese",a.reactionIcon="✌",a.reactionTimer=Math.max(a.reactionTimer,.25),a.poseIntensity=1,ui(a,l,qe.x,qe.y,qe.z),qn(a,l);continue}}if(a.action==="carrying_rider"){const L=a.riderId?u.get(a.riderId):void 0;if(!L||L.carrierId!==a.spec.id||L.action!=="riding_shoulders")a.riderId=null,a.action="idle";else{Math.hypot(a.spec.homePos.x-a.position.x,a.spec.homePos.z-a.position.z)>.3&&Zt(a,a.spec.homePos.x,a.spec.homePos.z,.85,l,.15),a.expression=a.cheeseBuffTimer>0?"cheese":"smile",a.poseIntensity=.5,ui(a,l,qe.x,qe.y,qe.z),qn(a,l);continue}}if(a.sneezeCharge>0)if(a.cheeseBuffTimer>0)a.sneezeCharge=0,a.reactionIcon="!",a.reactionTimer=Math.max(a.reactionTimer,.9);else{if(a.sneezeCharge=nt(a.sneezeCharge+l/Se.sneezeChargeDuration,0,1),a.action="idle",a.expression="sneeze",a.reactionIcon="🤧",a.reactionTimer=Math.max(a.reactionTimer,.35),a.poseIntensity=.25,a.squashY=nt(1+.13*a.sneezeCharge+Math.sin(a.walkPhase*16)*.035,.85,1.22),a.sneezeCharge>=1){a.sneezeCharge=0,Bs.set(a,Se.sneezePostHoldDuration),a.expression="sneeze",a.reactionIcon="🤧",a.reactionTimer=1.05,a.squashY=.74,a.tiltX=.58,a.velocity.z-=1.35,In(a,r,5.2,!0),on(a,r,"sneeze_blast",1.65);const L=Se.sneezeBlastRadius;for(const B of i){if(B===a||B.action==="riding_shoulders")continue;const F=B.position.x-a.position.x,G=B.position.z-a.position.z,O=Math.hypot(F,G);if(O>L)continue;const N=O>1e-4?F/O:0,V=O>1e-4?G/O:-1;let $=N*.78,he=V*.78-.35;const _e=Math.hypot($,he);_e>1e-4?($/=_e,he/=_e):($=N,he=V);const Z=nt(1-O/L,.25,1),ne=Se.sneezeBlastSpeed*(.68+.32*Z);B.velocity.x+=$*ne,B.velocity.z+=he*ne,B.velocity.y=Math.max(B.velocity.y,1.65+.9*Z);const fe=.55+.4*Z;iv(B,fe,$,he,u,r,!1),In(B,r,5+Z*1.4,!0)}f.activeSneezerId=null,f.nextSneezeTimer=Se.sneezeRepeatDelayMin+o()*(Se.sneezeRepeatDelayMax-Se.sneezeRepeatDelayMin)}ui(a,l,qe.x,qe.y,qe.z,0,.34*a.sneezeCharge),qn(a,l);continue}let y=qe.x,b=qe.y,w=qe.z,T=0,E=0,M=!1;const x=fv(a);switch(a.spec.archetype){case"vip":{const L=Math.hypot(a.spec.homePos.x-a.position.x,a.spec.homePos.z-a.position.z),B=e.id==="sports_day"?.16:.22;L>B?(a.action="moving",Zt(a,a.spec.homePos.x,a.spec.homePos.z,1.48,l,.12),L>.72?(a.expression="surprised",a.reactionIcon="💦",a.reactionTimer=Math.max(a.reactionTimer,.55),a.poseIntensity=.15):(a.expression="smile",a.poseIntensity=.45)):(a.action=a.cameraAttention>.35||a.cheeseBuffTimer>0?"posing":"idle",a.expression=a.cheeseBuffTimer>0||a.cameraAttention>.65?"cheese":x?"smile":"neutral",a.poseIntensity=a.cheeseBuffTimer>0?.95:x?.78:.2);break}case"showoff":{let L=Ns.get(a)??0;if(a.lensBombProgress>Se.showoffSlipMinProgress&&n>Se.showoffSlipAngularSpeed){const G=Math.abs(a.velocity.x)>.15?Math.sign(a.velocity.x):a.spec.homePos.x>=0?1:-1;a.action="fallen",a.actionTimer=2.65,Vo.set(a,.48),a.balance=0,a.lensBombProgress=0,Go.set(a,!1),Oo.set(a,!1),Ns.set(a,0),a.excitement=.15,a.expression="surprised",a.reactionIcon="!",a.reactionTimer=1.6,a.poseIntensity=0,a.tiltX=.92,a.squashY=.82,a.velocity.x=a.velocity.x*.75+G*1.45,a.velocity.z=Math.max(a.velocity.z*.85,2.35),a.velocity.y=Math.max(a.velocity.y,1.55),In(a,r,5.4,!0),on(a,r,"slip",1.3);break}if(a.cheeseBuffTimer>.9&&a.action!=="shoving"&&a.excitement<=.65&&a.lensBombProgress<.3){a.action="posing",a.expression="cheese",a.poseIntensity=1;break}const B=a.cameraAttention>Se.showoffChargeAttention,F=B||a.excitement>.78;if(B){const G=a.lensBombProgress;a.lensBombProgress=nt(a.lensBombProgress+Se.showoffLensBombRate*l,0,1),a.lensBombProgress>.55&&!Oo.get(a)&&(Oo.set(a,!0),o()<Se.henGaoChance&&di.set(a,Se.henGaoDuration)),G<.7&&a.lensBombProgress>=.7&&!Go.get(a)&&(Go.set(a,!0),on(a,r,"lens_bomb",1.3))}else a.lensBombProgress=nt(a.lensBombProgress-Se.showoffLensBombDecay*l,0,1),a.lensBombProgress<.3&&(Go.set(a,!1),Oo.set(a,!1));if(F){a.excitement=nt(a.excitement+.48*l,0,1),L=Math.min(Se.showoffTelegraphDuration,L+l),Ns.set(a,L);const G=Oh(.12,.82,a.lensBombProgress),O=e.stageBounds.maxZ+Se.showoffLensBombMaxZOffset,N=d.z+(O-d.z)*G;dv(e,N,Gs);const V=Math.hypot(Gs.x-a.position.x,Gs.z-a.position.z);if(L<Se.showoffTelegraphDuration&&a.action!=="shoving"&&a.lensBombProgress<.25&&V>.45)a.action="posing",a.expression="smug",a.reactionIcon=L<.45?"★":"💢",a.reactionTimer=Math.max(a.reactionTimer,.3),a.poseIntensity=.75;else if(V>.38){a.action="shoving";const $=a.lensBombProgress>.3?Se.showoffLensBombChargeSpeed:Se.showoffChargeSpeed;Zt(a,Gs.x,Gs.z,$,l,.18),M=!0,a.expression="smug",a.reactionIcon=a.lensBombProgress>=.7?"✌":"💢",a.reactionTimer=Math.max(a.reactionTimer,.35),a.poseIntensity=a.lensBombProgress>=.55?.9:.4}else{const $=a.action==="shoving";a.action="posing",a.expression="smug",a.reactionIcon=a.lensBombProgress>=.5?"✌":"★",a.reactionTimer=Math.max(a.reactionTimer,.45),a.poseIntensity=1,$&&a.cooldownTimer<=0&&(a.cooldownTimer=1.4,on(a,r,"pose",.85))}}else if(a.cameraAttention<Se.showoffLoseSpotlightAttention){const G=a.action==="shoving"||a.action==="posing";L=Math.max(0,L-l*1.4),Ns.set(a,L),a.excitement=nt(a.excitement-.55*l,0,1),G&&(a.reactionIcon="?",a.reactionTimer=.85);const O=a.spec.homePos.x*.85+d.x*.15,N=a.spec.homePos.z,V=Zt(a,O,N,Se.showoffDriftSpeed,l,.22);a.action=V>.26?"moving":"idle",a.expression="neutral",a.poseIntensity=.15}else L=Math.max(0,L-l*.5),Ns.set(a,L),a.excitement=nt(a.excitement+.08*l,0,1),a.action="idle",a.expression="smug",a.poseIntensity=.5;break}case"shy":{const L=h>Se.shyHighElevationThreshold?Se.shyHighCameraRelief:0,B=a.cameraAttention-L,F=a.cheeseBuffTimer>.45&&a.cameraAttention<Se.shyCheeseCalmAttentionMax;if(B>Se.shyHideAttention&&!F){a.action="hiding",a.expression="nervous",a.reactionIcon="💦",a.reactionTimer=Math.max(a.reactionTimer,.4),a.poseIntensity=0;let G=null,O=2.9*2.9;for(const N of i){if(N===a||N.action==="fallen"||N.action==="riding_shoulders"||N.height<a.height*.94)continue;const V=(N.position.x-a.position.x)**2+(N.position.z-a.position.z)**2;V<O&&(O=V,G=N)}if(G){let N=G.position.x-qe.x,V=G.position.z-qe.z;const $=Math.hypot(N,V);$>1e-4?(N/=$,V/=$):(N=0,V=-1);const he=G.radius+a.radius+.22,_e=nt(G.position.x+N*he,e.stageBounds.minX+.45,e.stageBounds.maxX-.45),Z=nt(G.position.z+V*he,e.stageBounds.minZ+.45,e.stageBounds.maxZ-.45);Zt(a,_e,Z,Se.shyHideSpeed,l,.14)}else{const N=a.screenNdc.x>=0?1:-1;Zt(a,a.position.x+Xs.x*N*.9,a.position.z+Xs.z*N*.9-.35,Se.shyHideSpeed,l,.12)}T=a.screenNdc.x>=0?.52:-.52,E=-.2}else if(B<Se.shyRelaxAttention||F){const G=a.action==="hiding";G&&(a.reactionIcon="✨",a.reactionTimer=.95,a.cooldownTimer<=0&&(a.cooldownTimer=1.1,on(a,r,"peek_pop",.75)));const O=Zt(a,a.spec.homePos.x,a.spec.homePos.z,Se.shyPeekSpeed,l,.18);a.action=O>.22||G?"peeking":"posing",a.expression=F?"cheese":"smile",a.poseIntensity=F?.85:.65}else a.action="idle",a.expression="nervous",a.poseIntensity=.1;break}case"peeker":{const L=Br.get(a)??0;if(L>Se.peekerOccludedPanicTime){a.expression="surprised",a.reactionIcon="💦",a.reactionTimer=Math.max(a.reactionTimer,.35);let B=null,F=1/0,G=null,O=Se.peekerCarrierSeekRange;for(const V of i){if(V===a||V.spec.appearance.heightScale<Se.peekerCarrierMinHeightScale||V.riderId!==null||V.carrierId!==null||V.action==="fallen"||V.action==="staggering"||V.action==="getting_up"||V.action==="jumping"||V.action==="shoving"||V.action==="jump_charge"||V.spec.appearance.outfitStyle==="wedding_dress")continue;const $=Math.hypot(V.position.x-a.position.x,V.position.z-a.position.z);if($<O&&(O=$,G=V),$<=Se.peekerMountRange){const he=$+(V.spec.isVip?.55:0);he<F&&(F=he,B=V)}}if(B&&L>Se.peekerMountOccludedTime&&a.cooldownTimer<=0){a.carrierId=B.spec.id,B.riderId=a.spec.id,a.action="riding_shoulders",a.actionTimer=Se.peekerRideDuration,B.action="carrying_rider",a.expression="cheese",a.reactionIcon="✌",a.reactionTimer=1.25,a.poseIntensity=1,a.squashY=1.15,on(a,r,"shoulder_mount",1);break}if(a.action="tiptoe",a.squashY+=(1.1-a.squashY)*(1-Math.exp(-10*l)),a.poseIntensity=.45,G&&L>Se.peekerSeekOccludedTime&&a.cooldownTimer<=0)Zt(a,G.position.x,G.position.z,Se.peekerTiptoeSpeed,l,.2);else{const V=a.position.x<=a.spec.homePos.x?1:-1,$=nt(a.position.x+Xs.x*V*.85,e.stageBounds.minX+.5,e.stageBounds.maxX-.5),he=nt(a.position.z+Xs.z*V*.85,e.stageBounds.minZ+.5,e.stageBounds.maxZ-.5);Zt(a,$,he,Se.peekerTiptoeSpeed,l,.12)}const N=Fo.get(a)??0;a.position.y<=a.groundY+.03&&N<=0&&(a.velocity.y=Se.peekerHopVy,Fo.set(a,.85),on(a,r,"peek_pop",.7))}else a.action==="tiptoe"?(a.action="peeking",a.actionTimer=1.2,a.reactionIcon="✨",a.reactionTimer=.85,on(a,r,"peek_pop",.8)):a.action==="peeking"?(a.actionTimer=Math.max(0,a.actionTimer-l),a.actionTimer<=0&&(a.action="idle")):Math.hypot(a.spec.homePos.x-a.position.x,a.spec.homePos.z-a.position.z)>.95?(a.action="moving",Zt(a,a.spec.homePos.x,a.spec.homePos.z,1.2,l,.35)):a.action=x?"posing":"idle",a.expression=a.cheeseBuffTimer>0||a.action==="peeking"?"cheese":"smile",a.poseIntensity=x?.78:.25;break}case"jumper":{const L=a.position.y<=a.groundY+.04;if(a.action==="posing"){a.actionTimer-=l,a.expression="cheese",a.poseIntensity=1,a.actionTimer<=0&&(a.action="idle");break}x&&a.cameraAttention>Se.jumperAttentionMin?(a.excitement=nt(a.excitement+(.21+.3*a.cameraAttention)*l,0,1),a.excitement>.68&&(a.reactionIcon="★",a.reactionTimer=Math.max(a.reactionTimer,.25))):a.excitement=nt(a.excitement-.2*l,0,1);const B=a.cheeseBuffTimer>.6&&a.cheeseBuffTimer<=Se.jumperCheeseTriggerRemaining&&!Wa.get(a)&&x;if(L&&a.cooldownTimer<=0&&(a.excitement>=1||B)){B&&Wa.set(a,!0),a.action="jump_charge",a.actionTimer=Se.jumperChargeDuration,a.reactionIcon="★",a.reactionTimer=.55,a.expression="smile",a.poseIntensity=.3;break}Math.hypot(a.spec.homePos.x-a.position.x,a.spec.homePos.z-a.position.z)>.36?(a.action="moving",Zt(a,a.spec.homePos.x,a.spec.homePos.z,1.42,l,.18)):a.action="idle",a.expression=a.cheeseBuffTimer>0?"cheese":x?"smile":"neutral",a.poseIntensity=a.excitement>.6?.72:.4;break}case"helper":{if(a.action==="posing"&&a.actionTimer>0){a.actionTimer-=l,a.expression="smile",a.poseIntensity=.85,a.actionTimer<=0&&(a.action="idle");break}let L=null,B=Se.helperDetectRadius;for(const F of i){if(F===a||F.action!=="fallen")continue;const G=Math.hypot(F.position.x-a.position.x,F.position.z-a.position.z);G<B&&(B=G,L=F)}if(L)if(a.action="helping",a.helpTargetId=L.spec.id,a.reactionIcon="!",a.reactionTimer=Math.max(a.reactionTimer,.35),a.expression="surprised",B>Se.helperRescueDistance){const F=Se.helperBrakeDistance-Se.helperRescueDistance,G=nt((B-Se.helperRescueDistance)/Math.max(.05,F),0,1),O=Se.helperApproachSpeed+(Se.helperRushSpeed-Se.helperApproachSpeed)*G;Zt(a,L.position.x,L.position.z,O,l,.08),M=!0,Us.set(a,0),y=L.headWorldPos.x,b=L.headWorldPos.y,w=L.headWorldPos.z}else{a.velocity.x*=Math.exp(-7.5*l),a.velocity.z*=Math.exp(-7.5*l),a.poseIntensity=.55,y=L.headWorldPos.x,b=L.headWorldPos.y,w=L.headWorldPos.z;const F=(Us.get(a)??0)+l;Us.set(a,F),F>=Se.helperStabilizeTime&&(L.action="getting_up",L.actionTimer=.65,L.balance=.82,L.expression="smile",L.reactionIcon="❤",L.reactionTimer=1.2,on(L,r,"get_up",1),a.action="posing",a.actionTimer=.75,a.helpTargetId=null,a.expression="smile",a.reactionIcon="❤",a.reactionTimer=1.2,a.poseIntensity=.9,Us.set(a,0))}else a.helpTargetId=null,Us.set(a,0),Math.hypot(a.spec.homePos.x-a.position.x,a.spec.homePos.z-a.position.z)>.28?(a.action="moving",Zt(a,a.spec.homePos.x,a.spec.homePos.z,1.38,l,.16)):a.action=x?"posing":"idle",a.expression=a.cheeseBuffTimer>0?"cheese":x?"smile":"neutral",a.poseIntensity=x?.65:.2;break}case"blinker":{if(Math.hypot(a.spec.homePos.x-a.position.x,a.spec.homePos.z-a.position.z)>.3?(a.action="moving",Zt(a,a.spec.homePos.x,a.spec.homePos.z,1.15,l,.18)):a.action="idle",n>Se.blinkerSweepWakeSpeed&&x&&a.cooldownTimer<=0){const B=a.blinkTimer<=.3;a.blinkTimer=3.2+o()*1.4,a.cooldownTimer=1.25,a.reactionIcon="!",a.reactionTimer=.9,a.expression=B?"surprised":"smile",a.poseIntensity=.6,B&&on(a,r,"peek_pop",.65)}else if(a.cheeseBuffTimer>0)a.blinkTimer=Math.max(a.blinkTimer,1.9),a.expression="cheese",a.poseIntensity=.85;else{a.blinkTimer-=l;const B=-.9,F=B-Se.blinkerClosedDuration;a.blinkTimer>0?a.blinkTimer>.7&&a.blinkTimer<2?(T=(a.spec.homePos.x>=0?1:-1)*.58,E=.16,a.expression="neutral",a.poseIntensity=.15):(a.expression=x?"smile":"neutral",a.poseIntensity=x?.5:.15):a.blinkTimer>B?(a.expression="blink_warn",a.reactionIcon="💤",a.reactionTimer=Math.max(a.reactionTimer,.25),a.poseIntensity=.1,E=-.1):a.blinkTimer>F?(a.expression="blink",a.reactionIcon="💤",a.reactionTimer=Math.max(a.reactionTimer,.25),a.poseIntensity=.05,E=-.14):(a.blinkTimer=2.6+o()*1.7,a.expression="smile",a.poseIntensity=.45)}break}}if(e.id==="sports_day"&&a.action!=="shoving"&&a.action!=="helping"&&a.action!=="hiding"){const L=lv(e,a);if(L&&Math.abs(a.groundY-L.height)<.06){const F=L.minX+.2,G=L.maxX-.2,O=L.minZ+.2,N=L.maxZ-.2;if((a.position.x<F||a.position.x>G||a.position.z<O||a.position.z>N)&&F<G&&O<N){const $=nt(a.position.x,F,G),he=nt(a.position.z,O,N),_e=$*.65+a.spec.homePos.x*.35,Z=he*.65+a.spec.homePos.z*.35,ne=a.spec.isVip?1.15:.85;Zt(a,_e,Z,ne,l,.05)}}}e.id==="tropical_beach"&&c&&(c.waveWarningTimer>0||c.waveActive)&&(a.groundY>=.2?a.action!=="hiding"&&a.action!=="helping"&&(a.expression="cheese",a.poseIntensity=Math.max(a.poseIntensity,.92),(a.reactionTimer<=.15||a.reactionIcon==="")&&(a.reactionIcon=c.waveActive?"✨":"✌",a.reactionTimer=Math.max(a.reactionTimer,.35)),E-=.08):(c.waveWarningTimer>0||c.waveActive&&c.waveProgress<.72)&&(a.expression="surprised",a.reactionIcon="💦",a.reactionTimer=Math.max(a.reactionTimer,.35),a.poseIntensity=Math.min(a.poseIntensity,.25),E=-.28));const P=a.spec.archetype==="shy"&&a.cameraAttention>=Se.shyCheeseCalmAttentionMax,k=(Bs.get(a)??0)>0,U=(di.get(a)??0)>0;if(a.cheeseBuffTimer>0&&!P&&a.action!=="fallen"&&a.action!=="shoving"&&a.action!=="helping"&&a.action!=="hiding"&&(y=qe.x,b=qe.y,w=qe.z,T=0,E=0,a.expression!=="surprised"&&!k&&!U&&(a.expression="cheese"),a.poseIntensity=Math.max(a.poseIntensity,.85)),n>Se.cameraShakeDizzySpeed&&a.action!=="fallen"&&a.action!=="shoving"){const L=rs.get(a)??0;rs.set(a,nt(Math.max(L,.55)+l*.45,0,.95)),a.balance=Math.max(.46,a.balance-.14*l)}k?(a.expression="sneeze",a.reactionIcon="🤧",a.reactionTimer=Math.max(a.reactionTimer,.25)):U&&a.action!=="hiding"&&a.action!=="fallen"?(a.expression="hen_gao",a.reactionIcon="🤪",a.reactionTimer=Math.max(a.reactionTimer,.25),a.poseIntensity=Math.max(a.poseIntensity,.95)):(rs.get(a)??0)>0&&a.action!=="hiding"&&a.action!=="fallen"&&(a.expression="dizzy",a.reactionIcon="💫",a.reactionTimer=Math.max(a.reactionTimer,.25),T+=Math.sin(a.walkPhase*5.2+a.position.x)*.35),ui(a,l,y,b,w,T,E,M),qn(a,l)}}const Ze={maxDt:.05,baseHeight:1.48,baseRadius:.3,baseHeadRadius:.24,initJitterX:.08,initJitterZ:.05,cheeseBuffDuration:2.1,intruderFirstWarningDelay:4.5,intruderRepeatDelay:11.5,intruderWarningDuration:1.7,oodamaSpanX:5.6,oodamaSpeed:3.8,oodamaY:.88,oodamaZ:.35,kusudamaDuration:4.2,beachBallSpanX:5.4,beachBallDuration:3.2,beachBallFirstWarningDelay:10.8,beachBallRepeatDelay:6.6,waveFirstWarningDelay:5.2,waveWarningDuration:1.7,waveDuration:2.1,waveRepeatCooldown:7.7};function Il(i){switch(i){case"wedding":return"dove";case"school_trip":return"deer";case"sports_day":return"oodama";case"tropical_beach":return"beach_ball"}}function Ll(i,e){switch(e){case"dove":i.position.set(6.5,1.65,2.6);break;case"deer":i.position.set(6.5,0,.2);break;case"oodama":i.position.set(6.5,Ze.oodamaY,Ze.oodamaZ);break;case"beach_ball":i.position.set(6.5,.72,.25);break}}function Dl(i){let e=2166136261;for(let t=0;t<i.length;t++)e^=i.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}function kl(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function en(i,e,t){return i<e?e:i>t?t:i}function zl(i){let e=i;for(;e>Math.PI;)e-=Math.PI*2;for(;e<-Math.PI;)e+=Math.PI*2;return e}function mv(i,e,t){return zl(i+zl(e-i)*en(t,0,1))}function qa(i){const e=Math.max(.35,(i.height-i.headRadius*.92)*i.squashY),t=Math.sin(i.tiltZ),n=Math.cos(i.tiltZ),s=Math.sin(i.tiltX),o=Math.cos(i.tiltX),r=Math.sin(i.facingYaw),c=Math.cos(i.facingYaw),l=-e*t,d=e*n,h=l,u=d*o,f=d*s,a=h*c+f*r,p=u,v=-h*r+f*c;let m=i.position.y+p;i.action==="fallen"?m=Math.max(i.groundY+i.headRadius*.95,Math.min(m,i.groundY+i.height*.34)):i.action!=="riding_shoulders"&&(m=Math.max(i.groundY+i.headRadius*.95,m)),i.headWorldPos.set(i.position.x+a,m,i.position.z+v);const g=i.facingYaw+i.headYawOffset;if(i.action==="fallen")i.headForward.set(Math.sin(g)*.35,.88,Math.cos(g)*.35).normalize();else{const S=en(i.headPitchOffset,-.75,.75),_=Math.cos(S);i.headForward.set(Math.sin(g)*_,Math.sin(S),Math.cos(g)*_).normalize()}}class gv{npcs=[];intruder;hazard;stage;rng;intruderCooldown=Ze.intruderFirstWarningDelay;intruderStartSide=-1;intruderTravelZ=.2;waveCooldown=Ze.waveFirstWarningDelay;pendingEvents=[];constructor(e,t){this.stage=e,this.rng=kl(t??Dl(e.id));const n=Il(e.id);this.intruder={kind:n,active:!1,warningTimer:0,warningSide:0,position:new z(6.5,0,.2),velocity:new z(0,0,0),facingYaw:0,phase:0,activeTimer:0},Ll(this.intruder,n),this.hazard={waveWarningTimer:0,waveProgress:0,waveActive:!1,kusudamaOpen:0,kusudamaTimer:0},this.reset(e,t)}reset(e,t){this.stage=e;const n=t!==void 0?t:Dl(e.id);this.rng=kl(n),av(this.npcs),this.npcs.length=0,this.pendingEvents.length=0;for(const o of e.roster)this.npcs.push(this.createInitialNpcState(o,e));const s=Il(e.id);this.intruder.kind=s,this.intruder.active=!1,this.intruder.warningTimer=0,this.intruder.warningSide=0,Ll(this.intruder,s),this.intruder.velocity.set(0,0,0),this.intruder.facingYaw=0,this.intruder.phase=0,this.intruder.activeTimer=0,this.intruderCooldown=e.id==="tropical_beach"?Ze.beachBallFirstWarningDelay:Ze.intruderFirstWarningDelay,this.intruderStartSide=-1,this.intruderTravelZ=.2,this.hazard.waveWarningTimer=0,this.hazard.waveProgress=0,this.hazard.waveActive=!1,this.hazard.kusudamaOpen=0,this.hazard.kusudamaTimer=0,this.waveCooldown=Ze.waveFirstWarningDelay;for(const o of this.npcs)qa(o)}triggerSayCheese(e){e.updateMatrixWorld();const t=this.stage.id==="sports_day";t&&(this.hazard.kusudamaTimer=Ze.kusudamaDuration,this.pendingEvents.push({type:"kusudama_pop",npcId:"kusudama",position:new z(0,3.6,-.85),intensity:1.6}));for(const n of this.npcs){if(n.action==="fallen"){n.actionTimer=Math.max(.25,n.actionTimer-.5),n.reactionIcon="💦",n.reactionTimer=.75;continue}if(n.action==="staggering"||n.action==="getting_up"){n.cheeseBuffTimer=Math.max(n.cheeseBuffTimer,1.2);continue}switch(n.cheeseBuffTimer=Ze.cheeseBuffDuration,n.squashY=Math.max(n.squashY,1.07),n.spec.archetype){case"blinker":n.sneezeCharge=0,n.blinkTimer=Math.max(n.blinkTimer,2.5),n.expression="cheese",n.poseIntensity=Math.max(n.poseIntensity,.85),n.reactionIcon="!",n.reactionTimer=.85;break;case"shy":n.cameraAttention<Se.shyCheeseCalmAttentionMax?(n.action==="hiding"&&(n.action="peeking"),n.expression="cheese",n.poseIntensity=Math.max(n.poseIntensity,.8),n.reactionIcon="✨",n.reactionTimer=1):(n.expression="nervous",n.reactionIcon="💦",n.reactionTimer=.85);break;case"showoff":n.action==="shoving"||n.excitement>.65?(n.excitement=en(n.excitement+.25,0,1),n.expression="smug",n.reactionIcon="💢",n.reactionTimer=.9):(n.expression="cheese",n.poseIntensity=Math.max(n.poseIntensity,.9),n.reactionIcon="★",n.reactionTimer=.9);break;case"jumper":t?(n.excitement=1,n.cooldownTimer=0):(n.excitement=Math.max(n.excitement,.72),n.cooldownTimer=Math.min(n.cooldownTimer,.45)),n.expression="cheese",n.poseIntensity=Math.max(n.poseIntensity,.95),n.reactionIcon="★",n.reactionTimer=.95;break;default:n.expression="cheese",n.poseIntensity=Math.max(n.poseIntensity,.9),n.reactionIcon="✨",n.reactionTimer=.85;break}qa(n)}}step(e,t,n){const s=Number.isFinite(e)?en(e,0,Ze.maxDt):0,o=Number.isFinite(n)?Math.max(0,n):0;for(const c of this.npcs)c.events.length=0;const r=[];if(this.pendingEvents.length>0){for(const c of this.pendingEvents)r.push(c);this.pendingEvents.length=0}if(s<=0)return r;this.updateHazard(s,r),this.updateIntruder(s,r),pv(this.npcs,this.stage,t,o,s,this.rng,r,this.hazard),ov(this.npcs,this.stage,s,r,this.intruder,this.hazard);for(const c of this.npcs)qa(c);return r}updateHazard(e,t){const n=this.hazard;if(this.stage.id==="sports_day"){if(n.kusudamaTimer>0){n.kusudamaTimer=Math.max(0,n.kusudamaTimer-e);const s=1-Math.exp(-9*e);n.kusudamaOpen=en(n.kusudamaOpen+(1-n.kusudamaOpen)*s,0,1),n.kusudamaOpen>.995&&(n.kusudamaOpen=1)}else if(n.kusudamaOpen>0){const s=1-Math.exp(-3.2*e);n.kusudamaOpen=en(n.kusudamaOpen*(1-s),0,1),n.kusudamaOpen<.005&&(n.kusudamaOpen=0)}return}if(this.stage.id==="tropical_beach"){if(!n.waveActive&&n.waveWarningTimer<=0){this.waveCooldown-=e,this.waveCooldown<=0&&(n.waveWarningTimer=Ze.waveWarningDuration,n.waveProgress=0,t.push({type:"wave_warning",npcId:"wave",position:new z(0,.2,2.6),intensity:1.1}));return}if(!n.waveActive&&n.waveWarningTimer>0){n.waveWarningTimer=Math.max(0,n.waveWarningTimer-e),n.waveWarningTimer<=0&&(n.waveActive=!0,n.waveProgress=0,t.push({type:"wave_crash",npcId:"wave",position:new z(0,.35,2.2),intensity:1.65}));return}n.waveActive&&(n.waveProgress+=e/Ze.waveDuration,n.waveProgress>=1&&(n.waveProgress=0,n.waveActive=!1,this.waveCooldown=Ze.waveRepeatCooldown))}}updateIntruder(e,t){const n=this.intruder;if(!n.active&&n.warningTimer<=0){if(this.intruderCooldown-=e,this.intruderCooldown<=0){const a=this.rng()<.5?-1:1;if(this.intruderStartSide=a,n.warningSide=a,n.warningTimer=Ze.intruderWarningDuration,n.activeTimer=0,n.velocity.set(0,0,0),n.kind==="dove")n.position.set(a*5.2,1.65,2.6);else if(n.kind==="oodama")n.position.set(a*Ze.oodamaSpanX,Ze.oodamaY,Ze.oodamaZ);else if(n.kind==="beach_ball")n.position.set(a*Ze.beachBallSpanX,.72,.25);else{this.intruderTravelZ=.05+this.rng()*.3;const p=a*4.8;n.position.set(p,an(this.stage,p,this.intruderTravelZ),this.intruderTravelZ)}}return}if(!n.active&&n.warningTimer>0){if(n.warningTimer=Math.max(0,n.warningTimer-e),n.warningTimer<=0){if(n.active=!0,n.activeTimer=0,n.phase=0,n.kind==="dove")n.position.set(this.intruderStartSide*5.2,1.65,2.6),n.velocity.set(-this.intruderStartSide*3.8,0,0),n.facingYaw=Math.atan2(-this.intruderStartSide,.25);else if(n.kind==="oodama")n.position.set(this.intruderStartSide*Ze.oodamaSpanX,Ze.oodamaY,Ze.oodamaZ),n.velocity.set(-this.intruderStartSide*Ze.oodamaSpeed,0,0),n.facingYaw=Math.atan2(-this.intruderStartSide,0);else if(n.kind==="beach_ball")n.position.set(this.intruderStartSide*Ze.beachBallSpanX,.72,.25),n.velocity.set(-this.intruderStartSide*Ze.beachBallSpanX*2/Ze.beachBallDuration,0,0),n.facingYaw=Math.atan2(-this.intruderStartSide,0);else{const a=this.intruderStartSide*4.8,p=an(this.stage,a,this.intruderTravelZ);n.position.set(a,p,this.intruderTravelZ),n.velocity.set(-this.intruderStartSide*2.8,0,0),n.facingYaw=Math.atan2(-this.intruderStartSide,0)}t.push({type:"intruder_enter",npcId:n.kind,position:n.position.clone(),intensity:1.25})}return}const s=n.position.x,o=n.position.y,r=n.position.z;n.activeTimer+=e;const c=n.activeTimer,l=this.intruderStartSide;let d=s,h=o,u=r,f=n.facingYaw;if(n.kind==="dove"){n.phase+=e*14.5;const a=1.4,p=1.2,v=1.45,m=a+p,g=m+v;if(c<a){const S=en(c/a,0,1),_=1-(1-S)*(1-S);d=l*5.2*(1-_),u=2.6+.5*_,h=1.65+Math.sin(n.phase*.55)*.22,f=S>.72?0:Math.atan2(-l,.35)}else if(c<m){const S=c-a;d=Math.sin(S*5.2)*.18,u=3.1+Math.cos(S*4.4)*.08,h=1.68+Math.sin(n.phase)*.14,f=Math.sin(S*3.5)*.16}else if(c<g){const S=en((c-m)/v,0,1),_=S*S;d=-l*5.4*_,u=3.1-.55*_,h=1.68+.42*_+Math.sin(n.phase*.65)*.18,f=Math.atan2(-l,-.18)}else{n.active=!1,n.warningSide=0,n.velocity.set(0,0,0),this.intruderCooldown=Ze.intruderRepeatDelay;return}}else if(n.kind==="oodama"){n.phase+=e*(Ze.oodamaSpeed/.92);const a=Ze.oodamaSpanX*2/Ze.oodamaSpeed;if(c<a){const p=en(c/a,0,1);d=l*Ze.oodamaSpanX*(1-2*p),h=Ze.oodamaY,u=Ze.oodamaZ,f=Math.atan2(-l,0)}else{n.active=!1,n.warningSide=0,n.velocity.set(0,0,0),this.intruderCooldown=Ze.intruderRepeatDelay;return}}else if(n.kind==="beach_ball"){n.phase+=e*2.15;const a=Ze.beachBallDuration;if(c<a){const p=en(c/a,0,1);d=l*Ze.beachBallSpanX*(1-2*p),u=.25+Math.sin(n.phase)*.75,h=.72+Math.abs(Math.sin(n.phase*2.8))*1.9,f=Math.atan2(-l,Math.cos(n.phase)*.45)}else{n.active=!1,n.warningSide=0,n.velocity.set(0,0,0),this.intruderCooldown=Ze.beachBallRepeatDelay;return}}else{n.phase+=e*10.5;const a=1.75,p=1,v=1.8,m=a+p,g=m+v;if(c<a){const S=en(c/a,0,1),_=1-Math.pow(1-S,1.45);d=l*4.8*(1-_),u=this.intruderTravelZ+Math.sin(c*2.8)*.05,h=an(this.stage,d,u),f=S>.85?0:Math.atan2(-l,0)}else if(c<m)d=0,u=this.intruderTravelZ,h=an(this.stage,d,u),f=0;else if(c<g){const S=en((c-m)/v,0,1),_=Math.pow(S,1.35);d=-l*4.8*_,u=this.intruderTravelZ+Math.sin(c*2.8)*.05,h=an(this.stage,d,u),f=Math.atan2(-l,0)}else{n.active=!1,n.warningSide=0,n.velocity.set(0,0,0),this.intruderCooldown=Ze.intruderRepeatDelay;return}}n.position.set(d,h,u),n.velocity.set((d-s)/e,(h-o)/e,(u-r)/e),n.facingYaw=mv(n.facingYaw,f,1-Math.exp(-10*e))}createInitialNpcState(e,t){const n=an(t,e.homePos.x,e.homePos.z);let s=e.homePos.x+(this.rng()*2-1)*Ze.initJitterX,o=e.homePos.z+(this.rng()*2-1)*Ze.initJitterZ;Math.abs(an(t,s,o)-n)>.02&&(s=e.homePos.x,o=e.homePos.z);const r=Ze.baseRadius*e.appearance.widthScale,c=Ze.baseHeight*e.appearance.heightScale,l=Ze.baseHeadRadius*(.85+.15*e.appearance.heightScale),d=t.stageBounds.minX+r+.1,h=t.stageBounds.maxX-r-.1,u=t.stageBounds.minZ+r+.1,f=t.stageBounds.maxZ-r-.1;s=en(s,d,h),o=en(o,u,f);const a=an(t,s,o),p=e.homePos.x>=0?1:-1,v=e.archetype==="blinker"?.6+this.rng()*1.2:2.5+this.rng()*3,m=e.archetype==="showoff"?.45:e.archetype==="jumper"?this.rng()*.38:0,g=e.archetype==="blinker"?p*(.45+this.rng()*.25):e.archetype==="shy"?p*.34:0,S=e.archetype==="shy"?"nervous":e.archetype==="showoff"?"smug":e.archetype==="blinker"?"neutral":"smile";return{spec:e,position:new z(s,a,o),velocity:new z(0,0,0),groundY:a,facingYaw:(this.rng()*2-1)*.14,headYawOffset:g,headPitchOffset:e.archetype==="shy"?-.12:.08,tiltX:0,tiltZ:0,squashY:1,radius:r,height:c,headRadius:l,headWorldPos:new z(s,a+c-l,o),headForward:new z(0,0,1),action:"idle",actionTimer:0,expression:S,reactionIcon:"",reactionTimer:0,balance:1,excitement:m,blinkTimer:v,cheeseBuffTimer:0,poseIntensity:e.isVip?.65:e.archetype==="showoff"?.55:e.archetype==="shy"?.15:.35,walkPhase:this.rng()*Math.PI*2,cameraAttention:0,isOccludedFromCamera:!1,screenNdc:new z(0,0,0),riderId:null,carrierId:null,helpTargetId:null,cooldownTimer:0,hatPopHeight:0,hatPopVel:0,hatSpin:0,sneezeCharge:0,lensBombProgress:0,events:[]}}}const Ul={cheese:1,smile:.95,smug:.78,neutral:.65,nervous:.48,blink_warn:.45,surprised:.35,hen_gao:.28,sneeze:.16,blink:.1,dizzy:.05};function Rt(i,e,t){return i<e?e:i>t?t:i}function vv(i,e,t,n,s,o,r,c,l,d,h,u){const f=i-l,a=e-d,p=t-h,v=f*n+a*s+p*o,m=f*f+a*a+p*p-u*u,g=v*v-m;if(g<0)return!1;const S=Math.sqrt(g),_=-v-S;return-v+S>r&&_<c}function yv(i,e,t,n,s,o,r,c,l,d,h,u){const f=n-i,a=s-e,p=o-t,v=d-r,m=h-c,g=u-l,S=i-r,_=e-c,y=t-l,b=f*f+a*a+p*p,w=v*v+m*m+g*g,T=v*S+m*_+g*y,E=1e-8;let M,x;if(b<=E&&w<=E)return S*S+_*_+y*y;if(b<=E)M=0,x=Rt(T/w,0,1);else{const L=f*S+a*_+p*y;if(w<=E)x=0,M=Rt(-L/b,0,1);else{const B=f*v+a*m+p*g,F=b*w-B*B;F!==0?M=Rt((B*T-L*w)/F,0,1):M=0,x=(B*M+T)/w,x<0?(x=0,M=Rt(-L/b,0,1)):x>1&&(x=1,M=Rt((B-L)/b,0,1))}}const P=i+f*M-(r+v*x),k=e+a*M-(c+m*x),U=t+p*M-(l+g*x);return P*P+k*k+U*U}class _v{_camPos=new z;_camRight=new z;_camForward=new z;_ndc=new z;_toCam=new z;_rayOffsets=[0,-.55,.55];_emptyBlockedIds=[];_evalById=new Map;_evalPool=[];_liveClassifyScratch={status:"good",label:""};_scratchCap=0;_dists=new Float64Array(0);_capAx=new Float64Array(0);_capAy=new Float64Array(0);_capAz=new Float64Array(0);_capBx=new Float64Array(0);_capBy=new Float64Array(0);_capBz=new Float64Array(0);_torsoR=new Float64Array(0);_headR=new Float64Array(0);ensureScratchCapacity(e){if(e<=this._scratchCap)return;const t=Math.max(e,16);this._scratchCap=t,this._dists=new Float64Array(t),this._capAx=new Float64Array(t),this._capAy=new Float64Array(t),this._capAz=new Float64Array(t),this._capBx=new Float64Array(t),this._capBy=new Float64Array(t),this._capBz=new Float64Array(t),this._torsoR=new Float64Array(t),this._headR=new Float64Array(t)}evaluateLive(e,t,n,s){const o=e.length,r=this.analyzeNpcs(e,t,!1),c=!!(s&&s.kusudamaOpen>.35),l=this.computeScores(r,o,c);let d=0,h=0,u=0,f=0,a=!1,p=!1;const v=new Array(o);for(let g=0;g<o;g++){const S=r[g],_=S.npc,y=S.inFrame&&S.visibleRatio>=.67;_.sneezeCharge>.2&&(a=!0),_.lensBombProgress>.55&&(p=!0),_.spec.isVip&&(f++,y&&u++),y&&(d++,S.lookingAtCamera&&_.action!=="fallen"&&(_.expression==="smile"||_.expression==="cheese"||_.expression==="smug")&&h++),this.classifyLiveBoxInto(S,this._liveClassifyScratch),v[g]={npcId:_.spec.id,name:_.spec.name,isVip:_.spec.isVip,archetype:_.spec.archetype,screenX:S.screenX,screenY:S.screenY,boxSize:S.faceScreenSize,status:this._liveClassifyScratch.status,label:this._liveClassifyScratch.label,visibleRatio:S.visibleRatio}}let m;if(n&&(n.warningTimer>0||n.active))switch(n.kind){case"dove":m="🕊️ 暴走ハト接近中！！";break;case"deer":m="🦌 奈良のシカ乱入！！";break;case"oodama":m="🔴 暴走大玉が転がってくるぞ！！";break;case"beach_ball":m="🏐 巨大ビーチボール乱入！！";break}else s?.waveActive?m="🌊 ざっぱーん！！大波直撃中！！":s&&s.waveWarningTimer>0?m="🌊 大波が来るぞ〜！！前列あぶない！！":s&&s.kusudamaOpen>.3?m="🎊 くす玉パッカーン！！紙吹雪フィーバー！":a?m="🤧 くしゃみ爆発寸前！！":p&&(m="😱 目立ちたがりレンズ突撃中！！");return{visibleCount:d,smilingCount:h,totalCount:o,vipVisibleCount:u,vipTotalCount:f,faceBoxes:v,estimatedQuality:l.totalScore,intruderAlert:m}}isWorldPointInFrustum(e,t,n,s,o=.98,r=.96){return this._ndc.set(e,t,n).project(s),(e-this._camPos.x)*this._camForward.x+(t-this._camPos.y)*this._camForward.y+(n-this._camPos.z)*this._camForward.z>.15&&this._ndc.z>-1&&this._ndc.z<1&&Math.abs(this._ndc.x)<=o&&Math.abs(this._ndc.y)<=r}evaluatePhoto(e,t,n,s,o){const r=e.length,c=this.analyzeNpcs(e,t,!0).slice(0,r),l=!!(o?.waveActive&&o.waveProgress>.1&&o.waveProgress<.8),d=!!(o&&o.kusudamaOpen>.35),h=this.computeScores(c,r,d);let u=0,f=0,a=!0,p=0,v=0,m=0,g=0,S=0,_=0,y=0,b=0,w=0,T=0,E=!1,M=null;if(s&&s.active){const N=s.position,V=this.isWorldPointInFrustum(N.x,N.y,N.z,t),$=s.kind==="deer"?this.isWorldPointInFrustum(N.x,N.y+.95,N.z,t):s.kind==="oodama"||s.kind==="beach_ball"?this.isWorldPointInFrustum(N.x,N.y+.65,N.z,t)||this.isWorldPointInFrustum(N.x,N.y-.5,N.z,t):!1;(V||$)&&(E=!0,M=s.kind)}const x=new Map,P=this._evalById;P.clear();for(let N=0;N<r;N++)P.set(c[N].npc.spec.id,c[N]);const k=[];for(const N of c){const V=N.npc,$=N.inFrame&&N.visibleRatio>=.67;if($&&u++,V.spec.isVip&&!$&&(a=!1),V.action==="fallen"&&p++,V.action==="jumping"&&(v++,$&&!N.edgeClipped&&m++),V.expression==="blink"&&N.inFrame&&N.visibleRatio>=.33&&g++,V.action==="riding_shoulders"){S++;const he=V.carrierId?P.get(V.carrierId):void 0;$&&(!he||he.inFrame&&he.visibleRatio>=.67)&&_++}V.hatPopHeight>.16&&(N.inFrame||this.isWorldPointInFrustum(V.headWorldPos.x,V.headWorldPos.y+V.hatPopHeight,V.headWorldPos.z,t))&&y++,V.expression==="hen_gao"&&N.inFrame&&N.visibleRatio>=.33&&b++,V.expression==="sneeze"&&N.inFrame&&N.visibleRatio>=.33&&w++,N.inFrame&&N.visibleRatio>=.33&&(V.lensBombProgress>.55||N.faceScreenSize>.24)&&T++,$&&N.lookingAtCamera&&V.action!=="fallen"&&(V.expression==="smile"||V.expression==="cheese"||V.expression==="smug")&&f++;for(const he of N.blockedByIds){let _e=x.get(he);_e||(_e=new Set,x.set(he,_e)),_e.add(V.spec.id)}k.push({npcId:V.spec.id,name:V.spec.name,roleLabel:V.spec.roleLabel,isVip:V.spec.isVip,archetype:V.spec.archetype,inFrame:N.inFrame,edgeClipped:N.edgeClipped,visibleRatio:N.visibleRatio,lookingAtCamera:N.lookingAtCamera,expression:V.expression,action:V.action,screenX:N.screenX,screenY:N.screenY,faceScreenSize:N.faceScreenSize,points:this.computeNpcPoints(N),tag:this.computeVerdictTag(N)})}let U=0;E&&(U+=M==="oodama"||M==="beach_ball"?40:38),l&&(U+=32),d&&(U+=16),U+=y*26,U+=w*28,U+=T*26,U+=b*22,U+=p*18,p>=3&&(U+=14),U+=S*16,U+=v*12,U+=g*10;const L=Math.round(Rt(U,0,100)),B=this.scoreToRank(h.totalScore),F=this.detectComedyAward(c,x,p,m,_,g,u,f,E,M,l,d,y,w,T,b),{caption:G,subCaption:O}=this.generateCaptions(c,n,B,h.span,u,f,a,p,m,_,g,x,F,E,M,l,d,y,w,T,b);return{totalScore:h.totalScore,comedyScore:L,rank:B,coverageScore:h.coverageScore,expressionScore:h.expressionScore,compositionScore:h.compositionScore,momentScore:h.momentScore,visibleCount:u,smilingCount:f,totalCount:e.length,vipAllVisible:a,fallenCount:p,jumpingCount:v,blinkingCount:g,shoulderRideCount:S,flyingHatCount:y,intruderInFrame:E,intruderKind:M,waveCrashActive:l,kusudamaActive:d,henGaoCount:b,sneezeCount:w,lensBombCount:T,caption:G,subCaption:O,comedyAward:F,verdicts:k}}analyzeNpcs(e,t,n){t.updateMatrixWorld(!1),this._camPos.setFromMatrixPosition(t.matrixWorld),this._camRight.setFromMatrixColumn(t.matrixWorld,0).normalize(),this._camForward.setFromMatrixColumn(t.matrixWorld,2).negate().normalize();const s=this._camPos.x,o=this._camPos.y,r=this._camPos.z,c=this._camRight.x,l=this._camRight.y,d=this._camRight.z,h=Math.tan(ht.degToRad(t.fov)*.5),u=e.length;this.ensureScratchCapacity(u);const f=this._dists,a=this._capAx,p=this._capAy,v=this._capAz,m=this._capBx,g=this._capBy,S=this._capBz,_=this._torsoR,y=this._headR;for(let T=0;T<u;T++){const E=e[T],M=E.headWorldPos.x,x=E.headWorldPos.y,P=E.headWorldPos.z,k=M-s,U=x-o,L=P-r;f[T]=Math.sqrt(k*k+U*U+L*L);const B=E.position.x,F=E.position.y,G=E.position.z,O=M-B,N=x-F,V=P-G,$=Math.sqrt(O*O+N*N+V*V);if($>.45){const he=1/$,_e=O*he,Z=N*he,ne=V*he;a[T]=B+_e*.25,p[T]=F+Z*.25,v[T]=G+ne*.25,m[T]=M-_e*.18,g[T]=x-Z*.18,S[T]=P-ne*.18}else{const he=(B+M)*.5,_e=(F+x)*.5,Z=(G+P)*.5;a[T]=he,p[T]=_e,v[T]=Z,m[T]=he,g[T]=_e,S[T]=Z}_[T]=E.radius*.92,y[T]=E.headRadius*1.05}const b=this._rayOffsets,w=this._evalPool;for(let T=0;T<u;T++){const E=e[T],M=f[T],x=E.headWorldPos;this._ndc.copy(x).project(t);const P=(x.x-s)*this._camForward.x+(x.y-o)*this._camForward.y+(x.z-r)*this._camForward.z,U=P>.15&&this._ndc.z>-1&&this._ndc.z<1&&Math.abs(this._ndc.x)<=.94&&Math.abs(this._ndc.y)<=.92,L=U&&(Math.abs(this._ndc.x)>.86||Math.abs(this._ndc.y)>.85),F=Math.max(.35,P>.2?P:M)*h,G=Rt(E.headRadius*2.2/(F*2),.03,.48);this._toCam.set(s-x.x,o-x.y,r-x.z);const O=this._toCam.length();O>1e-5&&this._toCam.divideScalar(O);const N=E.headForward.length(),V=N>1e-5?E.headForward.dot(this._toCam)/N:0,$=E.action!=="fallen"&&V>.62;let he=0;const _e=n?[]:this._emptyBlockedIds;if(U){const fe=E.headRadius;for(let q=0;q<3;q++){const ee=b[q]*fe,K=x.x+c*ee,oe=x.y+l*ee,be=x.z+d*ee,Y=K-s,ie=oe-o,D=be-r,re=Math.sqrt(Y*Y+ie*ie+D*D);if(re<=1e-4){he++;continue}const te=1/re,pe=Y*te,ae=ie*te,xe=D*te,we=.05,I=Math.max(we+.01,re-E.headRadius*.6),A=s+pe*I,j=o+ae*I,ce=r+xe*I,ue=s+pe*we,le=o+ae*we,Ne=r+xe*we;let Ae=!1;for(let Me=0;Me<u;Me++){if(Me===T)continue;const We=e[Me];if(We.spec.id===E.carrierId||We.spec.id===E.riderId||E.spec.id===We.carrierId||E.spec.id===We.riderId||f[Me]>M+.25)continue;const me=We.headWorldPos,De=vv(s,o,r,pe,ae,xe,we,I,me.x,me.y,me.z,y[Me]);let Ve=!1;if(!De){const He=_[Me];Ve=yv(ue,le,Ne,A,j,ce,a[Me],p[Me],v[Me],m[Me],g[Me],S[Me])<=He*He}if(De||Ve){Ae=!0,n&&!_e.includes(We.spec.id)&&_e.push(We.spec.id);break}}Ae||he++}}const Z=he===3?1:he===2?.67:he===1?.33:0,ne=w[T];ne?(ne.npc=E,ne.inFrame=U,ne.edgeClipped=L,ne.visibleRatio=Z,ne.gazeDot=V,ne.lookingAtCamera=$,ne.ndcX=this._ndc.x,ne.ndcY=this._ndc.y,ne.screenX=(this._ndc.x+1)*.5,ne.screenY=(1-this._ndc.y)*.5,ne.faceScreenSize=G,ne.distToCamera=M,ne.blockedByIds=_e):w[T]={npc:E,inFrame:U,edgeClipped:L,visibleRatio:Z,gazeDot:V,lookingAtCamera:$,ndcX:this._ndc.x,ndcY:this._ndc.y,screenX:(this._ndc.x+1)*.5,screenY:(1-this._ndc.y)*.5,faceScreenSize:G,distToCamera:M,blockedByIds:_e}}return w}classifyLiveBoxInto(e,t){const{npc:n,inFrame:s,edgeClipped:o,visibleRatio:r,lookingAtCamera:c}=e;if(!s||r<.3){t.status="hidden",t.label=s?"隠れ":"枠外";return}if(n.action==="fallen"||n.expression==="sneeze"||n.expression==="blink"||n.expression==="dizzy"||o){t.status="bad",n.action==="fallen"?t.label="転倒":n.expression==="sneeze"?t.label="くしゃみ":n.expression==="dizzy"?t.label="クラクラ":n.expression==="blink"?t.label="まばたき":t.label="見切れ";return}if(r<.9||n.expression==="hen_gao"||!c||n.expression==="nervous"||n.expression==="blink_warn"||n.expression==="surprised"){t.status="warn",r<.9?t.label="かぶり":n.expression==="hen_gao"?t.label="変顔！":n.expression==="blink_warn"?t.label="うとうと":n.expression==="surprised"?t.label="びっくり":c?t.label="緊張":t.label="よそ見";return}t.status="good",t.label=""}computeScores(e,t,n=!1){if(t===0)return{totalScore:0,coverageScore:0,expressionScore:0,compositionScore:0,momentScore:0,span:0};let s=0,o=0,r=!0,c=!0,l=!0,d=0,h=0,u=0,f=0,a=1/0,p=-1/0,v=1/0,m=-1/0,g=0,S=0,_=0,y=0,b=0,w=0,T=0,E=0,M=0,x=0,P=0,k=0,U=0;const L=this._evalById;L.clear();for(let ee=0;ee<t;ee++)L.set(e[ee].npc.spec.id,e[ee]);for(let ee=0;ee<t;ee++){const K=e[ee],oe=K.npc,be=K.inFrame&&K.visibleRatio>=.67,Y=oe.spec.isVip?1.6:1;let ie=K.inFrame?K.visibleRatio:0;K.edgeClipped&&(ie*=.68),oe.action==="fallen"&&(ie*=.55),s+=Y*ie,o+=Y,be?d++:(r=!1,c=!1,oe.spec.isVip&&(l=!1)),K.edgeClipped&&(c=!1);const D=oe.spec.isVip?1.5:1,re=Ul[oe.expression]??.5;let te;oe.action==="fallen"?te=.25:K.gazeDot>=.85?te=1:K.gazeDot>=.62?te=.86+.14*((K.gazeDot-.62)/.23):K.gazeDot>=.2?te=.45+.41*((K.gazeDot-.2)/.42):te=.3;const pe=K.inFrame?K.visibleRatio>=.67?1:K.visibleRatio*.8:0;h+=D*re*te*pe,u+=D;const ae=be&&K.lookingAtCamera&&oe.action!=="fallen"&&(oe.expression==="smile"||oe.expression==="cheese"||oe.expression==="smug");ae&&f++,oe.spec.isVip&&(U++,ae&&k++),K.inFrame?(S++,K.ndcX<a&&(a=K.ndcX),K.ndcX>p&&(p=K.ndcX),K.ndcY<v&&(v=K.ndcY),K.ndcY>m&&(m=K.ndcY),g+=K.ndcY,K.edgeClipped&&_++,oe.spec.isVip&&(b+=K.ndcX,w++)):y++,oe.action==="fallen"&&P++,be&&K.lookingAtCamera&&(oe.expression==="cheese"||oe.action==="posing")&&T++,oe.action==="jumping"&&be&&!K.edgeClipped&&E++,(oe.action==="peeking"||oe.action==="tiptoe")&&be&&!K.edgeClipped&&M++,oe.action==="helping"&&be&&x++}const B=s/o*35;let F=0;c?F=5:r?F=3.2:l&&d>=t-1&&(F=1.5);const G=Rt(B+F,0,40),O=Rt(h/u*30,0,30);let N=0,V=0;if(S>0){V=(p-a)*.5;let ee;V>=.52&&V<=.84?ee=6:V<.52?ee=6*Rt((V-.14)/(.52-.14),0,1):ee=6*Rt(1-(V-.84)/.22,.35,1);const K=(a+p)*.5,oe=Rt(1-Math.abs(K)/.45,0,1);let be=.2;if(w>0){const I=b/w;be=Rt(1-Math.max(0,Math.abs(I)-.08)/.45,0,1)}const Y=5*(.55*oe+.45*be),ie=g/S,D=Rt(1-Math.max(0,Math.abs(ie-.1)-.22)/.5,0,1),re=Rt(1-Math.max(0,m-.76)/.24,0,1),te=Rt(1-Math.max(0,-.58-v)/.36,0,1),pe=5*(.45*D+.35*re+.2*te),ae=(_+y*1.35)/t,xe=4*Rt(1-ae*2.4,0,1),we=Math.min(1,S/(t*.65));N=Rt((ee+Y+pe+xe)*we,0,20)}let $=0;for(let ee=0;ee<t;ee++){const K=e[ee];if(K.npc.action==="riding_shoulders"&&K.inFrame&&K.visibleRatio>=.67){const oe=K.npc.carrierId?L.get(K.npc.carrierId):void 0;(!oe||oe.inFrame&&oe.visibleRatio>=.67)&&$++}}let he=0;he+=Math.min(3,T/t*3.4),E>=2?he+=4.5:E===1&&(he+=2.6),$>0&&(he+=Math.min(4,$*3)),M>0&&(he+=Math.min(2.2,M*1.2)),x>0&&U>0&&k===U&&(he+=1.5),r&&f>=t-1&&P===0&&(he+=1.8),n&&l&&P===0&&d>=Math.max(1,t-2)&&f>=Math.ceil(t*.55)&&(he+=2),he=Rt(he,0,10);const _e=Math.round(G),Z=Math.round(O),ne=Math.round(N),fe=Math.round(he);return{totalScore:Rt(_e+Z+ne+fe,0,100),coverageScore:_e,expressionScore:Z,compositionScore:ne,momentScore:fe,span:V}}computeNpcPoints(e){if(!e.inFrame)return 0;const t=e.npc;let n=e.visibleRatio*55;e.edgeClipped&&(n*=.72),t.action==="fallen"&&(n*=.4);const s=Ul[t.expression]??.5,o=e.lookingAtCamera?1:.45;return n+=s*o*35*(e.visibleRatio>=.67?1:.5),e.visibleRatio>=.67&&(t.action==="jumping"||t.action==="riding_shoulders"||t.action==="posing"||t.expression==="cheese")&&(n+=10),Math.round(Rt(n,0,100))}computeVerdictTag(e){const{npc:t,inFrame:n,edgeClipped:s,visibleRatio:o,lookingAtCamera:r}=e;return n?t.hatPopHeight>.16?"帽子が飛んだ！":t.expression==="sneeze"?"決定的クシャミ！":t.lensBombProgress>.55?"レンズ突撃！":t.action==="fallen"?"転倒中！":o===0?"完全に隠れた":o<.67?"後ろに隠れた":s?"端で見切れ":t.expression==="hen_gao"?"変顔テロ！":t.expression==="dizzy"?"目が回ってる":t.expression==="blink"?"目をつぶった":o<.9?"ちょっとかぶり":t.action==="riding_shoulders"?"肩車成功！":t.action==="jumping"?"空中ピース！":t.action==="peeking"||t.action==="tiptoe"?"ひょっこり成功！":t.action==="helping"?"救出中！":t.action==="staggering"?"おっとっと！":r?t.expression==="cheese"?"最高のチーズ！":t.expression==="smile"?"ベスト笑顔":t.expression==="smug"?"ドヤ顔キメ！":t.expression==="surprised"?"びっくり顔":t.expression==="blink_warn"?"眠そう…":t.expression==="nervous"?"ちょい緊張":"カメラ目線":"よそ見中":"フレーム外！"}scoreToRank(e){return e>=93?"S+":e>=84?"S":e>=72?"A":e>=56?"B":"C"}findShowoffPhotobomber(e,t){let n=null;for(const s of e){if(s.npc.spec.archetype!=="showoff"||!s.inFrame||s.visibleRatio<.67)continue;const o=t.get(s.npc.spec.id),r=o?o.size:0,c=s.faceScreenSize>=.135;(r>=1||c)&&(!n||r>n.victimCount||r===n.victimCount&&s.faceScreenSize>n.ev.faceScreenSize)&&(n={ev:s,victimCount:r})}return n}detectComedyAward(e,t,n,s,o,r,c,l,d,h,u,f,a,p,v,m){const g=e.length;if(d&&h==="oodama")return{id:"oodama_strike",badge:"🔴 人間ボウリング大玉賞",reason:"暴走大玉が表彰台の前でド派手に人間ボウリング！"};if(d&&h==="beach_ball")return{id:"beach_ball_boing",badge:"🏐 ボヨヨン直撃賞",reason:"巨大ビーチボールが常夏の記念撮影にボヨヨン直撃！"};if(d&&h==="deer")return{id:"nara_deer",badge:"🦌 奈良の刺客賞",reason:"奈良のシカが記念写真のセンターを堂々ジャック！"};if(d&&h==="dove")return{id:"rogue_dove",badge:"🕊️ ハト主役賞",reason:"暴走ハトがカメラのど真ん中を華麗に強奪！"};if(u)return{id:"wave_wipeout",badge:"🌊 大波ずぶ濡れ賞",reason:"波打ち際で大波ざっぱーん直撃の瞬間を完璧キャッチ！"};if(f&&l>=Math.ceil(g*.55)&&c>=Math.max(1,g-3)&&n<=1)return{id:"kusudama_fever",badge:"🎊 優勝パニック賞",reason:"くす玉パッカーン＆紙吹雪フィーバーを満面の笑顔で激写！"};if(n>=3)return{id:"human_bowling",badge:"💥 人間ボーリング賞",reason:`${n}人がストライク級に連鎖転倒した歴史的珍場面！`};if(p>=1)return{id:"sneeze_blast",badge:"🤧 爆風クシャミ賞",reason:"くしゃみ一発で集合写真が吹き飛んだ決定的瞬間！"};if(a>=1)return{id:"flying_hat",badge:"🎩 決定的ポロリ賞",reason:"重力に逆らって宙を舞う帽子を完璧キャッチ！"};if(v>=1)return{id:"lens_bomb",badge:"😱 距離感バグ賞",reason:"カメラレンズ至近距離まで突撃して画面を制圧！"};if(m>=1)return{id:"hen_gao_terror",badge:"🤪 変顔テロ賞",reason:"一生残る記念写真に全力の変顔をブチ込んだ勇者！"};if(n>=2)return{id:"domino_disaster",badge:"💥 ドミノ惨事賞",reason:`${n}人が見事にバタバタ転倒した決定的瞬間！`};const S=this.findShowoffPhotobomber(e,t);if(S)return{id:"showoff_hijack",badge:"🚀 最前列ジャック賞",reason:S.victimCount>0?`${S.ev.npc.spec.name}が最前列で${S.victimCount}人をブロック！`:`${S.ev.npc.spec.name}がカメラ至近距離を独り占め！`};if(s>=2)return{id:"miracle_levitation",badge:"🦘 奇跡の浮遊賞",reason:`${s}人同時ジャンプを空中で完璧キャッチ！`};if(o>=1)return{id:"shoulder_best",badge:"🦒 肩車ベストショット賞",reason:"肩車コンビがバッチリ笑顔でフレームイン！"};if(r>=2)return{id:"mass_blink",badge:"😑 全員まばたき賞",reason:`${r}人が同時に目を閉じた奇跡のシャッター！`};const _=e.filter(b=>b.npc.spec.archetype==="shy"||b.npc.spec.archetype==="peeker");if(_.length>=2&&_.every(b=>b.inFrame&&b.visibleRatio>=.67))return{id:"miracle_peek",badge:"🫣 奇跡のひょっこり賞",reason:"恥ずかしがり屋＆ひょっこり組が全員バッチリ登場！"};const y=e.find(b=>b.npc.action==="helping"&&b.inFrame&&b.visibleRatio>=.67);if(y&&n>=1)return{id:"hero_rescue",badge:"🦸 決定的救出ショット賞",reason:`${y.npc.spec.name}の全力レスキューを激写！`};if(s===1&&c===e.length){const b=e.find(w=>w.npc.action==="jumping"&&w.inFrame&&w.visibleRatio>=.67);if(b)return{id:"aerial_star",badge:"⭐ 空中ベストポーズ賞",reason:`${b.npc.spec.name}のジャンプと全員集合が同時成立！`}}return null}generateCaptions(e,t,n,s,o,r,c,l,d,h,u,f,a,p,v,m,g,S,_,y,b){const w=e.length;if(p&&v==="oodama")return{caption:"🔴 大玉ストライク！！",subCaption:"表彰台の前で人間ボウリングが開幕しました。"};if(p&&v==="beach_ball")return{caption:"🏐 巨大ビーチボール直撃！",subCaption:"ボヨヨンと吹き飛ぶ常夏メモリー！"};if(p&&v==="deer")return{caption:"🦌 鹿がセンター奪取！",subCaption:"3年2組の新メンバー（奈良県出身）が堂々の主役。"};if(p&&v==="dove")return{caption:"🕊️ ハト、顔面ドアップ乱入！",subCaption:"もはやハトの宣材写真。新郎新婦は背景です。"};if(m)return{caption:"🌊 ざっぱーん！前列全滅！！",subCaption:"波打ち際で撮影するからこうなる！"};if(g&&r>=Math.ceil(w*.55)&&o>=Math.max(1,w-3)&&l<=1)return{caption:"🎊 くす玉パッカーン！優勝最高！！",subCaption:"紙吹雪と笑顔が弾ける奇跡の優勝ショット！"};if(l>=3)return{caption:"💥 歴史的ドミノ大惨事！",subCaption:"記念撮影会場で人間ボーリング大会が開幕しました。"};if(_>=1)return{caption:"🤧 世紀のハクション爆発！",subCaption:"くしゃみ一発で集合写真が戦場と化した瞬間。"};if(S>=1)return{caption:"🎩 帽子（カツラ？）宙に舞う！！",subCaption:"重力に逆らう奇跡の1フレームを激写！"};if(y>=1)return{caption:"😱 レンズに顔面ベッタリ！",subCaption:"距離感バグりすぎ！画面の半分がお前だ！"};if(b>=1)return{caption:"🤪 ひとりだけ変顔ガチ勢！",subCaption:"一生残る写真でその顔は勇者すぎる。"};if(n==="S+"){if(d>=2)return{caption:"奇跡のパーフェクト・ジャンプ！",subCaption:"全員笑顔＋同時ジャンプまで決まった、額縁入りの神ショット！"};if(h>=1)return{caption:"肩車まで決まった伝説の一枚！",subCaption:"みんなの笑顔も構図も完璧！一生語られるベストショット。"};switch(t.id){case"wedding":return{caption:"一生モノの祝福スマイル！",subCaption:"新郎新婦もゲストも全員キラキラ！式場パンフレット確定レベル。"};case"school_trip":return{caption:"卒業アルバム表紙、確定！",subCaption:"3年2組の全員が最高の笑顔！青春がぜんぶ詰まった神写真。"};case"sports_day":return{caption:"🏆 社内報の表紙、決定！！",subCaption:"社長も社員も表彰台で全員満面の笑み！来年の採用パンフ確定！"};case"tropical_beach":return{caption:"🌴 常夏ポスター級ベストショット！",subCaption:"エメラルドの海と最高の笑顔！旅行会社のポスターにそのまま採用！"}}}if(l>=2)return{caption:"シャッターの瞬間、大惨事！",subCaption:`${l}人が仲良くゴロゴロ転倒中…笑い話としては100点満点！`};if(!c){const x=e.find(k=>k.npc.spec.isVip&&(!k.inFrame||k.visibleRatio<.67));return{caption:`あれっ、${x?x.npc.spec.name:"主役"}がいない！？`,subCaption:x&&!x.inFrame?"主役がフレーム外に！カメラ位置を少し調整して中央に入れよう。":"主役が後ろに隠れちゃった！角度を少し変えてベストポジションを探そう。"}}const T=this.findShowoffPhotobomber(e,f);if(T&&T.victimCount>=1)return{caption:`${T.ev.npc.spec.name}、主張が強すぎる！`,subCaption:`堂々の最前列ジャックで${T.victimCount}人がカゲに…カメラを少し振ってかわそう！`};if(u>=2)return{caption:"まさかのまばたき大合唱！",subCaption:`${u}人が同時にスヤァ…「はいチーズ！」で目をバッチリ覚まさせよう。`};if(l===1){const x=e.find(k=>k.npc.action==="fallen");return{caption:`おっと！${x?x.npc.spec.name:"誰か"}がすってんころりん`,subCaption:"起き上がる瞬間を待つか、このまま思い出の珍写真にするか…！？"}}if(d>=2&&o>=w-1)return{caption:"息ピッタリ！ダブル空中ピース！",subCaption:"躍動感バツグンのシャッターチャンスを見事にキャッチ！"};if(h>=1&&o>=w-1)return{caption:"ナイス肩車！背伸び大作戦、成功！",subCaption:"後ろのキッズもバッチリ見えて、微笑ましさ満点の一枚。"};if(n==="S"){if(a?.id==="miracle_peek")return{caption:"恥ずかしがり屋もバッチリ集合！",subCaption:"全員の顔がしっかり写った、あたたかいベストショット！"};switch(t.id){case"wedding":return{caption:"祝福あふれるベスト集合写真！",subCaption:"全員の笑顔が華やか！ちょっとの微調整でS+も狙えそう。"};case"school_trip":return{caption:"みんな笑顔！ナイス・クラス写真！",subCaption:"元気いっぱいの一枚！ジャンプや「はいチーズ！」でさらに高得点へ。"};case"sports_day":return{caption:"熱血ベスト・チーム写真！",subCaption:"表彰台も前列もバッチリ笑顔！くす玉やジャンプでS+を狙おう。"};case"tropical_beach":return{caption:"まぶしい常夏ベストショット！",subCaption:"大波をかわして全員ナイススマイル！もう一押しでS+確定！"}}}if(s>0&&s<.4)return{caption:"ちょっと遠すぎ！？みんな豆粒サイズ",subCaption:"ズームインして主役とみんなの表情をもっと大きく写そう！"};const E=e.find(x=>!x.inFrame||x.visibleRatio<.67||x.edgeClipped);if(o>=w-2&&E){const x=E.inFrame?E.edgeClipped?"端で見切れちゃった":"うしろに隠れちゃった":"フレーム外に";return{caption:`惜しい！${E.npc.spec.name}が${x}`,subCaption:"あと一歩で全員バッチリ！カメラの角度を少し変えてみよう。"}}return e.filter(x=>x.inFrame&&x.visibleRatio>=.67&&!x.lookingAtCamera).length>=3?{caption:"こっち向いて〜！目線バラバラショット",subCaption:"「はいチーズ！」を鳴らすと全員がカメラに注目して笑顔になるよ！"}:n==="A"?{caption:"いい雰囲気！あと一歩で大傑作",subCaption:`全員${o}/${w}人・笑顔${r}人。タイミングを合わせればSランク間違いなし！`}:n==="B"?{caption:"ドタバタ感も味がある記念写真",subCaption:"全員が重ならない角度を探して、「はいチーズ！」の直後にシャッターを切ろう！"}:{caption:"ハチャメチャ大乱戦ショット！",subCaption:"カオスすぎて逆に笑える…！次は少し引いて全員の位置を確認してみよう。"}}}const Mn=760,xn=880,Tt=40,Nt=40,Et=680,jt=510,jn='"Zen Maru Gothic", "Hiragino Maru Gothic ProN", "Yu Gothic", "Noto Sans JP", "Meiryo", sans-serif',Vh='"SF Mono", "Menlo", "Consolas", "Noto Sans JP", monospace',Sv={"S+":{ring:"#d62847",fill:"rgba(255, 248, 232, 0.92)",accent:"#f59e0b",stars:3},S:{ring:"#d63447",fill:"rgba(255, 250, 240, 0.91)",accent:"#e85d04",stars:2},A:{ring:"#e06d1f",fill:"rgba(255, 251, 242, 0.90)",accent:"#f4a261",stars:1},B:{ring:"#2a77a8",fill:"rgba(248, 252, 255, 0.90)",accent:"#48cae4",stars:0},C:{ring:"#6f5c7e",fill:"rgba(252, 249, 255, 0.90)",accent:"#9f86c0",stars:0}};function xv(i){return new Promise((e,t)=>{const n=new Image;n.crossOrigin="anonymous",n.onload=()=>e(n),n.onerror=s=>t(s),n.src=i})}function kn(i,e,t,n,s,o){const r=Math.min(o,n*.5,s*.5);i.beginPath(),i.moveTo(e+r,t),i.arcTo(e+n,t,e+n,t+s,r),i.arcTo(e+n,t+s,e,t+s,r),i.arcTo(e,t+s,e,t,r),i.arcTo(e,t,e+n,t,r),i.closePath()}function Mv(i){const e=i.createLinearGradient(0,0,Mn,xn);e.addColorStop(0,"#fdfaf3"),e.addColorStop(.55,"#f8f2e6"),e.addColorStop(1,"#efe6d5"),kn(i,1,1,Mn-2,xn-2,12),i.fillStyle=e,i.fill(),i.save(),kn(i,1,1,Mn-2,xn-2,12),i.clip();let t=13379;const n=()=>(t=t*16807%2147483647,(t-1)/2147483646);for(let o=0;o<1600;o++){const r=n()*Mn,c=n()*xn;if(r>Tt+6&&r<Tt+Et-6&&c>Nt+6&&c<Nt+jt-6)continue;const l=n()>.45,d=.018+n()*.028;i.fillStyle=l?`rgba(125, 102, 74, ${d.toFixed(3)})`:`rgba(255, 255, 255, ${(d*1.4).toFixed(3)})`;const h=n()>.85?2:1.2;i.fillRect(r,c,h,h)}const s=i.createRadialGradient(Mn*.3,xn*.25,120,Mn*.5,xn*.5,xn*.72);s.addColorStop(0,"rgba(255, 255, 255, 0.14)"),s.addColorStop(.75,"rgba(255, 255, 255, 0)"),s.addColorStop(1,"rgba(130, 104, 72, 0.09)"),i.fillStyle=s,i.fillRect(0,0,Mn,xn),i.restore(),kn(i,1.5,1.5,Mn-3,xn-3,12),i.strokeStyle="rgba(145, 125, 98, 0.35)",i.lineWidth=2,i.stroke(),kn(i,3.5,3.5,Mn-7,xn-7,10),i.strokeStyle="rgba(255, 255, 255, 0.65)",i.lineWidth=1.5,i.stroke()}function bv(i,e){if(i.save(),i.fillStyle="#ddd3c0",i.fillRect(Tt-3,Nt-3,Et+6,jt+6),i.beginPath(),i.rect(Tt,Nt,Et,jt),i.clip(),e){const r=e instanceof HTMLCanvasElement?e.width:e.naturalWidth||e.width,c=e instanceof HTMLCanvasElement?e.height:e.naturalHeight||e.height;if(r>0&&c>0){const l=Et/jt,d=r/c;let h=0,u=0,f=r,a=c;d>l?(f=c*l,h=(r-f)*.5):(a=r/l,u=(c-a)*.5),i.drawImage(e,h,u,f,a,Tt,Nt,Et,jt)}}else{const r=i.createLinearGradient(Tt,Nt,Tt,Nt+jt);r.addColorStop(0,"#9bd4f5"),r.addColorStop(1,"#f4e4c1"),i.fillStyle=r,i.fillRect(Tt,Nt,Et,jt)}i.fillStyle="rgba(255, 241, 210, 0.055)",i.fillRect(Tt,Nt,Et,jt);const t=Tt+Et*.5,n=Nt+jt*.5,s=i.createRadialGradient(t,n,Et*.3,t,n,Et*.66);s.addColorStop(0,"rgba(30, 18, 10, 0)"),s.addColorStop(.7,"rgba(30, 18, 10, 0.05)"),s.addColorStop(1,"rgba(26, 15, 8, 0.24)"),i.fillStyle=s,i.fillRect(Tt,Nt,Et,jt);const o=i.createLinearGradient(Tt,Nt,Tt+Et*.5,Nt+jt*.45);o.addColorStop(0,"rgba(255, 255, 255, 0.09)"),o.addColorStop(.5,"rgba(255, 255, 255, 0)"),i.fillStyle=o,i.fillRect(Tt,Nt,Et,jt),i.restore(),i.strokeStyle="rgba(42, 31, 22, 0.28)",i.lineWidth=1.5,i.strokeRect(Tt+.5,Nt+.5,Et-1,jt-1)}function wv(i,e,t){const n=Sv[e],s=Tt+Et-76,o=Nt+76,r=57,c=48;if(i.save(),i.translate(s,o),i.rotate(-11.5*Math.PI/180),i.shadowColor="rgba(25, 16, 10, 0.26)",i.shadowBlur=10,i.shadowOffsetX=2,i.shadowOffsetY=3,i.beginPath(),i.arc(0,0,r+3,0,Math.PI*2),i.fillStyle=n.fill,i.fill(),i.shadowColor="transparent",i.beginPath(),i.arc(0,0,r,0,Math.PI*2),i.strokeStyle=n.ring,i.lineWidth=4.2,i.stroke(),i.beginPath(),i.setLineDash([4,3]),i.arc(0,0,c,0,Math.PI*2),i.strokeStyle=n.ring,i.lineWidth=1.8,i.stroke(),i.setLineDash([]),n.stars>0){i.fillStyle=n.accent,i.font=`700 13px ${jn}`,i.textAlign="center",i.textBaseline="middle";const d="★".repeat(n.stars);i.fillText(d,0,-34)}i.fillStyle=n.ring,i.font=`900 ${e==="S+"?40:44}px ${jn}`,i.textAlign="center",i.textBaseline="middle",i.fillText(e,0,-4),i.beginPath(),i.moveTo(-28,17),i.lineTo(28,17),i.strokeStyle=n.ring,i.lineWidth=1.5,i.stroke(),i.fillStyle=n.ring,i.font=`800 18px ${Vh}`,i.fillText(`${t} pt`,0,31),i.globalCompositeOperation="source-atop";let l=4219;for(let d=0;d<42;d++){l=l*48271%2147483647;const h=l%120-60;l=l*48271%2147483647;const u=l%120-60;i.fillStyle="rgba(255, 250, 240, 0.25)",i.fillRect(h,u,2.5,1.5)}i.restore()}function Tv(i,e,t){i.save();const n=Tt+18,s=Nt+jt-18;i.translate(n,s),i.rotate(-3.2*Math.PI/180),i.font=`800 22px ${jn}`;const o=i.measureText(e).width,r=22,c=t?Et-255:Et-60,l=Math.min(c,o+r*2),d=44;i.shadowColor="rgba(28, 18, 10, 0.3)",i.shadowBlur=10,i.shadowOffsetX=2,i.shadowOffsetY=4,kn(i,-4,-d+4,l+8,d+8,26),i.fillStyle="#ffffff",i.fill(),i.shadowColor="transparent";const h=i.createLinearGradient(0,-d,l,8);h.addColorStop(0,"#ffe156"),h.addColorStop(1,"#ffb703"),kn(i,0,-d+8,l,d,22),i.fillStyle=h,i.fill(),kn(i,4,-d+12,l-8,d-8,18),i.strokeStyle="rgba(130, 62, 0, 0.28)",i.lineWidth=1.5,i.setLineDash([4,3]),i.stroke(),i.setLineDash([]),i.fillStyle="#3b2004",i.textAlign="left",i.textBaseline="middle",i.fillText(e,r,-d*.5+9,l-r*2),i.restore()}function Ev(i,e){i.save();const t=Tt+Et-18,n=Nt+jt-18;i.translate(t,n),i.rotate(4.2*Math.PI/180);const s=`🤣 爆笑度 ${e}%`;i.font=`900 21px ${jn}`;const o=i.measureText(s).width,r=18,c=Math.min(230,o+r*2),l=44;i.shadowColor="rgba(28, 14, 4, 0.34)",i.shadowBlur=11,i.shadowOffsetX=-1,i.shadowOffsetY=4,kn(i,-c-4,-l+4,c+8,l+8,25),i.fillStyle="#ffffff",i.fill(),i.shadowColor="transparent";const d=i.createLinearGradient(-c,-l+8,0,8);e>=70?(d.addColorStop(0,"#ffb703"),d.addColorStop(.55,"#fb8500"),d.addColorStop(1,"#e85d04")):(d.addColorStop(0,"#ffd166"),d.addColorStop(.55,"#ff9f1c"),d.addColorStop(1,"#f77f00")),kn(i,-c,-l+8,c,l,21),i.fillStyle=d,i.fill(),kn(i,-c+4,-l+12,c-8,l-8,17),i.strokeStyle="rgba(255, 252, 235, 0.52)",i.lineWidth=1.6,i.setLineDash([4,3]),i.stroke(),i.setLineDash([]),i.textAlign="center",i.textBaseline="middle",i.shadowColor="rgba(92, 28, 0, 0.45)",i.shadowBlur=3,i.shadowOffsetX=0,i.shadowOffsetY=1.5,i.fillStyle="#fffdf8",i.fillText(s,-c*.5,-l*.5+9,c-r*1.6),i.restore()}function Av(i,e,t,n){const s=[];let o="";for(let r=0;r<e.length;r++){const c=e[r],l=o+c;if(i.measureText(l).width>t&&o.length>0){if(s.push(o),o=c,s.length===n-1){o=e.slice(r);break}}else o=l}return o.length>0&&s.push(o),s}function Cv(i,e,t,n){const s=Mn*.5,o=Et-20;i.save();let r=30;for(i.font=`800 ${r}px ${jn}`;i.measureText(e.caption).width>o&&r>22;)r-=2,i.font=`800 ${r}px ${jn}`;i.fillStyle="#221a14",i.textAlign="center",i.textBaseline="middle",i.fillText(e.caption,s,602,o);const c=Math.min(o*.72,i.measureText(e.caption).width*.62);i.beginPath(),i.moveTo(s-c*.5,629),i.quadraticCurveTo(s,633,s+c*.5,628),i.strokeStyle="rgba(214, 122, 68, 0.52)",i.lineWidth=3,i.lineCap="round",i.stroke(),i.font=`600 21px ${jn}`,i.fillStyle="#473a2f";const l=Av(i,e.subCaption,o,2),d=l.length===1?674:663;for(let f=0;f<l.length;f++)i.fillText(l[f],s,d+f*32,o);const u=[`写り ${e.visibleCount}/${e.totalCount}`,`笑顔 ${e.smilingCount}人`,`構図 ${e.compositionScore}/20`,`瞬間 ${e.momentScore}/10`,`爆笑 ${e.comedyScore}%`].join(" • ");i.font=`700 18px ${jn}`,i.fillStyle="#5f4f41",i.fillText(u,s,752,o),i.beginPath(),i.setLineDash([3,5]),i.moveTo(Tt,794),i.lineTo(Tt+Et,794),i.strokeStyle="rgba(128, 108, 86, 0.5)",i.lineWidth=1.6,i.stroke(),i.setLineDash([]),i.font=`700 18px ${Vh}`,i.fillStyle="#625243",i.textAlign="left",i.fillText(`SHOT #${n} • ${t}`,Tt+4,834,Et-165),i.font=`800 18px ${jn}`,i.fillStyle="#4f4034",i.textAlign="right",i.fillText("全員、写れ！",Tt+Et-4,834),i.restore()}async function Pv(i,e,t,n){const s=document.createElement("canvas");s.width=Mn,s.height=xn;const o=s.getContext("2d");if(!o)return typeof i=="string"?i:"";let r=null;if(typeof i=="string")try{r=await xv(i)}catch{r=null}else r=i;Mv(o),bv(o,r),wv(o,e.rank,e.totalScore);const c=e.comedyScore>=35;return e.comedyAward&&Tv(o,e.comedyAward.badge,c),c&&Ev(o,e.comedyScore),Cv(o,e,t,n),s.toDataURL("image/png")}function Pt(i){return 440*Math.pow(2,(i-69)/12)}const Rv={baseBpm:118,swing:.12,style:"wedding",melody:[77,0,81,79,77,0,72,74,77,0,74,72,69,0,72,0,74,0,77,79,81,0,79,77,79,0,76,72,74,76,79,0],bass:[53,0,0,57,60,0,57,0,50,0,0,53,57,0,53,0,55,0,0,58,62,0,58,0,48,0,0,52,55,0,52,0],chords:[[65,69,72,76],[65,69,72,76],[62,65,69,72],[62,65,69,72],[62,65,67,70],[62,65,67,70],[60,64,67,70],[60,64,67,70]]},Iv={baseBpm:128,swing:.03,style:"school_trip",melody:[79,79,83,0,86,83,79,0,83,0,81,79,76,0,79,0,76,79,84,0,83,81,79,76,78,0,81,84,83,81,78,0],bass:[55,0,62,0,55,0,59,0,52,0,59,0,52,0,55,0,48,0,55,0,48,0,52,0,50,0,57,0,50,0,54,0],chords:[[67,71,74],[67,71,74],[64,67,71,74],[64,67,71,74],[60,64,67,71],[60,64,67,71],[62,66,69,72],[62,66,69,72]]},Lv={baseBpm:138,swing:0,style:"sports_day",melody:[72,0,74,77,76,74,79,79,79,81,76,77,74,74,74,77,76,74,72,84,83,81,79,77,76,74,72,74,76,79,84,0],bass:[48,0,55,0,48,0,55,0,55,0,50,0,55,0,59,0,48,0,55,0,53,0,57,0,55,0,50,0,55,59,48,0],chords:[[60,64,67],[60,64,67],[62,65,67,71],[62,65,67,71],[60,64,67],[60,65,69],[62,65,67,71],[60,64,67]]},Dv={baseBpm:122,swing:.07,style:"tropical_beach",melody:[81,0,83,81,0,78,74,0,79,0,81,83,0,86,83,81,79,0,76,79,81,0,78,76,74,78,81,0,86,0,83,81],bass:[50,0,0,57,0,0,54,0,55,0,0,59,0,0,55,0,57,0,0,52,0,0,57,0,50,0,0,57,50,0,57,0],chords:[[62,66,69,74],[62,66,69,74],[67,71,74,79],[67,71,74,79],[64,67,69,73],[64,67,69,73],[62,66,69,74],[64,67,69,73]]},kv={wedding:Rv,school_trip:Iv,sports_day:Lv,tropical_beach:Dv};class zv{ctx=null;masterGain=null;bgmGain=null;sfxGain=null;noiseBuffer=null;muted=!1;disposed=!1;currentStage=null;bgmUrgent=!1;bgmTimerId=null;bgmStep=0;bgmNextNoteTime=0;lastZoomTickAt=0;lastSimEventAt={};ensureContext(){if(this.disposed)return null;if(this.ctx)return this.ctx.state==="suspended"&&this.ctx.resume().catch(()=>{}),this.ctx;try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return null;const t=new e,n=t.createDynamicsCompressor();n.threshold.setValueAtTime(-14,t.currentTime),n.knee.setValueAtTime(18,t.currentTime),n.ratio.setValueAtTime(4,t.currentTime),n.attack.setValueAtTime(.004,t.currentTime),n.release.setValueAtTime(.15,t.currentTime);const s=t.createGain();s.gain.setValueAtTime(this.muted?0:.92,t.currentTime);const o=t.createGain();o.gain.setValueAtTime(.18,t.currentTime);const r=t.createGain();return r.gain.setValueAtTime(.82,t.currentTime),o.connect(s),r.connect(s),s.connect(n),n.connect(t.destination),this.ctx=t,this.masterGain=s,this.bgmGain=o,this.sfxGain=r,this.noiseBuffer=this.createNoiseBuffer(t),t}catch{return null}}createNoiseBuffer(e){const t=Math.floor(e.sampleRate*1.5),n=e.createBuffer(1,t,e.sampleRate),s=n.getChannelData(0);for(let o=0;o<t;o++)s[o]=Math.random()*2-1;return n}unlock(){const e=this.ensureContext();if(e)try{e.state==="suspended"&&e.resume().catch(()=>{});const t=e.createBuffer(1,1,22050),n=e.createBufferSource();n.buffer=t,n.connect(e.destination),n.start(0)}catch{}}setMuted(e){if(this.muted=e,this.ctx&&this.masterGain)try{const t=this.ctx.currentTime;this.masterGain.gain.cancelScheduledValues(t),this.masterGain.gain.setTargetAtTime(e?0:.92,t,.025)}catch{}}isMuted(){return this.muted}startBgm(e){if(this.disposed)return;this.stopBgm(),this.currentStage=e,this.bgmStep=0;const t=this.ensureContext();if(t){if(this.bgmNextNoteTime=t.currentTime+.06,this.bgmGain){const n=t.currentTime;this.bgmGain.gain.cancelScheduledValues(n),this.bgmGain.gain.setValueAtTime(.001,n),this.bgmGain.gain.linearRampToValueAtTime(.18,n+.35)}this.bgmTimerId=window.setInterval(()=>{this.scheduleBgmTick()},35)}}stopBgm(){if(this.bgmTimerId!==null&&(window.clearInterval(this.bgmTimerId),this.bgmTimerId=null),this.currentStage=null,this.ctx&&this.bgmGain)try{const e=this.ctx.currentTime;this.bgmGain.gain.cancelScheduledValues(e),this.bgmGain.gain.setTargetAtTime(1e-4,e,.06)}catch{}}setBgmUrgency(e){this.bgmUrgent=e}scheduleBgmTick(){if(!this.currentStage||!this.ctx||!this.bgmGain)return;if(this.ctx.state!=="running"){this.bgmNextNoteTime=this.ctx.currentTime+.06;return}const e=kv[this.currentStage],n=60/(this.bgmUrgent?e.baseBpm*1.12:e.baseBpm)/2,s=.14;for(;this.bgmNextNoteTime<this.ctx.currentTime+s;){const o=this.bgmStep%32,c=o%2===1?n*e.swing:0,l=this.bgmNextNoteTime+c;this.scheduleBgmStep(e,o,l,n),this.bgmNextNoteTime+=n,this.bgmStep=(this.bgmStep+1)%32}}scheduleBgmStep(e,t,n,s){if(!this.ctx||!this.bgmGain)return;const o=e.melody[t],r=e.bass[t],c=Math.floor(t/4)%e.chords.length,l=e.chords[c];if(e.style==="sports_day"){if(o>0){const d=Pt(o);this.playMarimbaNote(d,n,.16,.28,!0,this.bgmGain),this.playBrassLeadNote(d,n,Math.min(.18,s*.88),.14,this.bgmGain)}r>0&&this.playBassNote(Pt(r),n,s*1.15,.44,this.bgmGain),t%2===1&&this.playWarmChordPluck(l,n,.1,.1,this.bgmGain),t%4===0&&this.playMarchKick(n,.24,this.bgmGain),t%4===2||t===15||t===30||t===31?this.playMarchSnare(n,t%4===2?.15:.1,this.bgmGain):t%4===1&&this.playWoodblock(n,1040,.065,this.bgmGain);return}if(e.style==="tropical_beach"){o>0&&this.playSteelDrumNote(Pt(o),n,.3,.32,this.bgmGain),r>0&&this.playBassNote(Pt(r),n,s*1.85,.4,this.bgmGain);const d=t%8;(d===0||d===2||d===5||d===7)&&this.playUkuleleStrum(l,n,d===0?.19:.14,d===0?.1:.085,this.bgmGain),this.playShaker(n,d%2===0?.055:.032,d===2||d===6,this.bgmGain),(d===0||d===3||d===6)&&this.playWoodblock(n,1240,.06,this.bgmGain);return}o>0&&this.playMarimbaNote(Pt(o),n,e.style==="wedding"?.24:.19,.34,e.style==="school_trip",this.bgmGain),r>0&&this.playBassNote(Pt(r),n,s*1.6,.42,this.bgmGain),t%2===1&&this.playWarmChordPluck(l,n,.14,.09,this.bgmGain),e.style==="wedding"?(t%2===0||t%4===3)&&this.playBrushHat(n,t%4===2?.065:.038,this.bgmGain):t%4===2?this.playWoodblock(n,940,.09,this.bgmGain):t%2===0&&this.playBrushHat(n,.04,this.bgmGain)}playMarimbaNote(e,t,n,s,o,r){if(!this.ctx)return;const c=this.ctx.createOscillator(),l=this.ctx.createOscillator(),d=this.ctx.createGain(),h=this.ctx.createGain();c.type="sine",c.frequency.setValueAtTime(e,t),l.type="triangle",l.frequency.setValueAtTime(e*(o?2:4),t),d.gain.setValueAtTime(1e-4,t),d.gain.linearRampToValueAtTime(s,t+.008),d.gain.exponentialRampToValueAtTime(1e-4,t+n),h.gain.setValueAtTime(1e-4,t),h.gain.linearRampToValueAtTime(s*(o?.24:.14),t+.005),h.gain.exponentialRampToValueAtTime(1e-4,t+n*.38),c.connect(d),l.connect(h),h.connect(d),d.connect(r),c.start(t),l.start(t),c.stop(t+n+.03),l.stop(t+n+.03)}playBassNote(e,t,n,s,o){if(!this.ctx)return;const r=this.ctx.createOscillator(),c=this.ctx.createBiquadFilter(),l=this.ctx.createGain();r.type="triangle",r.frequency.setValueAtTime(e,t),c.type="lowpass",c.frequency.setValueAtTime(380,t),c.frequency.exponentialRampToValueAtTime(170,t+n),l.gain.setValueAtTime(1e-4,t),l.gain.linearRampToValueAtTime(s,t+.012),l.gain.exponentialRampToValueAtTime(1e-4,t+n),r.connect(c),c.connect(l),l.connect(o),r.start(t),r.stop(t+n+.03)}playWarmChordPluck(e,t,n,s,o){if(!this.ctx)return;const r=this.ctx.createBiquadFilter();r.type="lowpass",r.frequency.setValueAtTime(1550,t);const c=this.ctx.createGain();c.gain.setValueAtTime(1e-4,t),c.gain.linearRampToValueAtTime(s,t+.01),c.gain.exponentialRampToValueAtTime(1e-4,t+n),r.connect(c),c.connect(o);for(let l=0;l<e.length;l++){const d=this.ctx.createOscillator();d.type="triangle";const h=l*.007;d.frequency.setValueAtTime(Pt(e[l]),t+h),d.connect(r),d.start(t+h),d.stop(t+n+.04)}}playBrushHat(e,t,n){if(!this.ctx||!this.noiseBuffer)return;const s=this.ctx.createBufferSource();s.buffer=this.noiseBuffer;const o=this.ctx.createBiquadFilter();o.type="bandpass",o.frequency.setValueAtTime(6800,e),o.Q.setValueAtTime(1.4,e);const r=this.ctx.createGain();r.gain.setValueAtTime(1e-4,e),r.gain.linearRampToValueAtTime(t,e+.004),r.gain.exponentialRampToValueAtTime(1e-4,e+.042),s.connect(o),o.connect(r),r.connect(n),s.start(e,Math.random()*.6,.055)}playWoodblock(e,t,n,s){if(!this.ctx)return;const o=this.ctx.createOscillator(),r=this.ctx.createGain();o.type="sine",o.frequency.setValueAtTime(t,e),o.frequency.exponentialRampToValueAtTime(t*.78,e+.035),r.gain.setValueAtTime(1e-4,e),r.gain.linearRampToValueAtTime(n,e+.003),r.gain.exponentialRampToValueAtTime(1e-4,e+.048),o.connect(r),r.connect(s),o.start(e),o.stop(e+.055)}playBrassLeadNote(e,t,n,s,o){if(!this.ctx)return;const r=this.ctx.createOscillator(),c=this.ctx.createBiquadFilter(),l=this.ctx.createGain();r.type="sawtooth",r.frequency.setValueAtTime(e,t),c.type="lowpass",c.frequency.setValueAtTime(920,t),c.frequency.exponentialRampToValueAtTime(2700,t+.025),c.frequency.exponentialRampToValueAtTime(1150,t+n),l.gain.setValueAtTime(1e-4,t),l.gain.linearRampToValueAtTime(s,t+.012),l.gain.exponentialRampToValueAtTime(1e-4,t+n),r.connect(c),c.connect(l),l.connect(o),r.start(t),r.stop(t+n+.03)}playMarchSnare(e,t,n){if(!this.ctx)return;if(this.noiseBuffer){const r=this.ctx.createBufferSource();r.buffer=this.noiseBuffer;const c=this.ctx.createBiquadFilter();c.type="bandpass",c.frequency.setValueAtTime(2400,e),c.Q.setValueAtTime(1.1,e);const l=this.ctx.createGain();l.gain.setValueAtTime(1e-4,e),l.gain.linearRampToValueAtTime(t,e+.003),l.gain.exponentialRampToValueAtTime(1e-4,e+.085),r.connect(c),c.connect(l),l.connect(n),r.start(e,Math.random()*.5,.095)}const s=this.ctx.createOscillator(),o=this.ctx.createGain();s.type="triangle",s.frequency.setValueAtTime(220,e),s.frequency.exponentialRampToValueAtTime(130,e+.045),o.gain.setValueAtTime(1e-4,e),o.gain.linearRampToValueAtTime(t*.65,e+.003),o.gain.exponentialRampToValueAtTime(1e-4,e+.055),s.connect(o),o.connect(n),s.start(e),s.stop(e+.065)}playMarchKick(e,t,n){if(!this.ctx)return;const s=this.ctx.createOscillator(),o=this.ctx.createGain();s.type="sine",s.frequency.setValueAtTime(125,e),s.frequency.exponentialRampToValueAtTime(52,e+.075),o.gain.setValueAtTime(1e-4,e),o.gain.linearRampToValueAtTime(t,e+.005),o.gain.exponentialRampToValueAtTime(1e-4,e+.09),s.connect(o),o.connect(n),s.start(e),s.stop(e+.1)}playSteelDrumNote(e,t,n,s,o){if(!this.ctx)return;const r=this.ctx.createOscillator(),c=this.ctx.createOscillator(),l=this.ctx.createOscillator(),d=this.ctx.createGain(),h=this.ctx.createGain(),u=this.ctx.createGain();r.type="sine",r.frequency.setValueAtTime(e*1.006,t),r.frequency.exponentialRampToValueAtTime(e,t+.018),c.type="triangle",c.frequency.setValueAtTime(e*2,t),l.type="sine",l.frequency.setValueAtTime(e*3.015,t),d.gain.setValueAtTime(1e-4,t),d.gain.linearRampToValueAtTime(s,t+.006),d.gain.exponentialRampToValueAtTime(1e-4,t+n),h.gain.setValueAtTime(1e-4,t),h.gain.linearRampToValueAtTime(s*.34,t+.005),h.gain.exponentialRampToValueAtTime(1e-4,t+n*.55),u.gain.setValueAtTime(1e-4,t),u.gain.linearRampToValueAtTime(s*.14,t+.004),u.gain.exponentialRampToValueAtTime(1e-4,t+n*.32),r.connect(d),c.connect(h),l.connect(u),h.connect(d),u.connect(d),d.connect(o),r.start(t),c.start(t),l.start(t),r.stop(t+n+.03),c.stop(t+n+.03),l.stop(t+n+.03)}playUkuleleStrum(e,t,n,s,o){if(!this.ctx)return;const r=this.ctx.createBiquadFilter();r.type="highpass",r.frequency.setValueAtTime(340,t);const c=this.ctx.createBiquadFilter();c.type="lowpass",c.frequency.setValueAtTime(2600,t);const l=this.ctx.createGain();l.gain.setValueAtTime(1e-4,t),l.gain.linearRampToValueAtTime(s,t+.008),l.gain.exponentialRampToValueAtTime(1e-4,t+n),r.connect(c),c.connect(l),l.connect(o);for(let d=0;d<e.length;d++){const h=this.ctx.createOscillator();h.type="triangle";const u=d*.009;h.frequency.setValueAtTime(Pt(e[d]),t+u),h.connect(r),h.start(t+u),h.stop(t+n+.04)}}playShaker(e,t,n,s){if(!this.ctx||!this.noiseBuffer)return;const o=this.ctx.createBufferSource();o.buffer=this.noiseBuffer;const r=this.ctx.createBiquadFilter();r.type="bandpass",r.frequency.setValueAtTime(n?7600:6200,e),r.Q.setValueAtTime(2,e);const c=n?.055:.034,l=this.ctx.createGain();l.gain.setValueAtTime(1e-4,e),l.gain.linearRampToValueAtTime(t,e+.006),l.gain.exponentialRampToValueAtTime(1e-4,e+c),o.connect(r),r.connect(l),l.connect(s),o.start(e,Math.random()*.7,c+.015)}playShutter(){const e=this.ensureContext();if(!(!e||!this.sfxGain||!this.noiseBuffer))try{const t=e.currentTime,n=e.createBufferSource();n.buffer=this.noiseBuffer;const s=e.createBiquadFilter();s.type="bandpass",s.frequency.setValueAtTime(1850,t),s.Q.setValueAtTime(1.6,t);const o=e.createGain();o.gain.setValueAtTime(.001,t),o.gain.linearRampToValueAtTime(.62,t+.003),o.gain.exponentialRampToValueAtTime(1e-4,t+.034),n.connect(s),s.connect(o),o.connect(this.sfxGain),n.start(t,.05,.045);const r=e.createOscillator(),c=e.createGain();r.type="sine",r.frequency.setValueAtTime(165,t),r.frequency.exponentialRampToValueAtTime(52,t+.036),c.gain.setValueAtTime(.45,t),c.gain.exponentialRampToValueAtTime(1e-4,t+.04),r.connect(c),c.connect(this.sfxGain),r.start(t),r.stop(t+.048);const l=t+.024,d=e.createBufferSource();d.buffer=this.noiseBuffer;const h=e.createBiquadFilter();h.type="highpass",h.frequency.setValueAtTime(4200,l);const u=e.createGain();u.gain.setValueAtTime(.001,l),u.gain.linearRampToValueAtTime(.44,l+.002),u.gain.exponentialRampToValueAtTime(1e-4,l+.02),d.connect(h),h.connect(u),u.connect(this.sfxGain),d.start(l,.2,.03);const f=e.createOscillator(),a=e.createGain();f.type="triangle",f.frequency.setValueAtTime(3450,l),f.frequency.exponentialRampToValueAtTime(2100,l+.022),a.gain.setValueAtTime(.14,l),a.gain.exponentialRampToValueAtTime(1e-4,l+.024),f.connect(a),a.connect(this.sfxGain),f.start(l),f.stop(l+.03);const p=t+.12,v=e.createOscillator(),m=e.createBiquadFilter(),g=e.createGain();v.type="sawtooth",v.frequency.setValueAtTime(240,p),v.frequency.linearRampToValueAtTime(345,p+.055),v.frequency.linearRampToValueAtTime(280,p+.125),m.type="bandpass",m.frequency.setValueAtTime(980,p),m.Q.setValueAtTime(2.6,p),g.gain.setValueAtTime(1e-4,p),g.gain.linearRampToValueAtTime(.11,p+.02),g.gain.setValueAtTime(.095,p+.09),g.gain.exponentialRampToValueAtTime(1e-4,p+.135),v.connect(m),m.connect(g),g.connect(this.sfxGain),v.start(p),v.stop(p+.145);const S=p+.12;this.playWoodblock(S,2400,.08,this.sfxGain)}catch{}}playSayCheese(){const e=this.ensureContext();if(!(!e||!this.sfxGain))try{const t=e.currentTime,n=[79,83,86,91];n.forEach((r,c)=>{const l=t+c*.052;this.playMarimbaNote(Pt(r),l,c===n.length-1?.42:.2,c===n.length-1?.34:.25,!0,this.sfxGain)});const s=e.createOscillator(),o=e.createGain();s.type="sine",s.frequency.setValueAtTime(880,t),s.frequency.exponentialRampToValueAtTime(1480,t+.14),o.gain.setValueAtTime(1e-4,t),o.gain.linearRampToValueAtTime(.11,t+.03),o.gain.exponentialRampToValueAtTime(1e-4,t+.18),s.connect(o),o.connect(this.sfxGain),s.start(t),s.stop(t+.2),this.playWarmChordPluck([71,74,79,83],t+.15,.38,.14,this.sfxGain)}catch{}}playAfBeep(e=!1){const t=this.ensureContext();if(!(!t||!this.sfxGain))try{const n=t.currentTime;[e?2637:2093,e?3136:2093].forEach((c,l)=>{const d=n+l*.056,h=t.createOscillator(),u=t.createGain();h.type="sine",h.frequency.setValueAtTime(c,d),u.gain.setValueAtTime(1e-4,d),u.gain.linearRampToValueAtTime(.11,d+.004),u.gain.setValueAtTime(.11,d+.022),u.gain.exponentialRampToValueAtTime(1e-4,d+.034),h.connect(u),u.connect(this.sfxGain),h.start(d),h.stop(d+.04)})}catch{}}playZoomTick(){const e=this.ensureContext();if(!e||!this.sfxGain)return;const t=e.currentTime;if(!(t-this.lastZoomTickAt<.042)){this.lastZoomTickAt=t;try{this.playWoodblock(t,1320,.065,this.sfxGain)}catch{}}}playCountdownTick(e=!1){const t=this.ensureContext();if(!(!t||!this.sfxGain))try{const n=t.currentTime;e?(this.playMarimbaNote(Pt(88),n,.16,.28,!0,this.sfxGain),this.playMarimbaNote(Pt(93),n+.075,.32,.32,!0,this.sfxGain)):this.playWoodblock(n,1080,.18,this.sfxGain)}catch{}}playSimEvent(e){const t=this.ensureContext();if(!t||!this.sfxGain)return;const n=t.currentTime,s={jump:.09,shove:.1,fall:.17,pileup:.24,shoulder_mount:.18,peek_pop:.12,pose:.15,get_up:.15,hat_pop:.16,sneeze_charge:.45,sneeze_blast:.45,intruder_enter:.55,intruder_bonk:.2,lens_bomb:.45,slip:.18,wave_warning:.9,wave_crash:.7,kusudama_pop:.6,ball_boing:.18},o=this.lastSimEventAt[e.type]??-10;if(n-o<s[e.type])return;this.lastSimEventAt[e.type]=n;const r=Math.max(.35,Math.min(1.2,e.intensity||.8));try{switch(e.type){case"jump":{const c=t.createOscillator(),l=t.createGain();c.type="sine",c.frequency.setValueAtTime(210,n),c.frequency.exponentialRampToValueAtTime(590,n+.13),l.gain.setValueAtTime(.001,n),l.gain.linearRampToValueAtTime(.22*r,n+.012),l.gain.exponentialRampToValueAtTime(1e-4,n+.155),c.connect(l),l.connect(this.sfxGain),c.start(n),c.stop(n+.165);break}case"shove":{const c=t.createOscillator(),l=t.createGain();c.type="sine",c.frequency.setValueAtTime(175,n),c.frequency.exponentialRampToValueAtTime(68,n+.075),l.gain.setValueAtTime(.001,n),l.gain.linearRampToValueAtTime(.24*r,n+.006),l.gain.exponentialRampToValueAtTime(1e-4,n+.085),c.connect(l),l.connect(this.sfxGain),c.start(n),c.stop(n+.095);break}case"fall":{const c=t.createOscillator(),l=t.createGain();c.type="sine",c.frequency.setValueAtTime(760,n),c.frequency.exponentialRampToValueAtTime(235,n+.17),l.gain.setValueAtTime(.001,n),l.gain.linearRampToValueAtTime(.15*r,n+.018),l.gain.exponentialRampToValueAtTime(1e-4,n+.185),c.connect(l),l.connect(this.sfxGain),c.start(n),c.stop(n+.195);const d=n+.145,h=t.createOscillator(),u=t.createGain();h.type="triangle",h.frequency.setValueAtTime(205,d),h.frequency.exponentialRampToValueAtTime(78,d+.085),u.gain.setValueAtTime(.001,d),u.gain.linearRampToValueAtTime(.28*r,d+.006),u.gain.exponentialRampToValueAtTime(1e-4,d+.095),h.connect(u),u.connect(this.sfxGain),h.start(d),h.stop(d+.11);break}case"pileup":{const c=t.createOscillator(),l=t.createGain();c.type="triangle",c.frequency.setValueAtTime(640,n),c.frequency.exponentialRampToValueAtTime(160,n+.22),l.gain.setValueAtTime(.001,n),l.gain.linearRampToValueAtTime(.18*r,n+.015),l.gain.exponentialRampToValueAtTime(1e-4,n+.24),c.connect(l),l.connect(this.sfxGain),c.start(n),c.stop(n+.25),[.06,.14].forEach((d,h)=>{const u=n+d,f=t.createOscillator(),a=t.createGain();f.type="sine",f.frequency.setValueAtTime(h===0?190:145,u),f.frequency.exponentialRampToValueAtTime(62,u+.09),a.gain.setValueAtTime(.001,u),a.gain.linearRampToValueAtTime(.26*r,u+.005),a.gain.exponentialRampToValueAtTime(1e-4,u+.1),f.connect(a),a.connect(this.sfxGain),f.start(u),f.stop(u+.11)});break}case"shoulder_mount":{[72,76,79,84].forEach((c,l)=>{this.playMarimbaNote(Pt(c),n+l*.045,.2,.22*r,!0,this.sfxGain)});break}case"peek_pop":{const c=t.createOscillator(),l=t.createGain();c.type="sine",c.frequency.setValueAtTime(360,n),c.frequency.exponentialRampToValueAtTime(760,n+.055),l.gain.setValueAtTime(.001,n),l.gain.linearRampToValueAtTime(.15*r,n+.008),l.gain.exponentialRampToValueAtTime(1e-4,n+.068),c.connect(l),l.connect(this.sfxGain),c.start(n),c.stop(n+.075);break}case"pose":{this.playMarimbaNote(Pt(88),n,.12,.12*r,!0,this.sfxGain),this.playMarimbaNote(Pt(95),n+.045,.16,.13*r,!0,this.sfxGain);break}case"get_up":{const c=t.createOscillator(),l=t.createGain();c.type="sine",c.frequency.setValueAtTime(260,n),c.frequency.exponentialRampToValueAtTime(430,n+.07),l.gain.setValueAtTime(.001,n),l.gain.linearRampToValueAtTime(.13*r,n+.01),l.gain.exponentialRampToValueAtTime(1e-4,n+.085),c.connect(l),l.connect(this.sfxGain),c.start(n),c.stop(n+.095);break}case"hat_pop":{const c=t.createOscillator(),l=t.createGain();c.type="sine",c.frequency.setValueAtTime(280,n),c.frequency.exponentialRampToValueAtTime(760,n+.032),l.gain.setValueAtTime(.001,n),l.gain.linearRampToValueAtTime(.24*r,n+.005),l.gain.exponentialRampToValueAtTime(1e-4,n+.042),c.connect(l),l.connect(this.sfxGain),c.start(n),c.stop(n+.05);const d=t.createOscillator(),h=t.createOscillator(),u=t.createGain(),f=t.createGain();d.type="sine",d.frequency.setValueAtTime(380,n+.012),d.frequency.exponentialRampToValueAtTime(1320,n+.23),h.type="triangle",h.frequency.setValueAtTime(760,n+.012),h.frequency.exponentialRampToValueAtTime(2640,n+.23),u.gain.setValueAtTime(1e-4,n+.012),u.gain.linearRampToValueAtTime(.22*r,n+.035),u.gain.setValueAtTime(.2*r,n+.17),u.gain.exponentialRampToValueAtTime(1e-4,n+.26),f.gain.setValueAtTime(1e-4,n+.012),f.gain.linearRampToValueAtTime(.055*r,n+.035),f.gain.exponentialRampToValueAtTime(1e-4,n+.24),d.connect(u),h.connect(f),f.connect(u),u.connect(this.sfxGain),d.start(n+.012),h.start(n+.012),d.stop(n+.27),h.stop(n+.27);break}case"slip":{const c=t.createOscillator(),l=t.createGain();c.type="sine",c.frequency.setValueAtTime(620,n),c.frequency.exponentialRampToValueAtTime(1880,n+.068),c.frequency.exponentialRampToValueAtTime(410,n+.135),l.gain.setValueAtTime(.001,n),l.gain.linearRampToValueAtTime(.21*r,n+.012),l.gain.exponentialRampToValueAtTime(1e-4,n+.145),c.connect(l),l.connect(this.sfxGain),c.start(n),c.stop(n+.155);const d=n+.125,h=t.createOscillator(),u=t.createGain();if(h.type="triangle",h.frequency.setValueAtTime(185,d),h.frequency.exponentialRampToValueAtTime(52,d+.095),u.gain.setValueAtTime(.001,d),u.gain.linearRampToValueAtTime(.32*r,d+.006),u.gain.exponentialRampToValueAtTime(1e-4,d+.11),h.connect(u),u.connect(this.sfxGain),h.start(d),h.stop(d+.12),this.noiseBuffer){const f=t.createBufferSource();f.buffer=this.noiseBuffer;const a=t.createBiquadFilter();a.type="lowpass",a.frequency.setValueAtTime(650,d);const p=t.createGain();p.gain.setValueAtTime(.001,d),p.gain.linearRampToValueAtTime(.18*r,d+.006),p.gain.exponentialRampToValueAtTime(1e-4,d+.07),f.connect(a),a.connect(p),p.connect(this.sfxGain),f.start(d,.1,.08)}break}case"sneeze_charge":{const c=[{offset:0,fStart:350,fEnd:540,bpStart:950,bpEnd:2350,dur:.15,vol:.16},{offset:.21,fStart:420,fEnd:690,bpStart:1200,bpEnd:2950,dur:.18,vol:.22}];for(const l of c){const d=n+l.offset,h=t.createOscillator(),u=t.createGain();if(h.type="sine",h.frequency.setValueAtTime(l.fStart,d),h.frequency.exponentialRampToValueAtTime(l.fEnd,d+l.dur),u.gain.setValueAtTime(1e-4,d),u.gain.linearRampToValueAtTime(l.vol*.55*r,d+l.dur*.55),u.gain.exponentialRampToValueAtTime(1e-4,d+l.dur),h.connect(u),u.connect(this.sfxGain),h.start(d),h.stop(d+l.dur+.02),this.noiseBuffer){const f=t.createBufferSource();f.buffer=this.noiseBuffer;const a=t.createBiquadFilter();a.type="bandpass",a.frequency.setValueAtTime(l.bpStart,d),a.frequency.exponentialRampToValueAtTime(l.bpEnd,d+l.dur),a.Q.setValueAtTime(2.6,d);const p=t.createGain();p.gain.setValueAtTime(1e-4,d),p.gain.linearRampToValueAtTime(l.vol*r,d+l.dur*.5),p.gain.exponentialRampToValueAtTime(1e-4,d+l.dur),f.connect(a),a.connect(p),p.connect(this.sfxGain),f.start(d,Math.random()*.5,l.dur+.03)}}break}case"sneeze_blast":{if(this.noiseBuffer){const f=t.createBufferSource();f.buffer=this.noiseBuffer;const a=t.createBiquadFilter();a.type="bandpass",a.frequency.setValueAtTime(3400,n),a.Q.setValueAtTime(1.8,n);const p=t.createGain();p.gain.setValueAtTime(.001,n),p.gain.linearRampToValueAtTime(.45*r,n+.006),p.gain.exponentialRampToValueAtTime(1e-4,n+.055),f.connect(a),a.connect(p),p.connect(this.sfxGain),f.start(n,.15,.065);const v=n+.022,m=t.createBufferSource();m.buffer=this.noiseBuffer;const g=t.createBiquadFilter();g.type="bandpass",g.frequency.setValueAtTime(2600,v),g.frequency.exponentialRampToValueAtTime(380,v+.31),g.Q.setValueAtTime(1.1,v);const S=t.createGain();S.gain.setValueAtTime(.001,v),S.gain.linearRampToValueAtTime(.54*r,v+.018),S.gain.exponentialRampToValueAtTime(1e-4,v+.34),m.connect(g),g.connect(S),S.connect(this.sfxGain),m.start(v,.35,.36)}const c=t.createOscillator(),l=t.createBiquadFilter(),d=t.createGain();c.type="sawtooth",c.frequency.setValueAtTime(640,n+.015),c.frequency.exponentialRampToValueAtTime(165,n+.28),l.type="bandpass",l.frequency.setValueAtTime(1350,n+.015),l.frequency.exponentialRampToValueAtTime(340,n+.28),l.Q.setValueAtTime(2.2,n+.015),d.gain.setValueAtTime(.001,n+.015),d.gain.linearRampToValueAtTime(.24*r,n+.032),d.gain.exponentialRampToValueAtTime(1e-4,n+.3),c.connect(l),l.connect(d),d.connect(this.sfxGain),c.start(n+.015),c.stop(n+.32);const h=t.createOscillator(),u=t.createGain();h.type="sine",h.frequency.setValueAtTime(160,n+.015),h.frequency.exponentialRampToValueAtTime(48,n+.14),u.gain.setValueAtTime(.001,n+.015),u.gain.linearRampToValueAtTime(.3*r,n+.022),u.gain.exponentialRampToValueAtTime(1e-4,n+.155),h.connect(u),u.connect(this.sfxGain),h.start(n+.015),h.stop(n+.165);break}case"intruder_enter":{const c=e.npcId.toLowerCase(),l=c.includes("oodama")||!c.includes("dove")&&!c.includes("deer")&&!c.includes("beach")&&this.currentStage==="sports_day",d=c.includes("beach")||c.includes("ball")||!c.includes("dove")&&!c.includes("deer")&&!c.includes("oodama")&&this.currentStage==="tropical_beach",h=c.includes("deer")||!c.includes("dove")&&!l&&!d&&this.currentStage==="school_trip";if(l){const u=t.createOscillator(),f=t.createOscillator(),a=t.createGain(),p=t.createGain();u.type="sine",u.frequency.setValueAtTime(2850,n),u.frequency.setValueAtTime(2950,n+.12),f.type="sine",f.frequency.setValueAtTime(34,n),a.gain.setValueAtTime(95,n),f.connect(a),a.connect(u.frequency),p.gain.setValueAtTime(1e-4,n),p.gain.linearRampToValueAtTime(.18*r,n+.012),p.gain.linearRampToValueAtTime(.02*r,n+.085),p.gain.linearRampToValueAtTime(.22*r,n+.125),p.gain.setValueAtTime(.2*r,n+.28),p.gain.exponentialRampToValueAtTime(1e-4,n+.36),u.connect(p),p.connect(this.sfxGain),u.start(n),f.start(n),u.stop(n+.38),f.stop(n+.38)}else if(d){const u=t.createOscillator(),f=t.createOscillator(),a=t.createGain(),p=t.createGain();u.type="sine",u.frequency.setValueAtTime(165,n),u.frequency.exponentialRampToValueAtTime(490,n+.08),u.frequency.exponentialRampToValueAtTime(260,n+.28),f.type="sine",f.frequency.setValueAtTime(17,n),a.gain.setValueAtTime(34,n),a.gain.exponentialRampToValueAtTime(6,n+.28),f.connect(a),a.connect(u.frequency),p.gain.setValueAtTime(.001,n),p.gain.linearRampToValueAtTime(.28*r,n+.012),p.gain.exponentialRampToValueAtTime(1e-4,n+.3),u.connect(p),p.connect(this.sfxGain),u.start(n),f.start(n),u.stop(n+.32),f.stop(n+.32)}else if(h){const u=t.createOscillator(),f=t.createOscillator(),a=t.createGain(),p=t.createBiquadFilter(),v=t.createGain();u.type="sawtooth",u.frequency.setValueAtTime(405,n),u.frequency.linearRampToValueAtTime(510,n+.09),u.frequency.exponentialRampToValueAtTime(355,n+.34),f.type="sine",f.frequency.setValueAtTime(19,n),a.gain.setValueAtTime(24,n),f.connect(a),a.connect(u.frequency),p.type="bandpass",p.frequency.setValueAtTime(1320,n),p.frequency.linearRampToValueAtTime(1650,n+.12),p.frequency.linearRampToValueAtTime(1080,n+.34),p.Q.setValueAtTime(4.2,n),v.gain.setValueAtTime(1e-4,n),v.gain.linearRampToValueAtTime(.28*r,n+.025),v.gain.setValueAtTime(.24*r,n+.22),v.gain.exponentialRampToValueAtTime(1e-4,n+.37),u.connect(p),p.connect(v),v.connect(this.sfxGain),u.start(n),f.start(n),u.stop(n+.39),f.stop(n+.39)}else{const u=t.createOscillator(),f=t.createOscillator(),a=t.createGain(),p=t.createGain();u.type="sine",u.frequency.setValueAtTime(520,n),u.frequency.linearRampToValueAtTime(590,n+.13),u.frequency.setValueAtTime(660,n+.155),u.frequency.exponentialRampToValueAtTime(505,n+.36),f.type="sine",f.frequency.setValueAtTime(28,n),a.gain.setValueAtTime(48,n),a.gain.setValueAtTime(48,n+.13),a.gain.linearRampToValueAtTime(10,n+.17),f.connect(a),a.connect(u.frequency),p.gain.setValueAtTime(1e-4,n),p.gain.linearRampToValueAtTime(.22*r,n+.025),p.gain.linearRampToValueAtTime(.06*r,n+.14),p.gain.linearRampToValueAtTime(.25*r,n+.175),p.gain.exponentialRampToValueAtTime(1e-4,n+.38),u.connect(p),p.connect(this.sfxGain),u.start(n),f.start(n),u.stop(n+.4),f.stop(n+.4),this.noiseBuffer&&[.02,.11,.2].forEach(v=>{const m=n+v,g=t.createBufferSource();g.buffer=this.noiseBuffer;const S=t.createBiquadFilter();S.type="bandpass",S.frequency.setValueAtTime(820,m),S.Q.setValueAtTime(1.5,m);const _=t.createGain();_.gain.setValueAtTime(1e-4,m),_.gain.linearRampToValueAtTime(.11*r,m+.015),_.gain.exponentialRampToValueAtTime(1e-4,m+.055),g.connect(S),S.connect(_),_.connect(this.sfxGain),g.start(m,.2,.065)})}break}case"intruder_bonk":{const c=t.createOscillator(),l=t.createGain();c.type="triangle",c.frequency.setValueAtTime(340,n),c.frequency.exponentialRampToValueAtTime(105,n+.095),l.gain.setValueAtTime(.001,n),l.gain.linearRampToValueAtTime(.36*r,n+.005),l.gain.exponentialRampToValueAtTime(1e-4,n+.11),c.connect(l),l.connect(this.sfxGain),c.start(n),c.stop(n+.12),this.playWoodblock(n,740,.28*r,this.sfxGain);const d=[{t:.048,f:1320,v:.22},{t:.098,f:990,v:.19},{t:.155,f:1510,v:.16},{t:.215,f:1140,v:.13}];for(const h of d)this.playWoodblock(n+h.t,h.f,h.v*r,this.sfxGain);break}case"lens_bomb":{this.playBrassChord([58,64,67,70,74],n,.42,.24*r,this.sfxGain);const c=t.createOscillator(),l=t.createGain();if(c.type="sine",c.frequency.setValueAtTime(145,n),c.frequency.exponentialRampToValueAtTime(52,n+.26),l.gain.setValueAtTime(.001,n),l.gain.linearRampToValueAtTime(.34*r,n+.01),l.gain.exponentialRampToValueAtTime(1e-4,n+.29),c.connect(l),l.connect(this.sfxGain),c.start(n),c.stop(n+.31),this.noiseBuffer){const d=t.createBufferSource();d.buffer=this.noiseBuffer;const h=t.createBiquadFilter();h.type="highpass",h.frequency.setValueAtTime(5200,n);const u=t.createGain();u.gain.setValueAtTime(.001,n),u.gain.linearRampToValueAtTime(.18*r,n+.008),u.gain.exponentialRampToValueAtTime(1e-4,n+.24),d.connect(h),h.connect(u),u.connect(this.sfxGain),d.start(n,.4,.26)}break}case"wave_warning":{if(this.noiseBuffer){const d=t.createBufferSource();d.buffer=this.noiseBuffer;const h=t.createBiquadFilter();h.type="bandpass",h.frequency.setValueAtTime(220,n),h.frequency.exponentialRampToValueAtTime(1350,n+.82),h.Q.setValueAtTime(1.15,n);const u=t.createGain();u.gain.setValueAtTime(1e-4,n),u.gain.linearRampToValueAtTime(.32*r,n+.56),u.gain.exponentialRampToValueAtTime(1e-4,n+.88),d.connect(h),h.connect(u),u.connect(this.sfxGain),d.start(n,.05,.92)}const c=t.createOscillator(),l=t.createGain();c.type="sine",c.frequency.setValueAtTime(68,n),c.frequency.exponentialRampToValueAtTime(118,n+.78),l.gain.setValueAtTime(1e-4,n),l.gain.linearRampToValueAtTime(.18*r,n+.48),l.gain.exponentialRampToValueAtTime(1e-4,n+.85),c.connect(l),l.connect(this.sfxGain),c.start(n),c.stop(n+.88);break}case"wave_crash":{if(this.noiseBuffer){const h=t.createBufferSource();h.buffer=this.noiseBuffer;const u=t.createBiquadFilter();u.type="bandpass",u.frequency.setValueAtTime(1550,n),u.frequency.exponentialRampToValueAtTime(320,n+.68),u.Q.setValueAtTime(.85,n);const f=t.createGain();f.gain.setValueAtTime(.001,n),f.gain.linearRampToValueAtTime(.58*r,n+.028),f.gain.exponentialRampToValueAtTime(1e-4,n+.74),h.connect(u),u.connect(f),f.connect(this.sfxGain),h.start(n,.1,.78);const a=t.createBufferSource();a.buffer=this.noiseBuffer;const p=t.createBiquadFilter();p.type="highpass",p.frequency.setValueAtTime(3200,n+.02);const v=t.createGain();v.gain.setValueAtTime(1e-4,n+.02),v.gain.linearRampToValueAtTime(.24*r,n+.075),v.gain.exponentialRampToValueAtTime(1e-4,n+.64),a.connect(p),p.connect(v),v.connect(this.sfxGain),a.start(n+.02,.35,.66)}const c=t.createOscillator(),l=t.createGain();c.type="sine",c.frequency.setValueAtTime(118,n),c.frequency.exponentialRampToValueAtTime(42,n+.25),l.gain.setValueAtTime(.001,n),l.gain.linearRampToValueAtTime(.36*r,n+.015),l.gain.exponentialRampToValueAtTime(1e-4,n+.28),c.connect(l),l.connect(this.sfxGain),c.start(n),c.stop(n+.3);const d=[{t:.06,f1:420,f2:920},{t:.12,f1:580,f2:1240},{t:.19,f1:480,f2:1060},{t:.27,f1:660,f2:1380},{t:.36,f1:520,f2:1120}];for(const h of d){const u=n+h.t,f=t.createOscillator(),a=t.createGain();f.type="sine",f.frequency.setValueAtTime(h.f1,u),f.frequency.exponentialRampToValueAtTime(h.f2,u+.055),a.gain.setValueAtTime(1e-4,u),a.gain.linearRampToValueAtTime(.11*r,u+.01),a.gain.exponentialRampToValueAtTime(1e-4,u+.065),f.connect(a),a.connect(this.sfxGain),f.start(u),f.stop(u+.075)}break}case"kusudama_pop":{if(this.noiseBuffer){const h=t.createBufferSource();h.buffer=this.noiseBuffer;const u=t.createBiquadFilter();u.type="bandpass",u.frequency.setValueAtTime(2600,n),u.Q.setValueAtTime(1.2,n);const f=t.createGain();f.gain.setValueAtTime(.001,n),f.gain.linearRampToValueAtTime(.56*r,n+.004),f.gain.exponentialRampToValueAtTime(1e-4,n+.065),h.connect(u),u.connect(f),f.connect(this.sfxGain),h.start(n,.08,.075)}const c=t.createOscillator(),l=t.createGain();c.type="sine",c.frequency.setValueAtTime(360,n),c.frequency.exponentialRampToValueAtTime(92,n+.042),l.gain.setValueAtTime(.001,n),l.gain.linearRampToValueAtTime(.38*r,n+.004),l.gain.exponentialRampToValueAtTime(1e-4,n+.052),c.connect(l),l.connect(this.sfxGain),c.start(n),c.stop(n+.06);const d=[76,79,84,88,91,96,100];d.forEach((h,u)=>{this.playMarimbaNote(Pt(h),n+.045+u*.04,u===d.length-1?.45:.2,(u===d.length-1?.3:.22)*r,!0,this.sfxGain)}),this.playWarmChordPluck([72,76,79,86],n+.16,.42,.14*r,this.sfxGain);break}case"ball_boing":{const c=t.createOscillator(),l=t.createOscillator(),d=t.createOscillator(),h=t.createGain(),u=t.createGain(),f=t.createGain();c.type="sine",c.frequency.setValueAtTime(140,n),c.frequency.exponentialRampToValueAtTime(520,n+.075),c.frequency.exponentialRampToValueAtTime(240,n+.34),l.type="triangle",l.frequency.setValueAtTime(280,n),l.frequency.exponentialRampToValueAtTime(1040,n+.075),l.frequency.exponentialRampToValueAtTime(480,n+.34),d.type="sine",d.frequency.setValueAtTime(19,n),h.gain.setValueAtTime(52,n),h.gain.exponentialRampToValueAtTime(8,n+.34),d.connect(h),h.connect(c.frequency),h.connect(l.frequency),u.gain.setValueAtTime(.001,n),u.gain.linearRampToValueAtTime(.36*r,n+.01),u.gain.setValueAtTime(.3*r,n+.14),u.gain.exponentialRampToValueAtTime(1e-4,n+.38),f.gain.setValueAtTime(.001,n),f.gain.linearRampToValueAtTime(.12*r,n+.012),f.gain.exponentialRampToValueAtTime(1e-4,n+.24),c.connect(u),l.connect(f),f.connect(u),u.connect(this.sfxGain),c.start(n),l.start(n),d.start(n),c.stop(n+.4),l.stop(n+.4),d.stop(n+.4);const a=t.createOscillator(),p=t.createGain();a.type="triangle",a.frequency.setValueAtTime(210,n),a.frequency.exponentialRampToValueAtTime(72,n+.055),p.gain.setValueAtTime(.001,n),p.gain.linearRampToValueAtTime(.28*r,n+.004),p.gain.exponentialRampToValueAtTime(1e-4,n+.065),a.connect(p),p.connect(this.sfxGain),a.start(n),a.stop(n+.075);break}}}catch{}}playResultFanfare(e){const t=this.ensureContext();if(!(!t||!this.sfxGain))try{const n=t.currentTime+.02;if(e==="S+"){const s=[72,76,79,84,88,91,96];s.forEach((o,r)=>{this.playMarimbaNote(Pt(o),n+r*.065,r===s.length-1?.7:.25,.28,!0,this.sfxGain)}),this.playBrassChord([60,64,67,71,74],n+.36,.85,.18,this.sfxGain)}else e==="S"?([72,76,79,84].forEach((o,r)=>{this.playMarimbaNote(Pt(o),n+r*.08,r===3?.6:.24,.28,!0,this.sfxGain)}),this.playBrassChord([60,64,67,72],n+.24,.7,.16,this.sfxGain)):e==="A"?([72,74,76,79].forEach((o,r)=>{this.playMarimbaNote(Pt(o),n+r*.085,r===3?.45:.22,.26,!1,this.sfxGain)}),this.playWarmChordPluck([60,64,67,72],n+.26,.45,.16,this.sfxGain)):e==="B"?[67,72,76].forEach((o,r)=>{this.playMarimbaNote(Pt(o),n+r*.1,r===2?.42:.22,.24,!1,this.sfxGain)}):[62,61,60,59].forEach((o,r)=>{const c=n+r*.22,l=r===3?.55:.19,d=t.createOscillator(),h=t.createBiquadFilter(),u=t.createGain();d.type="sawtooth";const f=Pt(o);d.frequency.setValueAtTime(f,c),r===3&&d.frequency.linearRampToValueAtTime(f*.92,c+l),h.type="lowpass",h.frequency.setValueAtTime(1100,c),h.frequency.exponentialRampToValueAtTime(420,c+l),u.gain.setValueAtTime(1e-4,c),u.gain.linearRampToValueAtTime(.15,c+.025),u.gain.exponentialRampToValueAtTime(1e-4,c+l),d.connect(h),h.connect(u),u.connect(this.sfxGain),d.start(c),d.stop(c+l+.03)})}catch{}}playBrassChord(e,t,n,s,o){if(!this.ctx)return;const r=this.ctx.createBiquadFilter();r.type="lowpass",r.frequency.setValueAtTime(700,t),r.frequency.exponentialRampToValueAtTime(2400,t+.09),r.frequency.exponentialRampToValueAtTime(1200,t+n);const c=this.ctx.createGain();c.gain.setValueAtTime(1e-4,t),c.gain.linearRampToValueAtTime(s,t+.045),c.gain.setValueAtTime(s*.85,t+n*.6),c.gain.exponentialRampToValueAtTime(1e-4,t+n),r.connect(c),c.connect(o);for(const l of e){const d=this.ctx.createOscillator();d.type="sawtooth",d.frequency.setValueAtTime(Pt(l),t),d.connect(r),d.start(t),d.stop(t+n+.04)}}dispose(){if(this.disposed=!0,this.stopBgm(),this.ctx){try{this.ctx.close().catch(()=>{})}catch{}this.ctx=null}this.masterGain=null,this.bgmGain=null,this.sfxGain=null,this.noiseBuffer=null}}function Dt(i,e,t){return Math.max(e,Math.min(t,i))}class Uv{canvas;camera;stage;enabled=!0;targetAzimuth=0;targetElevation=.16;targetFov=40;targetLookX=0;targetLookY=1.2;targetLookZ=-.25;panOffsetX=0;panOffsetY=0;azimuth=0;elevation=.16;fov=40;lookX=0;lookY=1.2;lookZ=-.25;distance=8.6;baseElevation=.16;baseTargetX=0;baseTargetY=1.2;baseTargetZ=-.25;lastZoomBucket=-1;lastAppliedAspect=0;breathTime=0;steadyTimer=0;breathWeight=1;activePointers=new Map;lastPinchDistance=0;lastPinchMidX=0;lastPinchMidY=0;pressedKeys=new Set;isDragging=!1;lookAtVec=new z;handlePointerDown;handlePointerMove;handlePointerUp;handleWheel;handleKeyDown;handleKeyUp;handleWindowBlur;handleContextMenu;constructor(e,t,n){this.canvas=e,this.camera=t,this.stage=n,this.canvas.style.touchAction="none",this.handlePointerDown=this.onPointerDown.bind(this),this.handlePointerMove=this.onPointerMove.bind(this),this.handlePointerUp=this.onPointerUp.bind(this),this.handleWheel=this.onWheel.bind(this),this.handleKeyDown=this.onKeyDown.bind(this),this.handleKeyUp=this.onKeyUp.bind(this),this.handleWindowBlur=this.onWindowBlur.bind(this),this.handleContextMenu=s=>s.preventDefault(),this.canvas.addEventListener("pointerdown",this.handlePointerDown),window.addEventListener("pointermove",this.handlePointerMove,{passive:!1}),window.addEventListener("pointerup",this.handlePointerUp),window.addEventListener("pointercancel",this.handlePointerUp),this.canvas.addEventListener("wheel",this.handleWheel,{passive:!1}),this.canvas.addEventListener("contextmenu",this.handleContextMenu),window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("keyup",this.handleKeyUp),window.addEventListener("blur",this.handleWindowBlur),this.configureForStage(n)}configureForStage(e){this.stage=e;const t=e.defaultCamera;this.distance=t.distance,this.baseElevation=t.elevation,this.baseTargetX=t.target.x,this.baseTargetY=t.target.y,this.baseTargetZ=t.target.z,this.panOffsetX=0,this.panOffsetY=0,this.targetAzimuth=t.azimuth,this.targetElevation=t.elevation,this.targetFov=t.fov,this.targetLookX=t.target.x,this.targetLookY=t.target.y,this.targetLookZ=t.target.z,this.azimuth=t.azimuth,this.elevation=t.elevation,this.fov=t.fov,this.lookX=t.target.x,this.lookY=t.target.y,this.lookZ=t.target.z,this.lastZoomBucket=Math.round(this.getZoomNormalized()*16),this.lastAppliedAspect=0,this.activePointers.clear(),this.pressedKeys.clear(),this.isDragging=!1,this.lastPinchDistance=0,this.steadyTimer=0,this.applyCameraTransform(0,0,!0)}setEnabled(e){this.enabled=e,e||(this.activePointers.clear(),this.pressedKeys.clear(),this.isDragging=!1,this.lastPinchDistance=0,this.canvas.classList.remove("is-dragging"))}setZoomNormalized(e){const t=Dt(e,0,1),{minFov:n,maxFov:s}=this.stage.cameraLimits;this.targetFov=s-t*(s-n)}getZoomNormalized(){const{minFov:e,maxFov:t}=this.stage.cameraLimits,n=Math.max(.001,t-e);return Dt((t-this.targetFov)/n,0,1)}getCameraState(){return{azimuth:this.azimuth,elevation:this.elevation,fov:this.fov}}nudgeAim(e,t){const n=this.stage.cameraLimits;this.targetAzimuth=Dt(this.targetAzimuth+e,n.minAzimuth,n.maxAzimuth),this.targetElevation=Dt(this.targetElevation+t,n.minElevation,n.maxElevation),this.updateLinkedLookTarget(),this.steadyTimer=Math.max(this.steadyTimer,.32)}update(e){const t=Math.min(Math.max(e,0),.1);if(!this.enabled)return{angularSpeed:0,zoomChanged:!1};this.applyKeyboardInput(t);const n=this.azimuth,s=this.elevation,o=1-Math.exp(-12.5*t),r=1-Math.exp(-11*t),c=1-Math.exp(-10.5*t);this.azimuth+=(this.targetAzimuth-this.azimuth)*o,this.elevation+=(this.targetElevation-this.elevation)*o,this.fov+=(this.targetFov-this.fov)*r,this.lookX+=(this.targetLookX-this.lookX)*c,this.lookY+=(this.targetLookY-this.lookY)*c,this.lookZ+=(this.targetLookZ-this.lookZ)*c;const l=this.azimuth-n,d=this.elevation-s,h=t>1e-4?Math.hypot(l,d)/t:0,{minFov:u,maxFov:f}=this.stage.cameraLimits,a=Math.max(.001,f-u),p=Dt((f-this.fov)/a,0,1),v=Math.round(p*16),m=v!==this.lastZoomBucket;m&&(this.lastZoomBucket=v),this.breathTime+=t,this.steadyTimer>0&&(this.steadyTimer=Math.max(0,this.steadyTimer-t));const g=this.steadyTimer>0?0:this.isDragging?.25:1;this.breathWeight+=(g-this.breathWeight)*(1-Math.exp(-6*t));const S=(Math.sin(this.breathTime*.85)*.0026+Math.cos(this.breathTime*1.47)*.0012)*this.breathWeight,_=(Math.cos(this.breathTime*.72)*.0021+Math.sin(this.breathTime*1.21)*.001)*this.breathWeight;return this.applyCameraTransform(S,_,!1),{angularSpeed:h,zoomChanged:m}}dispose(){this.canvas.removeEventListener("pointerdown",this.handlePointerDown),window.removeEventListener("pointermove",this.handlePointerMove),window.removeEventListener("pointerup",this.handlePointerUp),window.removeEventListener("pointercancel",this.handlePointerUp),this.canvas.removeEventListener("wheel",this.handleWheel),this.canvas.removeEventListener("contextmenu",this.handleContextMenu),window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("keyup",this.handleKeyUp),window.removeEventListener("blur",this.handleWindowBlur),this.activePointers.clear(),this.pressedKeys.clear(),this.canvas.classList.remove("is-dragging")}applyCameraTransform(e,t,n){const s=this.azimuth+e,o=this.elevation+t,r=Math.max(.35,this.camera.aspect||1.33),c=4/3,l=r<c?c/r:1,d=Math.min(1.82,Math.pow(l,.58)),h=Math.min(1.36,Math.pow(l,.34)),u=this.distance*d,f=Math.min(72,this.fov*h),a=u*Math.cos(o),p=this.lookX+a*Math.sin(s),v=this.lookY+u*Math.sin(o),m=this.lookZ+a*Math.cos(s);this.camera.position.set(p,v,m),this.lookAtVec.set(this.lookX,this.lookY,this.lookZ),this.camera.lookAt(this.lookAtVec);const g=Math.abs(r-this.lastAppliedAspect)>.002;(n||g||Math.abs(this.camera.fov-f)>.005)&&(this.lastAppliedAspect=r,this.camera.fov=f,this.camera.updateProjectionMatrix())}updateLinkedLookTarget(){const e=this.stage.cameraLimits;this.targetLookX=Dt(this.baseTargetX+this.targetAzimuth*2.15+this.panOffsetX,e.minTargetX,e.maxTargetX);const t=this.targetElevation-this.baseElevation;this.targetLookY=Dt(this.baseTargetY-t*.24+this.panOffsetY,e.minTargetY,e.maxTargetY)}applyKeyboardInput(e){if(this.pressedKeys.size===0)return;const t=1.08,n=.72,s=28;let o=0,r=0,c=0;(this.pressedKeys.has("KeyA")||this.pressedKeys.has("ArrowLeft"))&&(o-=1),(this.pressedKeys.has("KeyD")||this.pressedKeys.has("ArrowRight"))&&(o+=1),(this.pressedKeys.has("KeyW")||this.pressedKeys.has("ArrowUp"))&&(r+=1),(this.pressedKeys.has("KeyS")||this.pressedKeys.has("ArrowDown"))&&(r-=1),(this.pressedKeys.has("KeyE")||this.pressedKeys.has("Equal")||this.pressedKeys.has("NumpadAdd"))&&(c+=1),(this.pressedKeys.has("KeyQ")||this.pressedKeys.has("Minus")||this.pressedKeys.has("NumpadSubtract"))&&(c-=1);const l=this.stage.cameraLimits;(o!==0||r!==0)&&(this.targetAzimuth=Dt(this.targetAzimuth+o*t*e,l.minAzimuth,l.maxAzimuth),this.targetElevation=Dt(this.targetElevation+r*n*e,l.minElevation,l.maxElevation),this.updateLinkedLookTarget()),c!==0&&(this.targetFov=Dt(this.targetFov-c*s*e,l.minFov,l.maxFov))}onPointerDown(e){if(!this.enabled)return;let t="orbit";if(e.pointerType==="mouse")if(e.button===2)t="pan";else if(e.button===0)t=e.shiftKey?"pan":"orbit";else return;this.activePointers.set(e.pointerId,{x:e.clientX,y:e.clientY,mode:t});try{this.canvas.setPointerCapture(e.pointerId)}catch{}if(this.activePointers.size===1)this.isDragging=!0,this.canvas.classList.add("is-dragging");else if(this.activePointers.size===2){const[n,s]=Array.from(this.activePointers.values());this.lastPinchDistance=Math.hypot(s.x-n.x,s.y-n.y),this.lastPinchMidX=(n.x+s.x)*.5,this.lastPinchMidY=(n.y+s.y)*.5}}onPointerMove(e){if(!this.enabled)return;const t=this.activePointers.get(e.pointerId);if(!t)return;const n=e.clientX-t.x,s=e.clientY-t.y;t.x=e.clientX,t.y=e.clientY;const o=this.stage.cameraLimits,r=Math.max(320,Math.min(window.innerWidth,window.innerHeight));if(this.activePointers.size===1){const c=this.fov/Math.max(1,this.stage.defaultCamera.fov);if(t.mode==="pan"){const l=3.4/r*(.65+.35*c),d=this.baseTargetX+this.targetAzimuth*2.15,h=this.targetElevation-this.baseElevation,u=this.baseTargetY-h*.24,f=Dt(d+this.panOffsetX-n*l,o.minTargetX,o.maxTargetX),a=Dt(u+this.panOffsetY+s*l*.72,o.minTargetY,o.maxTargetY);this.panOffsetX=f-d,this.panOffsetY=a-u,this.updateLinkedLookTarget()}else{const l=1.65/r*(.65+.35*c),d=1.28/r*(.65+.35*c);this.targetAzimuth=Dt(this.targetAzimuth-n*l,o.minAzimuth,o.maxAzimuth),this.targetElevation=Dt(this.targetElevation+s*d,o.minElevation,o.maxElevation),this.panOffsetX*=.94,this.panOffsetY*=.94,this.updateLinkedLookTarget()}}else if(this.activePointers.size>=2){e.preventDefault();const[c,l]=Array.from(this.activePointers.values()),d=Math.hypot(l.x-c.x,l.y-c.y),h=(c.x+l.x)*.5,u=(c.y+l.y)*.5;if(this.lastPinchDistance>8){const v=-((d-this.lastPinchDistance)/r)*44;this.targetFov=Dt(this.targetFov+v,o.minFov,o.maxFov)}const f=h-this.lastPinchMidX,a=u-this.lastPinchMidY;this.targetAzimuth=Dt(this.targetAzimuth-f/r*.85,o.minAzimuth,o.maxAzimuth),this.targetElevation=Dt(this.targetElevation+a/r*.65,o.minElevation,o.maxElevation),this.updateLinkedLookTarget(),this.lastPinchDistance=d,this.lastPinchMidX=h,this.lastPinchMidY=u}}onPointerUp(e){if(this.activePointers.has(e.pointerId)){this.activePointers.delete(e.pointerId);try{this.canvas.hasPointerCapture(e.pointerId)&&this.canvas.releasePointerCapture(e.pointerId)}catch{}this.activePointers.size<2&&(this.lastPinchDistance=0),this.activePointers.size===0&&(this.isDragging=!1,this.canvas.classList.remove("is-dragging"))}}onWheel(e){if(!this.enabled)return;e.preventDefault();const t=this.stage.cameraLimits,s=Dt(e.deltaY,-140,140)*.032;this.targetFov=Dt(this.targetFov+s,t.minFov,t.maxFov)}onKeyDown(e){if(!this.enabled)return;const t=document.activeElement;if(!(t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT")))switch(e.code){case"KeyW":case"KeyA":case"KeyS":case"KeyD":case"ArrowUp":case"ArrowDown":case"ArrowLeft":case"ArrowRight":case"KeyQ":case"KeyE":case"Minus":case"Equal":case"NumpadAdd":case"NumpadSubtract":this.pressedKeys.add(e.code),e.code.startsWith("Arrow")&&e.preventDefault();break}}onKeyUp(e){this.pressedKeys.delete(e.code)}onWindowBlur(){this.pressedKeys.clear(),this.activePointers.clear(),this.isDragging=!1,this.lastPinchDistance=0,this.canvas.classList.remove("is-dragging")}}const Ya=16,Or=16,Nl=2*Math.PI*Or,Vr=26,Bl=2*Math.PI*Vr,Os=["wedding","school_trip","sports_day","tropical_beach"],Nv={wedding:"./assets/wedding-board.jpg",school_trip:"./assets/shrine-board.jpg",sports_day:"./assets/sports-board.jpg",tropical_beach:"./assets/beach-board.jpg"},Bv={wedding:{top:"Wedding",main:"ガーデンウェディング"},school_trip:{top:"修学旅行",main:"古都の石段"},sports_day:{top:"運動会",main:"グラグラ表彰台"},tropical_beach:{top:"SUMMER",main:"大波ビーチ"}},Fl=["「はい、チーズ！📸」","「笑って〜！変顔禁止！！」","「そこの人、前出すぎ〜！」","「全員ストップ！！！」"];function Fv(i){return i>=80?"腹筋崩壊！":i>=55?"大爆笑！":i>=30?"じわじわ":""}const Gl='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>',Gv='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>',Ol='<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>',Ov='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',Vv='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>',Hv='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>';function Vl(i){return!i.inFrame||i.visibleRatio<.34||i.action==="fallen"||i.expression==="blink"||i.expression==="dizzy"?"bad":i.edgeClipped||i.visibleRatio<.9||!i.lookingAtCamera||i.expression==="blink_warn"||i.expression==="surprised"||i.expression==="nervous"||i.expression==="sneeze"||i.expression==="hen_gao"?"warn":"good"}function Za(i){switch(i){case"S+":return"rank-s-plus";case"S":return"rank-s";case"A":return"rank-a";case"B":return"rank-b";default:return"rank-c"}}class Wv{container;callbacks;root;titleScreen;hudScreen;resultScreen;stageCardEls;stageBestEls;startBtn;selectedStageId="wedding";afLayer;afPool=[];stagePillEl;timerPillEl;timerRingProgress;timerTextEl;filmPipsEl;filmPipNodes=[];filmCountTextEl;faceLockBadgeEl;faceLockCountEl;faceLockVipEl;qualityFillEl;chaosAlertEl;tipPillEl;finishEarlyBtn;muteBtn;zoomSlider;zoomReadoutEl;cheeseBtn;cheeseRingProgress;cheeseCdLabel;shutterBtn;shutterRemainEl;shutterFlashEl;polaroidToastEl;toastImgEl;toastRankEl;toastScoreEl;toastComedyEl;toastCaptionEl;cheeseWaveEl;cheeseWaveLabelEl;resultStageTitleEl;resultBestTagEl;resultPolaroidImg;resultPolaroidWrap;resultEmptyState;filmstripEl;resultRankSeal;resultScoreNum;resultComedyPillEl;resultComedyValEl;resultComedyWordEl;resultCaptionEl;resultSubCaptionEl;comedyAwardBanner;comedyAwardBadge;comedyAwardReason;barCoverageFill;barCoverageVal;barExpressionFill;barExpressionVal;barCompositionFill;barCompositionVal;barMomentFill;barMomentVal;verdictListEl;downloadBtn;replayBtn;titleBtn;currentPhase=null;lastStageId=null;lastTimerRounded=-1;lastTimerRatioKey=-1;lastShotsUsed=-1;lastMaxShots=-1;lastVisibleCount=-1;lastSmilingCount=-1;lastTotalCount=-1;lastVipOk=null;lastQualityBucket=-1;lastMuted=null;lastZoomInt=-1;lastCheeseActive=null;lastCheeseRatioKey=-1;lastCheeseSec=-1;lastBestSignature="";lastIntruderAlert="";lastTipText="";lastTipTone="neutral";lastTipChangeMs=0;cheeseCalloutIndex=0;isZoomSliding=!1;roundStartBestScore=0;resultPhotos=[];resultPhotosRef=null;resultMaxShots=5;selectedPhotoIndex=0;bestPhotoIndex=0;funniestPhotoIndex=-1;flashTimerId=null;toastTimerId=null;cheeseWaveTimerId=null;handleKeyDown;constructor(e,t){this.container=e,this.callbacks=t,this.root=document.createElement("div"),this.root.className="zenin-ui-root",this.container.appendChild(this.root),this.titleScreen=document.createElement("section"),this.titleScreen.id="screen-title",this.titleScreen.className="ui-layer screen-title",this.titleScreen.innerHTML=`
      <div class="title-card">
        <header class="title-header">
          <div class="title-emblem-wrap">
            <img src="./assets/camera-emblem.png" alt="全員、写れ！カメラロゴ" class="title-emblem" />
          </div>
          <div class="title-heading-group">
            <span class="title-kicker">3D ドタバタ集合写真ゲーム</span>
            <h1 class="title-logo">全員、写れ！</h1>
            <p class="title-tagline">カメラを動かして、ドタバタ集合写真を激写しよう！</p>
          </div>
        </header>

        <div class="stage-grid" role="radiogroup" aria-label="ステージ選択">
          ${Os.map(o=>this.buildStageCardMarkup(o)).join("")}
        </div>

        <div class="title-cta-row">
          <button type="button" id="btn-start" class="btn-primary-coral btn-start">
            <span class="btn-icon">${Ol}</span>
            <span>撮影スタート！</span>
          </button>
        </div>

        <div class="micro-guide" aria-label="あそびかた">
          <div class="guide-step">
            <span class="guide-badge">1</span>
            <span class="guide-text">ドラッグで構図調整</span>
          </div>
          <div class="guide-step">
            <span class="guide-badge">2</span>
            <span class="guide-text">「はい、チーズ！」で目線誘導</span>
          </div>
          <div class="guide-step">
            <span class="guide-badge">3</span>
            <span class="guide-text">5枚のフィルムで最高の一枚を！</span>
          </div>
        </div>
      </div>
    `,this.root.appendChild(this.titleScreen);const n={},s={};for(const o of Os){const r=this.titleScreen.querySelector(`#stage-card-${o}`);n[o]=r,s[o]=r.querySelector(".stage-best-badge"),r.addEventListener("click",()=>this.selectStage(o,!0)),r.addEventListener("dblclick",()=>{this.selectStage(o,!0),this.callbacks.onStartStage(o)})}this.stageCardEls=n,this.stageBestEls=s,this.startBtn=this.titleScreen.querySelector("#btn-start"),this.startBtn.addEventListener("click",()=>{this.startBtn.blur(),this.callbacks.onStartStage(this.selectedStageId)}),this.selectStage("wedding",!1),this.hudScreen=document.createElement("section"),this.hudScreen.id="screen-hud",this.hudScreen.className="ui-layer screen-hud is-hidden",this.hudScreen.innerHTML=`
      <div class="viewfinder-chrome" aria-hidden="true">
        <div class="vf-safe-frame">
          <div class="vf-grid-v vf-grid-v1"></div>
          <div class="vf-grid-v vf-grid-v2"></div>
          <div class="vf-grid-h vf-grid-h1"></div>
          <div class="vf-grid-h vf-grid-h2"></div>
          <span class="vf-corner tl"></span>
          <span class="vf-corner tr"></span>
          <span class="vf-corner bl"></span>
          <span class="vf-corner br"></span>
          <span class="vf-ratio-badge">4:3</span>
        </div>
      </div>

      <div class="af-layer" aria-hidden="true"></div>

      <header class="hud-top-bar">
        <div class="hud-top-left">
          <span class="hud-pill stage-pill">ガーデンウェディング</span>

          <div class="hud-pill timer-pill" aria-label="残り時間">
            <svg class="timer-ring" viewBox="0 0 40 40" width="32" height="32" aria-hidden="true">
              <circle class="timer-ring-bg" cx="20" cy="20" r="${Or}"></circle>
              <circle class="timer-ring-fg" cx="20" cy="20" r="${Or}"
                stroke-dasharray="${Nl.toFixed(2)}"
                stroke-dashoffset="0"></circle>
            </svg>
            <span class="timer-text">42s</span>
          </div>

          <div class="hud-pill film-pill" aria-label="残りフィルム">
            <span class="film-icon" aria-hidden="true">🎞</span>
            <div class="film-pips"></div>
            <span class="film-count-text">5/5</span>
          </div>
        </div>

        <div class="hud-top-center">
          <div class="hud-pill facelock-pill">
            <span class="facelock-emoji" aria-hidden="true">😊</span>
            <span class="facelock-count">0 / 0</span>
            <span class="facelock-vip">★ 主役OK</span>
            <div class="facelock-quality-track" aria-hidden="true">
              <div class="facelock-quality-fill"></div>
            </div>
          </div>
        </div>

        <div class="hud-top-right">
          <button type="button" id="btn-finish-early" class="hud-btn-finish is-hidden">
            現像へ
          </button>
          <button type="button" id="btn-mute" class="hud-btn-icon" aria-label="サウンド切替" title="サウンド切替">
            ${Gl}
          </button>
        </div>
      </header>

      <div class="hud-tip-row" aria-live="polite">
        <div class="hud-chaos-alert is-hidden" role="status"></div>
        <div class="hud-tip-pill">ドラッグで角度を変えて全員を写そう！</div>
      </div>

      <div class="polaroid-toast" aria-live="polite">
        <div class="toast-photo-frame">
          <img class="toast-img" alt="撮影したプレビュー写真" />
          <span class="toast-rank">S</span>
        </div>
        <div class="toast-meta">
          <div class="toast-score-row">
            <span class="toast-score">88 pt</span>
            <span class="toast-comedy-badge is-hidden">🤣 爆笑 0%</span>
          </div>
          <div class="toast-caption">ナイスショット！</div>
        </div>
      </div>

      <footer class="hud-bottom-bar">
        <div class="hud-bottom-left">
          <div class="zoom-control-pill">
            <span class="zoom-end-label">WIDE</span>
            <input
              id="zoom-slider"
              class="zoom-slider"
              type="range"
              min="0"
              max="100"
              step="1"
              value="45"
              aria-label="ズーム調整"
            />
            <span class="zoom-end-label">TELE</span>
            <span class="zoom-readout">1.0x</span>
          </div>
        </div>

        <div class="hud-bottom-right">
          <div class="action-cluster">
            <div class="control-stack">
              <button type="button" id="btn-cheese" class="btn-cheese">
                <svg class="cheese-ring" viewBox="0 0 60 60" aria-hidden="true">
                  <circle class="cheese-ring-bg" cx="30" cy="30" r="${Vr}"></circle>
                  <circle class="cheese-ring-fg" cx="30" cy="30" r="${Vr}"
                    stroke-dasharray="${Bl.toFixed(2)}"
                    stroke-dashoffset="0"></circle>
                </svg>
                <span class="cheese-inner">
                  <span class="cheese-title">はい、チーズ！</span>
                  <span class="cheese-cd-label">READY</span>
                </span>
              </button>
              <span class="key-hint">Space</span>
            </div>

            <div class="control-stack">
              <button type="button" id="btn-shutter" class="btn-shutter" aria-label="シャッターを切る">
                <span class="shutter-outer-ring">
                  <span class="shutter-inner-dome">
                    ${Ol}
                  </span>
                </span>
                <span class="shutter-remain-badge">5</span>
              </button>
              <span class="key-hint">Enter</span>
            </div>
          </div>
        </div>
      </footer>

      <div class="cheese-wave" aria-hidden="true">
        <div class="cheese-wave-ring"></div>
        <div class="cheese-wave-ring cheese-wave-ring-2"></div>
        <div class="cheese-wave-label">「はい、チーズ！📸」</div>
      </div>

      <div class="shutter-flash" aria-hidden="true"></div>
    `,this.root.appendChild(this.hudScreen),this.afLayer=this.hudScreen.querySelector(".af-layer"),this.stagePillEl=this.hudScreen.querySelector(".stage-pill"),this.timerPillEl=this.hudScreen.querySelector(".timer-pill"),this.timerRingProgress=this.hudScreen.querySelector(".timer-ring-fg"),this.timerTextEl=this.hudScreen.querySelector(".timer-text"),this.filmPipsEl=this.hudScreen.querySelector(".film-pips"),this.filmCountTextEl=this.hudScreen.querySelector(".film-count-text"),this.faceLockBadgeEl=this.hudScreen.querySelector(".facelock-pill"),this.faceLockCountEl=this.hudScreen.querySelector(".facelock-count"),this.faceLockVipEl=this.hudScreen.querySelector(".facelock-vip"),this.qualityFillEl=this.hudScreen.querySelector(".facelock-quality-fill"),this.chaosAlertEl=this.hudScreen.querySelector(".hud-chaos-alert"),this.tipPillEl=this.hudScreen.querySelector(".hud-tip-pill"),this.finishEarlyBtn=this.hudScreen.querySelector("#btn-finish-early"),this.muteBtn=this.hudScreen.querySelector("#btn-mute"),this.zoomSlider=this.hudScreen.querySelector("#zoom-slider"),this.zoomReadoutEl=this.hudScreen.querySelector(".zoom-readout"),this.cheeseBtn=this.hudScreen.querySelector("#btn-cheese"),this.cheeseRingProgress=this.hudScreen.querySelector(".cheese-ring-fg"),this.cheeseCdLabel=this.hudScreen.querySelector(".cheese-cd-label"),this.shutterBtn=this.hudScreen.querySelector("#btn-shutter"),this.shutterRemainEl=this.hudScreen.querySelector(".shutter-remain-badge"),this.shutterFlashEl=this.hudScreen.querySelector(".shutter-flash"),this.polaroidToastEl=this.hudScreen.querySelector(".polaroid-toast"),this.toastImgEl=this.hudScreen.querySelector(".toast-img"),this.toastRankEl=this.hudScreen.querySelector(".toast-rank"),this.toastScoreEl=this.hudScreen.querySelector(".toast-score"),this.toastComedyEl=this.hudScreen.querySelector(".toast-comedy-badge"),this.toastCaptionEl=this.hudScreen.querySelector(".toast-caption"),this.cheeseWaveEl=this.hudScreen.querySelector(".cheese-wave"),this.cheeseWaveLabelEl=this.hudScreen.querySelector(".cheese-wave-label");for(let o=0;o<Ya;o++){const r=document.createElement("div");r.className="af-box af-good",r.innerHTML=`
        <span class="af-c tl"></span>
        <span class="af-c tr"></span>
        <span class="af-c bl"></span>
        <span class="af-c br"></span>
        <span class="af-vip" aria-hidden="true">★</span>
        <span class="af-tag"></span>
      `,this.afLayer.appendChild(r),this.afPool.push({root:r,tag:r.querySelector(".af-tag"),active:!1,lastSize:0,lastStatus:"good",lastIsVip:!1,lastLabel:""})}this.zoomSlider.addEventListener("pointerdown",()=>{this.isZoomSliding=!0}),this.zoomSlider.addEventListener("pointerup",()=>{this.isZoomSliding=!1,this.zoomSlider.blur()}),this.zoomSlider.addEventListener("pointercancel",()=>{this.isZoomSliding=!1}),this.zoomSlider.addEventListener("input",()=>{const o=Number(this.zoomSlider.value);this.lastZoomInt=o,this.updateZoomReadout(o),this.callbacks.onZoomChange(o/100)}),this.cheeseBtn.addEventListener("click",()=>{this.cheeseBtn.blur(),this.callbacks.onSayCheese()}),this.shutterBtn.addEventListener("click",()=>{this.shutterBtn.blur(),this.pulseShutterButton(),this.callbacks.onShutter()}),this.finishEarlyBtn.addEventListener("click",()=>{this.finishEarlyBtn.blur(),this.callbacks.onFinishEarly()}),this.muteBtn.addEventListener("click",()=>{this.muteBtn.blur(),this.callbacks.onToggleMute()}),this.resultScreen=document.createElement("section"),this.resultScreen.id="screen-result",this.resultScreen.className="ui-layer screen-result is-hidden",this.resultScreen.innerHTML=`
      <div class="album-shell">
        <header class="album-header">
          <div class="album-header-left">
            <span class="album-kicker">PHOTO ALBUM</span>
            <h2 class="album-title">現像アルバム</h2>
            <span class="album-stage-chip">ガーデンウェディング</span>
          </div>
          <div class="album-header-right">
            <span class="album-best-tag is-hidden">★ NEW BEST!</span>
          </div>
        </header>

        <div class="album-workspace">
          <div class="album-left-col">
            <div class="polaroid-stage">
              <div class="polaroid-print-wrap">
                <span class="tape-sticker tape-tl" aria-hidden="true"></span>
                <span class="tape-sticker tape-tr" aria-hidden="true"></span>
                <img class="polaroid-print-img" alt="撮影した記念写真のポラロイドプリント" />
              </div>
              <div class="polaroid-empty-state is-hidden">
                <div class="empty-camera-emoji">📷</div>
                <p class="empty-title">フィルムが空っぽです！</p>
                <p class="empty-sub">もう一度シャッターを切って最高の一枚を残そう。</p>
              </div>
            </div>

            <div class="filmstrip-wrap">
              <div class="filmstrip-header">
                <span class="filmstrip-label">🎞 撮影したフィルム（クリックで切替）</span>
              </div>
              <div class="filmstrip-list" role="listbox" aria-label="撮影した写真一覧"></div>
            </div>
          </div>

          <aside class="album-inspector-card">
            <div class="score-hero">
              <div class="rank-seal rank-a">A</div>
              <div class="score-hero-copy">
                <div class="score-total-row">
                  <div class="score-total-main">
                    <span class="score-total-num">0</span>
                    <span class="score-total-denom">/ 100 pt</span>
                  </div>
                  <span class="comedy-meter-pill">
                    <span class="comedy-meter-val">🤣 爆笑度 0%</span>
                    <span class="comedy-meter-word is-hidden"></span>
                  </span>
                </div>
                <h3 class="result-caption">ナイスショット！</h3>
                <p class="result-subcaption">みんなバッチリ写っています！</p>
              </div>
            </div>

            <div class="comedy-award-banner is-hidden">
              <span class="comedy-award-badge"></span>
              <span class="comedy-award-reason"></span>
            </div>

            <div class="breakdown-section">
              <div class="breakdown-row">
                <div class="breakdown-label-row">
                  <span class="breakdown-name">全員写り</span>
                  <span class="breakdown-val val-coverage">0 / 40</span>
                </div>
                <div class="breakdown-track"><div class="breakdown-fill fill-coverage"></div></div>
              </div>

              <div class="breakdown-row">
                <div class="breakdown-label-row">
                  <span class="breakdown-name">表情・目線</span>
                  <span class="breakdown-val val-expression">0 / 30</span>
                </div>
                <div class="breakdown-track"><div class="breakdown-fill fill-expression"></div></div>
              </div>

              <div class="breakdown-row">
                <div class="breakdown-label-row">
                  <span class="breakdown-name">構図バランス</span>
                  <span class="breakdown-val val-composition">0 / 20</span>
                </div>
                <div class="breakdown-track"><div class="breakdown-fill fill-composition"></div></div>
              </div>

              <div class="breakdown-row">
                <div class="breakdown-label-row">
                  <span class="breakdown-name">シャッターチャンス</span>
                  <span class="breakdown-val val-moment">0 / 10</span>
                </div>
                <div class="breakdown-track"><div class="breakdown-fill fill-moment"></div></div>
              </div>
            </div>

            <div class="verdicts-section">
              <div class="verdicts-header">被写体チェック</div>
              <div class="verdicts-list"></div>
            </div>

            <div class="album-actions">
              <button type="button" id="btn-replay" class="btn-primary-coral">
                ${Vv}
                <span>もう一度撮る！</span>
              </button>
              <button type="button" id="btn-download-photo" class="btn-secondary-cream">
                ${Ov}
                <span>写真を保存 (PNG)</span>
              </button>
              <button type="button" id="btn-title" class="btn-ghost-warm">
                ${Hv}
                <span>ステージ選択</span>
              </button>
            </div>
          </aside>
        </div>
      </div>
    `,this.root.appendChild(this.resultScreen),this.resultStageTitleEl=this.resultScreen.querySelector(".album-stage-chip"),this.resultBestTagEl=this.resultScreen.querySelector(".album-best-tag"),this.resultPolaroidWrap=this.resultScreen.querySelector(".polaroid-print-wrap"),this.resultPolaroidImg=this.resultScreen.querySelector(".polaroid-print-img"),this.resultEmptyState=this.resultScreen.querySelector(".polaroid-empty-state"),this.filmstripEl=this.resultScreen.querySelector(".filmstrip-list"),this.resultRankSeal=this.resultScreen.querySelector(".rank-seal"),this.resultScoreNum=this.resultScreen.querySelector(".score-total-num"),this.resultComedyPillEl=this.resultScreen.querySelector(".comedy-meter-pill"),this.resultComedyValEl=this.resultScreen.querySelector(".comedy-meter-val"),this.resultComedyWordEl=this.resultScreen.querySelector(".comedy-meter-word"),this.resultCaptionEl=this.resultScreen.querySelector(".result-caption"),this.resultSubCaptionEl=this.resultScreen.querySelector(".result-subcaption"),this.comedyAwardBanner=this.resultScreen.querySelector(".comedy-award-banner"),this.comedyAwardBadge=this.resultScreen.querySelector(".comedy-award-badge"),this.comedyAwardReason=this.resultScreen.querySelector(".comedy-award-reason"),this.barCoverageFill=this.resultScreen.querySelector(".fill-coverage"),this.barCoverageVal=this.resultScreen.querySelector(".val-coverage"),this.barExpressionFill=this.resultScreen.querySelector(".fill-expression"),this.barExpressionVal=this.resultScreen.querySelector(".val-expression"),this.barCompositionFill=this.resultScreen.querySelector(".fill-composition"),this.barCompositionVal=this.resultScreen.querySelector(".val-composition"),this.barMomentFill=this.resultScreen.querySelector(".fill-moment"),this.barMomentVal=this.resultScreen.querySelector(".val-moment"),this.verdictListEl=this.resultScreen.querySelector(".verdicts-list"),this.downloadBtn=this.resultScreen.querySelector("#btn-download-photo"),this.replayBtn=this.resultScreen.querySelector("#btn-replay"),this.titleBtn=this.resultScreen.querySelector("#btn-title"),this.downloadBtn.addEventListener("click",()=>this.downloadSelectedPhoto()),this.replayBtn.addEventListener("click",()=>this.callbacks.onReplay()),this.titleBtn.addEventListener("click",()=>this.callbacks.onReturnTitle()),this.handleKeyDown=this.onKeyDown.bind(this),window.addEventListener("keydown",this.handleKeyDown)}render(e){if(this.currentPhase!==e.phase){const t=this.currentPhase;this.currentPhase=e.phase,this.titleScreen.classList.toggle("is-hidden",e.phase!=="title"),this.hudScreen.classList.toggle("is-hidden",e.phase!=="playing"),this.resultScreen.classList.toggle("is-hidden",e.phase!=="result"),e.phase==="title"&&t!==null&&this.selectStage(e.stageId,!1),e.phase==="playing"&&(this.roundStartBestScore=e.bestScoreByStage[e.stageId]??0,this.lastTipChangeMs=0,this.cheeseCalloutIndex=0,this.lastIntruderAlert="",this.chaosAlertEl.classList.add("is-hidden"),this.chaosAlertEl.classList.remove("is-pop"),this.tipPillEl.classList.remove("is-hidden")),e.phase!=="playing"&&(this.hideAllAfBoxes(),this.polaroidToastEl.classList.remove("is-visible"),this.lastIntruderAlert="",this.chaosAlertEl.classList.add("is-hidden"),this.chaosAlertEl.classList.remove("is-pop"),this.tipPillEl.classList.remove("is-hidden")),e.phase==="result"&&this.populateResultScreen(e)}if(e.phase==="title"){this.updateTitleScores(e.bestScoreByStage);return}if(e.phase==="result"){this.resultPhotosRef!==e.photos&&this.populateResultScreen(e);return}this.renderLiveHud(e)}triggerShutterFlash(e){this.pulseShutterButton(),this.flashTimerId!==null&&window.clearTimeout(this.flashTimerId),this.shutterFlashEl.classList.remove("is-flashing"),this.shutterFlashEl.offsetWidth,this.shutterFlashEl.classList.add("is-flashing"),this.flashTimerId=window.setTimeout(()=>{this.shutterFlashEl.classList.remove("is-flashing"),this.flashTimerId=null},240),this.toastImgEl.src=e.rawDataUrl||e.polaroidDataUrl,this.toastRankEl.textContent=e.score.rank,this.toastRankEl.className=`toast-rank ${Za(e.score.rank)}`,this.toastScoreEl.textContent=`${e.score.totalScore} pt`;const t=Math.max(0,Math.min(100,Math.round(e.score.comedyScore??0)));t>=30?(this.toastComedyEl.textContent=`🤣 爆笑 ${t}%`,this.toastComedyEl.classList.remove("is-hidden")):this.toastComedyEl.classList.add("is-hidden"),this.toastCaptionEl.textContent=e.score.caption,this.toastTimerId!==null&&window.clearTimeout(this.toastTimerId),this.polaroidToastEl.classList.remove("is-visible"),this.polaroidToastEl.offsetWidth,this.polaroidToastEl.classList.add("is-visible"),this.toastTimerId=window.setTimeout(()=>{this.polaroidToastEl.classList.remove("is-visible"),this.toastTimerId=null},2600)}triggerCheeseWave(){const e=Fl[this.cheeseCalloutIndex];this.cheeseCalloutIndex=(this.cheeseCalloutIndex+1)%Fl.length,this.cheeseWaveLabelEl.textContent=e,this.cheeseWaveTimerId!==null&&window.clearTimeout(this.cheeseWaveTimerId),this.cheeseWaveEl.classList.remove("is-bursting"),this.cheeseWaveEl.offsetWidth,this.cheeseWaveEl.classList.add("is-bursting"),this.cheeseWaveTimerId=window.setTimeout(()=>{this.cheeseWaveEl.classList.remove("is-bursting"),this.cheeseWaveTimerId=null},920)}dispose(){window.removeEventListener("keydown",this.handleKeyDown),this.flashTimerId!==null&&window.clearTimeout(this.flashTimerId),this.toastTimerId!==null&&window.clearTimeout(this.toastTimerId),this.cheeseWaveTimerId!==null&&window.clearTimeout(this.cheeseWaveTimerId),this.root.remove()}buildStageCardMarkup(e){const t=Zn[e],n=Bv[e];return`
      <button
        type="button"
        id="stage-card-${e}"
        class="stage-card"
        role="radio"
        aria-checked="false"
      >
        <div class="stage-thumb-wrap">
          <img src="${Nv[e]}" alt="${t.title}" class="stage-thumb" />
          <div class="stage-thumb-overlay stage-overlay-${e}" aria-hidden="true">
            <span class="stage-overlay-top">${n.top}</span>
            <span class="stage-overlay-main">${n.main}</span>
          </div>
          <span class="stage-count-chip">${t.roster.length}人</span>
          <span class="stage-best-badge">NEW</span>
        </div>
        <div class="stage-card-body">
          <div class="stage-card-title-row">
            <span class="stage-card-title">${t.title}</span>
            <span class="stage-check-dot" aria-hidden="true">✓</span>
          </div>
          <span class="stage-card-subtitle">${t.subtitle}</span>
        </div>
      </button>
    `}selectStage(e,t=!1){const n=this.selectedStageId!==e;this.selectedStageId=e;for(const s of Os){const o=s===e;this.stageCardEls[s].classList.toggle("is-selected",o),this.stageCardEls[s].setAttribute("aria-checked",o?"true":"false")}t&&n&&this.callbacks.onSelectStage?.(e)}updateTitleScores(e){const t=Os.map(n=>e[n]??0).join("|");if(t!==this.lastBestSignature){this.lastBestSignature=t;for(const n of Os){const s=Math.round(e[n]??0),o=this.stageBestEls[n];s>0?(o.textContent=`BEST ${s}pt`,o.classList.add("has-score")):(o.textContent="NEW",o.classList.remove("has-score"))}}}renderLiveHud(e){this.lastStageId!==e.stageId&&(this.lastStageId=e.stageId,this.stagePillEl.textContent=Zn[e.stageId].title);const t=Math.max(0,Math.ceil(e.timeRemaining));t!==this.lastTimerRounded&&(this.lastTimerRounded=t,this.timerTextEl.textContent=`${t}s`,this.timerPillEl.classList.toggle("is-urgent",t<=10&&t>0));const n=Math.max(1,e.roundDuration),s=Math.max(0,Math.min(1,e.timeRemaining/n)),o=Math.round(s*200);if(o!==this.lastTimerRatioKey){this.lastTimerRatioKey=o;const v=Nl*(1-s);this.timerRingProgress.style.strokeDashoffset=v.toFixed(2)}if(e.maxShots!==this.lastMaxShots||e.shotsUsed!==this.lastShotsUsed){e.maxShots!==this.lastMaxShots&&(this.rebuildFilmPips(e.maxShots),this.lastMaxShots=e.maxShots),this.lastShotsUsed=e.shotsUsed;const v=Math.max(0,e.maxShots-e.shotsUsed);for(let m=0;m<this.filmPipNodes.length;m++)this.filmPipNodes[m].classList.toggle("is-spent",m>=v);this.filmCountTextEl.textContent=`${v}/${e.maxShots}`,this.shutterRemainEl.textContent=String(v),this.shutterBtn.disabled=v<=0,this.finishEarlyBtn.classList.toggle("is-hidden",e.shotsUsed<1)}const r=e.liveMetrics;if(r.visibleCount!==this.lastVisibleCount||r.totalCount!==this.lastTotalCount||r.smilingCount!==this.lastSmilingCount){this.lastVisibleCount=r.visibleCount,this.lastTotalCount=r.totalCount,this.lastSmilingCount=r.smilingCount,this.faceLockCountEl.textContent=`${r.visibleCount} / ${r.totalCount}`;const v=r.totalCount>0&&r.visibleCount>=r.totalCount;this.faceLockBadgeEl.classList.toggle("is-all-in",v)}const c=r.vipTotalCount>0&&r.vipVisibleCount>=r.vipTotalCount;c!==this.lastVipOk&&(this.lastVipOk=c,this.faceLockVipEl.textContent=c?"★ 主役OK":"★ 主役!",this.faceLockVipEl.classList.toggle("is-warn",!c));const l=Math.round(Math.max(0,Math.min(100,r.estimatedQuality))/2)*2;l!==this.lastQualityBucket&&(this.lastQualityBucket=l,this.qualityFillEl.style.width=`${l}%`),this.updateChaosAlert(r.intruderAlert),this.updateContextualTip(r),e.muted!==this.lastMuted&&(this.lastMuted=e.muted,this.muteBtn.innerHTML=e.muted?Gv:Gl,this.muteBtn.classList.toggle("is-muted",e.muted),this.muteBtn.setAttribute("aria-label",e.muted?"サウンドONにする":"サウンドOFFにする"));const d=Math.round(Math.max(0,Math.min(100,e.zoomPercent)));!this.isZoomSliding&&d!==this.lastZoomInt&&(this.lastZoomInt=d,this.zoomSlider.value=String(d),this.updateZoomReadout(d));const h=e.cheeseCooldown<=.02;h!==this.lastCheeseActive&&(this.lastCheeseActive=h,this.cheeseBtn.classList.toggle("is-cooling",!h),this.cheeseBtn.disabled=!h);const u=Math.max(.1,e.cheeseMaxCooldown),f=h?1:Math.max(0,Math.min(1,1-e.cheeseCooldown/u)),a=Math.round(f*120);if(a!==this.lastCheeseRatioKey){this.lastCheeseRatioKey=a;const v=Bl*(1-f);this.cheeseRingProgress.style.strokeDashoffset=v.toFixed(2)}const p=h?0:Math.ceil(e.cheeseCooldown);p!==this.lastCheeseSec&&(this.lastCheeseSec=p,this.cheeseCdLabel.textContent=h?"READY":`${p}s`),this.updateFaceAfBoxes(r.faceBoxes)}updateChaosAlert(e){const t=(e??"").trim();t!==this.lastIntruderAlert&&(this.lastIntruderAlert=t,t.length>0?(this.chaosAlertEl.textContent=t,this.chaosAlertEl.classList.remove("is-hidden","is-pop"),this.chaosAlertEl.offsetWidth,this.chaosAlertEl.classList.add("is-pop"),this.tipPillEl.classList.add("is-hidden")):(this.chaosAlertEl.classList.add("is-hidden"),this.chaosAlertEl.classList.remove("is-pop"),this.tipPillEl.classList.remove("is-hidden")))}updateContextualTip(e){const t=performance.now();if(this.lastTipChangeMs>0&&t-this.lastTipChangeMs<650)return;let n="ドラッグで構図調整・ズームで全員を収めよう！",s="neutral";const o=Math.max(0,e.totalCount-e.visibleCount),r=e.vipTotalCount>0&&e.vipVisibleCount<e.vipTotalCount;let c=!1,l=!1;for(let d=0;d<e.faceBoxes.length;d++){const h=e.faceBoxes[d].label;h&&((h.includes("まばたき")||h.includes("眠")||h.includes("よそ見"))&&(c=!0),(h.includes("転倒")||h.includes("ドミノ"))&&(l=!0))}r?(n="★ 主役が隠れています！カメラを動かして写そう！",s="warn"):o>=2?(n="ドラッグで角度を変えて顔を出そう！",s="warn"):c?(n="「はい、チーズ！」かカメラ振りで起こそう！",s="warn"):l?(n="転倒発生！起き上がりを待つかネタ写真で激写！",s="neutral"):e.totalCount>0&&e.visibleCount>=e.totalCount&&(n="今がシャッターチャンス！📸",s="good"),(n!==this.lastTipText||s!==this.lastTipTone)&&(this.lastTipText=n,this.lastTipTone=s,this.lastTipChangeMs=t,this.tipPillEl.textContent=n,this.tipPillEl.classList.toggle("is-good",s==="good"),this.tipPillEl.classList.toggle("is-warn",s==="warn"))}rebuildFilmPips(e){this.filmPipsEl.innerHTML="",this.filmPipNodes.length=0;for(let t=0;t<e;t++){const n=document.createElement("span");n.className="film-pip",this.filmPipsEl.appendChild(n),this.filmPipNodes.push(n)}}updateZoomReadout(e){const t=.8+e/100*1.4;this.zoomReadoutEl.textContent=`${t.toFixed(1)}x`}updateFaceAfBoxes(e){const t=this.container.clientWidth||window.innerWidth,n=this.container.clientHeight||window.innerHeight,s=Math.min(t,n),o=Math.min(e.length,Ya);for(let r=0;r<Ya;r++){const c=this.afPool[r];if(r>=o){c.active&&(c.active=!1,c.root.classList.remove("is-active"));continue}const l=e[r];if(!(l.status!=="hidden"&&l.screenX>=-.06&&l.screenX<=1.06&&l.screenY>=-.06&&l.screenY<=1.06)){c.active&&(c.active=!1,c.root.classList.remove("is-active"));continue}const h=Math.max(34,Math.min(118,Math.round(l.boxSize*s*1.15))),u=l.screenX*t-h*.5,f=l.screenY*n-h*.5;c.root.style.transform=`translate3d(${u.toFixed(1)}px, ${f.toFixed(1)}px, 0)`,h!==c.lastSize&&(c.lastSize=h,c.root.style.width=`${h}px`,c.root.style.height=`${h}px`),l.status!==c.lastStatus&&(c.root.classList.remove("af-good","af-warn","af-bad"),c.root.classList.add(`af-${l.status}`),c.lastStatus=l.status),l.isVip!==c.lastIsVip&&(c.lastIsVip=l.isVip,c.root.classList.toggle("is-vip",l.isVip));const a=l.status==="warn"||l.status==="bad"?l.label??"":"";a!==c.lastLabel&&(c.lastLabel=a,c.tag.textContent=a,c.root.classList.toggle("has-tag",a.length>0)),c.active||(c.active=!0,c.root.classList.add("is-active"))}}hideAllAfBoxes(){for(const e of this.afPool)e.active&&(e.active=!1,e.root.classList.remove("is-active"))}pulseShutterButton(){this.shutterBtn.classList.remove("is-pressed"),this.shutterBtn.offsetWidth,this.shutterBtn.classList.add("is-pressed"),window.setTimeout(()=>{this.shutterBtn.classList.remove("is-pressed")},150)}populateResultScreen(e){if(this.resultPhotosRef=e.photos,this.resultPhotos=e.photos,this.resultMaxShots=Math.max(e.maxShots||Zn[e.stageId].maxShots||5,this.resultPhotos.length),this.resultStageTitleEl.textContent=Zn[e.stageId].title,this.resultPhotos.length===0){this.funniestPhotoIndex=-1,this.resultPolaroidWrap.classList.add("is-hidden"),this.resultEmptyState.classList.remove("is-hidden"),this.buildFilmstrip(),this.resultBestTagEl.classList.add("is-hidden"),this.downloadBtn.disabled=!0,this.resultRankSeal.textContent="C",this.resultRankSeal.className="rank-seal rank-c",this.resultScoreNum.textContent="0",this.updateResultComedyMeter(0),this.resultCaptionEl.textContent="シャッターチャンスを逃した！",this.resultSubCaptionEl.textContent="制限時間内にシャッターを切って、みんなを写してみよう！",this.comedyAwardBanner.classList.add("is-hidden"),this.setBreakdownBars(0,0,0,0),this.verdictListEl.innerHTML="";return}this.resultPolaroidWrap.classList.remove("is-hidden"),this.resultEmptyState.classList.add("is-hidden"),this.downloadBtn.disabled=!1;let t=0,n=-1;for(let c=0;c<this.resultPhotos.length;c++){const l=this.resultPhotos[c].score.totalScore;l>n&&(n=l,t=c)}this.bestPhotoIndex=t,this.selectedPhotoIndex=t;let s=-1,o=-1;for(let c=0;c<this.resultPhotos.length;c++){const l=this.resultPhotos[c].score.comedyScore??0;(l>o||l===o&&s===t&&c!==t)&&(o=l,s=c)}this.funniestPhotoIndex=s!==-1&&s!==t&&o>=50?s:-1;const r=n>0&&n>this.roundStartBestScore;this.resultBestTagEl.classList.toggle("is-hidden",!r),this.buildFilmstrip(),this.selectResultPhoto(this.selectedPhotoIndex)}buildFilmstrip(){this.filmstripEl.innerHTML="";const e=Math.max(5,this.resultMaxShots);for(let t=0;t<e;t++)if(t<this.resultPhotos.length){const n=this.resultPhotos[t],s=document.createElement("button");s.type="button",s.className="filmstrip-item",s.setAttribute("role","option"),s.dataset.index=String(t);const o=t===this.bestPhotoIndex,r=t===this.funniestPhotoIndex;s.innerHTML=`
          <div class="filmstrip-thumb-wrap">
            <img src="${n.rawDataUrl||n.polaroidDataUrl}" alt="ショット #${n.shotIndex}" class="filmstrip-thumb" />
            ${o?'<span class="filmstrip-best-star">★ BEST</span>':""}
            ${r?'<span class="filmstrip-comedy-star">🤣 爆笑</span>':""}
            <span class="filmstrip-shot-num">#${n.shotIndex}</span>
          </div>
          <div class="filmstrip-foot">
            <span class="filmstrip-rank ${Za(n.score.rank)}">${n.score.rank}</span>
            <span class="filmstrip-pts">${n.score.totalScore}pt</span>
          </div>
        `,s.addEventListener("click",()=>this.selectResultPhoto(t)),this.filmstripEl.appendChild(s)}else{const n=document.createElement("div");n.className="filmstrip-item filmstrip-empty",n.setAttribute("aria-hidden","true"),n.innerHTML=`
          <div class="filmstrip-empty-frame">
            <span class="filmstrip-empty-num">#${t+1}</span>
          </div>
          <div class="filmstrip-foot filmstrip-foot-empty">
            <span>未使用</span>
          </div>
        `,this.filmstripEl.appendChild(n)}}selectResultPhoto(e){if(e<0||e>=this.resultPhotos.length)return;this.selectedPhotoIndex=e;const t=this.resultPhotos[e],n=t.score;this.filmstripEl.querySelectorAll("button.filmstrip-item").forEach((o,r)=>{const c=r===e;o.classList.toggle("is-selected",c),o.setAttribute("aria-selected",c?"true":"false")}),this.resultPolaroidImg.src=t.polaroidDataUrl||t.rawDataUrl,this.resultPolaroidImg.alt=`ショット #${t.shotIndex} ${n.caption}`,this.resultRankSeal.textContent=n.rank,this.resultRankSeal.className=`rank-seal ${Za(n.rank)}`,this.resultScoreNum.textContent=String(n.totalScore),this.updateResultComedyMeter(n.comedyScore??0),this.resultCaptionEl.textContent=n.caption,this.resultSubCaptionEl.textContent=n.subCaption,n.comedyAward?(this.comedyAwardBadge.textContent=n.comedyAward.badge,this.comedyAwardReason.textContent=n.comedyAward.reason,this.comedyAwardBanner.classList.remove("is-hidden")):this.comedyAwardBanner.classList.add("is-hidden"),this.setBreakdownBars(n.coverageScore,n.expressionScore,n.compositionScore,n.momentScore),this.renderVerdictChips(n.verdicts)}updateResultComedyMeter(e){const t=Math.max(0,Math.min(100,Math.round(e))),n=Fv(t);this.resultComedyValEl.textContent=`🤣 爆笑度 ${t}%`,n?(this.resultComedyWordEl.textContent=n,this.resultComedyWordEl.classList.remove("is-hidden")):(this.resultComedyWordEl.textContent="",this.resultComedyWordEl.classList.add("is-hidden")),this.resultComedyPillEl.classList.toggle("is-rofl",t>=80),this.resultComedyPillEl.classList.toggle("is-high",t>=55&&t<80),this.resultComedyPillEl.classList.toggle("is-mid",t>=30&&t<55)}setBreakdownBars(e,t,n,s){const o=Math.max(0,Math.min(40,Math.round(e))),r=Math.max(0,Math.min(30,Math.round(t))),c=Math.max(0,Math.min(20,Math.round(n))),l=Math.max(0,Math.min(10,Math.round(s)));this.barCoverageVal.textContent=`${o} / 40`,this.barCoverageFill.style.width=`${o/40*100}%`,this.barExpressionVal.textContent=`${r} / 30`,this.barExpressionFill.style.width=`${r/30*100}%`,this.barCompositionVal.textContent=`${c} / 20`,this.barCompositionFill.style.width=`${c/20*100}%`,this.barMomentVal.textContent=`${l} / 10`,this.barMomentFill.style.width=`${l/10*100}%`}renderVerdictChips(e){this.verdictListEl.innerHTML="";const t=[...e].sort((s,o)=>{const r=c=>{const l=Vl(c);let d=0;return c.isVip&&(d-=20),l==="bad"?d-=10:l==="warn"&&(d-=5),d};return r(s)-r(o)}),n=document.createDocumentFragment();for(const s of t){const o=Vl(s),r=o==="good"?"✓":o==="warn"?"⚠":"✕",c=document.createElement("span");c.className=`verdict-chip verdict-${o}`;const l=document.createElement("span");l.className="verdict-icon",l.textContent=r;const d=document.createElement("span");d.className="verdict-name",d.textContent=s.isVip?`★${s.name}`:s.name;const h=document.createElement("span");h.className="verdict-tag",h.textContent=s.tag,c.append(l,d,h),n.appendChild(c)}this.verdictListEl.appendChild(n)}downloadSelectedPhoto(){const e=this.resultPhotos[this.selectedPhotoIndex];if(!e)return;const t=e.polaroidDataUrl||e.rawDataUrl;if(!t)return;const n=document.createElement("a");n.href=t,n.download=`zenin-utsure-shot-${e.shotIndex}.png`,document.body.appendChild(n),n.click(),n.remove()}onKeyDown(e){if(this.currentPhase!=="playing"||e.repeat||e.defaultPrevented)return;const t=document.activeElement;t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT")||(e.code==="Space"?(e.preventDefault(),this.cheeseBtn.disabled||this.callbacks.onSayCheese()):e.code==="Enter"&&(e.preventDefault(),this.shutterBtn.disabled||(this.pulseShutterButton(),this.callbacks.onShutter())))}}const Hl="zenin_utsure_best_scores_v1",Wl=5,fi=4/3;class Xv{canvas;renderer;scene;camera;evalCamera;faceCache;evaluator;sound;cameraController;hud;currentStage=Zn.wedding;builtStage=null;simulator;characterMeshes=new Map;phase="title";elapsedTime=0;lastFrameMs=0;rafId=0;timeRemaining=Zn.wedding.roundDuration;shotsUsed=0;cheeseCooldown=0;photos=[];latestPhoto=null;nextPhotoId=1;pendingResultTimeout=null;isCapturingPhoto=!1;endingRound=!1;roundEpoch=0;lastCountdownWhole=-1;lastAfBeepTime=-10;lastGoodVisibleCount=0;lastZoomTickPercent=-1;bestScoreByStage;liveMetrics={visibleCount:0,smilingCount:0,totalCount:0,vipVisibleCount:0,vipTotalCount:0,faceBoxes:[],estimatedQuality:0};handleResizeBound;constructor(e,t){this.canvas=e,this.renderer=new rg({canvas:e,antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.outputColorSpace=et,this.renderer.toneMapping=$l,this.renderer.toneMappingExposure=1.06,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Yl,this.scene=new cg;const n=Math.max(1,window.innerWidth),s=Math.max(1,window.innerHeight);this.camera=new rn(this.currentStage.defaultCamera.fov,n/s,.15,140),this.evalCamera=new rn(this.currentStage.defaultCamera.fov,fi,.15,140),this.renderer.setSize(n,s,!1),this.faceCache=new n1,this.evaluator=new _v,this.sound=new zv,this.bestScoreByStage=this.loadBestScores(),this.simulator=new gv(this.currentStage,Date.now()&65535),this.cameraController=new Uv(e,this.camera,this.currentStage),this.cameraController.setEnabled(!1),this.hud=new Wv(t,{onStartStage:o=>this.startStage(o),onSelectStage:o=>{if(this.phase==="title"&&o!==this.currentStage.id){const r=Zn[o];r&&(this.loadStageWorld(r,(Date.now()^9320)>>>0),this.pushHud())}},onShutter:()=>{this.captureShot()},onSayCheese:()=>this.triggerSayCheese(),onZoomChange:o=>{this.cameraController.setZoomNormalized(o);const r=Math.round(o*100);Math.abs(r-this.lastZoomTickPercent)>=6&&(this.lastZoomTickPercent=r,this.sound.playZoomTick())},onToggleMute:()=>{this.sound.unlock(),this.sound.setMuted(!this.sound.isMuted()),this.pushHud()},onFinishEarly:()=>{this.phase==="playing"&&this.photos.length>0&&!this.isCapturingPhoto&&this.enterResultPhase()},onReturnTitle:()=>this.enterTitlePhase(),onReplay:()=>this.startStage(this.currentStage.id)}),this.loadStageWorld(this.currentStage,(Date.now()^23100)>>>0),this.handleResizeBound=()=>this.handleResize(),window.addEventListener("resize",this.handleResizeBound),this.pushHud(),this.lastFrameMs=performance.now(),this.rafId=requestAnimationFrame(o=>this.loop(o))}loadBestScores(){const e={wedding:0,school_trip:0,sports_day:0,tropical_beach:0};try{const t=window.localStorage.getItem(Hl);if(!t)return e;const n=JSON.parse(t);return{wedding:typeof n.wedding=="number"?n.wedding:0,school_trip:typeof n.school_trip=="number"?n.school_trip:0,sports_day:typeof n.sports_day=="number"?n.sports_day:0,tropical_beach:typeof n.tropical_beach=="number"?n.tropical_beach:0}}catch{return e}}saveBestScores(){try{window.localStorage.setItem(Hl,JSON.stringify(this.bestScoreByStage))}catch{}}clearStageWorld(){for(const e of this.characterMeshes.values())this.scene.remove(e.root),e.dispose();this.characterMeshes.clear(),this.builtStage&&(this.scene.remove(this.builtStage.root),this.builtStage.dispose(),this.builtStage=null)}loadStageWorld(e,t){this.clearStageWorld(),this.currentStage=e,this.builtStage=tv(e),this.scene.add(this.builtStage.root),this.scene.background=this.builtStage.skyColor,this.scene.fog=new ec(this.builtStage.fogColor.getHex(),.0115),this.simulator.reset(e,t),this.cameraController.configureForStage(e),this.cameraController.update(.016);for(const n of this.simulator.npcs){const s=new l1(n.spec,this.faceCache);this.characterMeshes.set(n.spec.id,s),this.scene.add(s.root),s.syncFromState(n,.016,this.elapsedTime),s.syncHeadTransformToState(n)}this.builtStage.syncIntruder(this.simulator.intruder,.016,this.elapsedTime),this.builtStage.syncHazard(this.simulator.hazard,.016,this.elapsedTime),this.liveMetrics=this.evaluator.evaluateLive(this.simulator.npcs,this.camera,this.simulator.intruder,this.simulator.hazard)}startStage(e){this.clearPendingResult(),this.roundEpoch+=1,this.sound.unlock();const t=Zn[e]??Zn.wedding,n=Date.now()+Math.floor(Math.random()*1e5)>>>0;this.loadStageWorld(t,n),this.phase="playing",this.timeRemaining=t.roundDuration,this.shotsUsed=0,this.cheeseCooldown=0,this.photos=[],this.latestPhoto=null,this.lastCountdownWhole=-1,this.lastGoodVisibleCount=0,this.isCapturingPhoto=!1,this.endingRound=!1,this.cameraController.setEnabled(!0),this.sound.setBgmUrgency(!1),this.sound.startBgm(t.id),this.pushHud()}enterTitlePhase(){this.clearPendingResult(),this.roundEpoch+=1,this.phase="title",this.endingRound=!1,this.isCapturingPhoto=!1,this.cameraController.setEnabled(!1),this.sound.stopBgm(),this.loadStageWorld(this.currentStage,(Date.now()^4919)>>>0),this.pushHud()}enterResultPhase(){this.clearPendingResult(),this.roundEpoch+=1,this.phase="result",this.endingRound=!1,this.isCapturingPhoto=!1,this.cameraController.setEnabled(!1),this.sound.setBgmUrgency(!1),this.sound.stopBgm();let e=null;for(const t of this.photos)(!e||t.score.totalScore>e.score.totalScore)&&(e=t);if(e){const t=this.currentStage.id;e.score.totalScore>(this.bestScoreByStage[t]??0)&&(this.bestScoreByStage[t]=e.score.totalScore,this.saveBestScores()),this.sound.playResultFanfare(e.score.rank)}this.pushHud()}clearPendingResult(){this.pendingResultTimeout!==null&&(window.clearTimeout(this.pendingResultTimeout),this.pendingResultTimeout=null)}triggerSayCheese(){this.phase!=="playing"||this.cheeseCooldown>0||this.endingRound||(this.sound.unlock(),this.cheeseCooldown=Wl,this.simulator.triggerSayCheese(this.camera),this.sound.playSayCheese(),this.hud.triggerCheeseWave(),this.pushHud())}syncPhotoEvalCamera(){this.camera.updateMatrixWorld(!0),this.evalCamera.position.copy(this.camera.position),this.evalCamera.quaternion.copy(this.camera.quaternion),this.evalCamera.aspect=fi;const e=Math.max(.3,this.camera.aspect||fi);if(e<fi){const t=ht.degToRad(this.camera.fov*.5),n=Math.atan(Math.tan(t)*e/fi);this.evalCamera.fov=ht.radToDeg(n*2)}else this.evalCamera.fov=this.camera.fov;return this.evalCamera.updateProjectionMatrix(),this.evalCamera.updateMatrixWorld(!0),this.evalCamera}async captureShot(){if(this.phase!=="playing"||this.isCapturingPhoto||this.shotsUsed>=this.currentStage.maxShots)return;const e=this.roundEpoch;this.isCapturingPhoto=!0,this.sound.unlock(),this.sound.playShutter(),this.shotsUsed+=1;const t=this.shotsUsed,n=Math.max(0,this.timeRemaining);for(const h of this.simulator.npcs){const u=this.characterMeshes.get(h.spec.id);u&&(u.syncFromState(h,.001,this.elapsedTime),u.syncHeadTransformToState(h))}this.builtStage&&(this.builtStage.syncIntruder(this.simulator.intruder,.001,this.elapsedTime),this.builtStage.syncHazard(this.simulator.hazard,.001,this.elapsedTime));const s=this.syncPhotoEvalCamera(),o=this.evaluator.evaluatePhoto(this.simulator.npcs,s,this.currentStage,this.simulator.intruder,this.simulator.hazard);for(const h of this.characterMeshes.values())h.setPhotoCaptureMode(!0);this.renderer.render(this.scene,this.camera);const r=this.canvas.toDataURL("image/jpeg",.9),c=Pv(this.canvas,o,this.currentStage.title,t);for(const h of this.characterMeshes.values())h.setPhotoCaptureMode(!1);let l=r;try{l=await c}catch{l=r}if(e!==this.roundEpoch||this.phase!=="playing"){this.isCapturingPhoto=!1;return}const d={id:this.nextPhotoId++,shotIndex:t,timestampRemaining:n,stageId:this.currentStage.id,stageTitle:this.currentStage.title,rawDataUrl:r,polaroidDataUrl:l,score:o};this.photos.push(d),this.latestPhoto=d,this.hud.triggerShutterFlash(d),this.isCapturingPhoto=!1,this.pushHud(),this.shotsUsed>=this.currentStage.maxShots&&!this.endingRound&&(this.endingRound=!0,this.clearPendingResult(),this.pendingResultTimeout=window.setTimeout(()=>{e===this.roundEpoch&&this.phase==="playing"&&this.enterResultPhase()},1150))}handleResize(){const e=Math.max(1,window.innerWidth),t=Math.max(1,window.innerHeight);this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t,!1)}loop(e){this.rafId=requestAnimationFrame(o=>this.loop(o));const t=(e-this.lastFrameMs)/1e3;this.lastFrameMs=e;const n=Math.min(Math.max(t,.001),.05);this.elapsedTime+=n;let s=0;if(this.phase==="title"){const o=this.currentStage.defaultCamera,r=Math.max(.35,this.camera.aspect||fi),c=r<fi?fi/r:1,l=Math.min(1.82,Math.pow(c,.58)),d=Math.min(1.36,Math.pow(c,.34)),h=Math.sin(this.elapsedTime*.34)*.22,u=o.elevation+.05+Math.sin(this.elapsedTime*.23)*.03,f=(o.distance+.7)*l,a=Math.cos(u),p=o.target.y-.35;this.camera.position.set(o.target.x+Math.sin(h)*f*a,o.target.y+.2+Math.sin(u)*f,o.target.z+Math.cos(h)*f*a),this.camera.fov=Math.min(72,o.fov*d),this.camera.updateProjectionMatrix(),this.camera.lookAt(o.target.x,p,o.target.z),s=.08}else if(this.phase==="playing"){const o=this.cameraController.update(n);if(s=o.angularSpeed,o.zoomChanged&&this.sound.playZoomTick(),this.cheeseCooldown>0&&(this.cheeseCooldown=Math.max(0,this.cheeseCooldown-n)),!this.endingRound&&this.shotsUsed<this.currentStage.maxShots){this.timeRemaining=Math.max(0,this.timeRemaining-n),this.timeRemaining<=10&&this.sound.setBgmUrgency(!0);const r=Math.ceil(this.timeRemaining);if(r<=5&&r>=1&&r!==this.lastCountdownWhole&&(this.lastCountdownWhole=r,this.sound.playCountdownTick(r===1)),this.timeRemaining<=0)if(this.endingRound=!0,this.photos.length===0&&!this.isCapturingPhoto){const c=this.roundEpoch;this.captureShot().then(()=>{c!==this.roundEpoch||this.phase!=="playing"||(this.clearPendingResult(),this.pendingResultTimeout=window.setTimeout(()=>{c===this.roundEpoch&&this.phase==="playing"&&this.enterResultPhase()},950))})}else this.isCapturingPhoto||this.enterResultPhase()}}if(this.builtStage&&this.builtStage.update(n,this.elapsedTime),this.phase==="title"||this.phase==="playing"){const o=this.simulator.step(n,this.camera,s);for(const r of this.simulator.npcs){const c=this.characterMeshes.get(r.spec.id);c&&(c.syncFromState(r,n,this.elapsedTime),c.syncHeadTransformToState(r))}if(this.builtStage&&(this.builtStage.syncIntruder(this.simulator.intruder,n,this.elapsedTime),this.builtStage.syncHazard(this.simulator.hazard,n,this.elapsedTime)),this.phase==="playing"){for(const c of o)this.sound.playSimEvent(c),this.builtStage&&(c.type==="sneeze_blast"||c.type==="wave_crash"||c.type==="kusudama_pop"?this.builtStage.spawnDustPuff(c.position,16):c.type==="pileup"||c.type==="intruder_bonk"||c.type==="ball_boing"?this.builtStage.spawnDustPuff(c.position,12):c.type==="fall"||c.type==="slip"?this.builtStage.spawnDustPuff(c.position,9):(c.type==="shove"||c.type==="jump"||c.type==="hat_pop")&&this.builtStage.spawnDustPuff(c.position,5));this.liveMetrics=this.evaluator.evaluateLive(this.simulator.npcs,this.camera,this.simulator.intruder,this.simulator.hazard);const r=Math.max(1,this.liveMetrics.totalCount-1);this.liveMetrics.visibleCount>=r&&this.lastGoodVisibleCount<r&&this.elapsedTime-this.lastAfBeepTime>2.6&&(this.lastAfBeepTime=this.elapsedTime,this.sound.playAfBeep(this.liveMetrics.visibleCount===this.liveMetrics.totalCount)),this.lastGoodVisibleCount=this.liveMetrics.visibleCount,this.pushHud()}}this.renderer.render(this.scene,this.camera)}pushHud(){const e={phase:this.phase,stageId:this.currentStage.id,timeRemaining:this.timeRemaining,roundDuration:this.currentStage.roundDuration,shotsUsed:this.shotsUsed,maxShots:this.currentStage.maxShots,cheeseCooldown:this.cheeseCooldown,cheeseMaxCooldown:Wl,zoomPercent:Math.round(this.cameraController.getZoomNormalized()*100),muted:this.sound.isMuted(),liveMetrics:this.liveMetrics,latestPhoto:this.latestPhoto,photos:this.photos,bestScoreByStage:this.bestScoreByStage};this.hud.render(e)}dispose(){cancelAnimationFrame(this.rafId),this.clearPendingResult(),window.removeEventListener("resize",this.handleResizeBound),this.clearStageWorld(),this.cameraController.dispose(),this.hud.dispose(),this.sound.dispose(),this.faceCache.dispose(),this.renderer.dispose()}}function Xl(){const i=document.getElementById("game-canvas"),e=document.getElementById("ui-root");if(!i||!e)throw new Error("Required #game-canvas or #ui-root element missing in index.html");new Xv(i,e)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Xl,{once:!0}):Xl();
