import RegisterForm from '@/components/forms/registerForm'
import {  getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const Register=  async ({params: {userid}} : SearchParamProps) => {

    const user = await getUser(userid);

    
    // const patient = await getPatient(userid);

    // if (patient) redirect(`/patients/${userid}/new-appointment`);
  return (
    <div className="flex h-screen max-h-screen">



    <section className="remove-scrollbar container">

      <div className="sub-container max-w-[860px] flex-1 flex-col py-10">

        <Image src="/assets/icons/logo-icon.svg" height={1000} width={1000} alt="patient" className="mb-12 h-10 w-fit" />
        
        <RegisterForm user={user}/>

        
       
       <p className="copyright py-12">
       © 2025 AfyaBook
       </p>

     
      
      </div>
    </section>

    <Image src="/assets/images/register-img.png" height={1000} width={1000} alt="patient" className="side-img max-w-[390px]" />
   
    </div>
  )
}

export default Register