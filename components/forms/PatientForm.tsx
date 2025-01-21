"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import CustomButton from "../CustomButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { register } from "module"
import { createUser } from "@/lib/actions/patient.actions"
export enum FormFieldType{
  INPUT ="input",
  TEXTAREA="textarea",
  PHONE_INPUT ="phoneInput",
  CHECKBOX="checkbox",
  DATE_PICKER ="datepicker",
  SELECT="select",
  SKELETON ='skeleton'
}



const  PatientForm =()=> {
  // 1. Define your form.
  const router = useRouter();
  const [isLoading , setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name:"",
      email:"",
      phone:"",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit({name,email,phone}: z.infer<typeof UserFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);

    try {
      
      const userData ={name ,email ,phone};

      const user = await createUser(userData);
      if (user) router.push(`/patients/${user.$id}/register`)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">

        <section className="mb-12 space-y-4">
            <h1 className="header">Hi there 👋</h1>
            <p className="text-dark-700">Schedule your first appointment</p>
        </section>

        <CustomFormField
          fieldtype={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full name"
          placeholder="Cliff Karimi"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

<CustomFormField
          fieldtype={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email Address"
          placeholder="admin@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

<CustomFormField
          fieldtype={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone Number"
          placeholder=""
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />






        <CustomButton
        isLoading={isLoading}
        >Get Started</CustomButton>

      </form>
    </Form>
  )
}
export default PatientForm

