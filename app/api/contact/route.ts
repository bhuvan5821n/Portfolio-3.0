import {getPortfolioApiUrl} from "@/lib/portfolio-api";

type ContactBody={name?:unknown;email?:unknown;subject?:unknown;message?:unknown;honeypot?:unknown};

function validText(value:unknown,max:number){return typeof value==="string"&&value.trim().length>0&&value.length<=max;}

export async function POST(request:Request){
  let body:ContactBody;
  try{body=await request.json() as ContactBody;}catch{return Response.json({success:false,error:{code:"INVALID_JSON",message:"Please check the form and try again."}},{status:400});}
  const validEmail=typeof body.email==="string"&&body.email.length<=254&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email);
  if(!validText(body.name,100)||!validEmail||!validText(body.subject,200)||!validText(body.message,5000)){
    return Response.json({success:false,error:{code:"VALIDATION_ERROR",message:"Please complete every field with a valid email address."}},{status:400});
  }
  try{
    const response=await fetch(`${getPortfolioApiUrl()}/api/v1/contact`,{
      method:"POST",
      headers:{"content-type":"application/json","accept":"application/json"},
      body:JSON.stringify({name:body.name,email:body.email,subject:body.subject,message:body.message,honeypot:typeof body.honeypot==="string"?body.honeypot:""}),
      cache:"no-store",
      signal:AbortSignal.timeout(5_000),
    });
    const payload=await response.json().catch(()=>({success:false,error:{code:"UPSTREAM_ERROR",message:"The contact service returned an unreadable response."}}));
    return Response.json(payload,{status:response.status});
  }catch{
    return Response.json({success:false,error:{code:"BACKEND_UNAVAILABLE",message:"The contact form is temporarily offline. Please use the email link instead."}},{status:503});
  }
}
