"use client"

//react phone inpue
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
//react date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React from 'react'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from 'react-hook-form'
import { FormFieldType } from './forms/PatientForm'
import Image from 'next/image'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';





interface CustomProps{
    control: Control<any>
    fieldtype: FormFieldType
    name: string
    label?:string 
    placeholder?: string
    iconSrc?: string
    iconAlt?: string
    disable?:boolean
    dateFormat?:string 
    showTimeSelect?:boolean
    children?:React.ReactNode
    renderSheketon?: (field :any) => React.ReactNode


}

const RenderInput = ({field ,props}: {field:any; props:CustomProps}) =>{

    const {fieldtype ,iconSrc, iconAlt,placeholder,showTimeSelect, dateFormat,renderSheketon}= props;

    switch (props.fieldtype) {
        case FormFieldType.INPUT:

        return (
            <div className='flex rounded-md border border-dark-500 bg-dark-400'>
                {props.iconSrc && (

                    <Image
                    src={props.iconSrc}
                    alt={props.iconAlt || 'icon'}
                    height={24}
                    width={24}
                    className='ml-2'
                    />
                )}
                
                <FormControl>
                    <input placeholder={placeholder}
                    {...field}
                    className='shad-input border-0'
                    />
                </FormControl>

            </div>
        )
    case FormFieldType.PHONE_INPUT:
        return (

            <FormControl>

    <PhoneInput
      placeholder="Enter phone number"
      defaultCountry='US'
      international
      withCountryCallingCode
      value={field.value as 'E164Number' | undefined}
      onChange={field.onChange}
      className='input-phone shad-input border-0'
      />

            </FormControl>
        )
    case FormFieldType.DATE_PICKER:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    <Image
                    src="/assets/icons/calendar.svg"
                    height={24}
                    width={24}
                    alt='calender'
                    className='ml-2'
                    />
                    <FormControl>

                    <DatePicker
              showTimeSelect={props.showTimeSelect ?? false}
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              timeInputLabel="Time:"
              dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
              wrapperClassName="date-picker"
            />

                    </FormControl>
                </div>
                
        )
    case FormFieldType.SKELETON:
            return renderSheketon ? renderSheketon
            (field) :null

    case FormFieldType.SELECT:
            return(
                
                <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="shad-select-trigger">
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="shad-select-content">
                    {props.children}
                  </SelectContent>
                </Select>
              </FormControl>
                
                )

    case FormFieldType.TEXTAREA:
        return (
          <FormControl>
            <Textarea
              placeholder={props.placeholder}
              {...field}
              className="shad-textArea"
              disabled={props.disable}
            />
          </FormControl>
        );
          
        case FormFieldType.CHECKBOX:
            return (
                <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>   
        )
        default:
        break;
        
    }
    
}

const CustomFormField = (props: CustomProps) => {

 const {control , fieldtype ,name, label} = props;

  return (

    <FormField
          control={control}
          name={name}
          render={({ field }) => (
           <FormItem className='flex-1'>
        {fieldtype !== FormFieldType.CHECKBOX && label &&(
            <FormLabel>{label}</FormLabel>
        )}

        <RenderInput
        field ={field}
        props ={props}
        />

        <FormMessage className='shad-error' ></FormMessage>
           </FormItem>
          )}
        />
  )
}

export default CustomFormField