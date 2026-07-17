import React from 'react'
import { Label } from '../ui/label'
import {Select, SelectContent, SelectItem,SelectTrigger,SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

const CommonForm = ({formControls,formData,setFormData,onSubmit,buttonText}) => {
    const renderInputsByComponentType = (getControlItems)=>
    {
      let element = null;
      const value = formData[getControlItems.name] || ''; 
    switch(getControlItems.componentType){
        case 'input':
            element = (<Input
            name = {getControlItems.name}
            placeholder = {getControlItems.placeholder}
            id={getControlItems.name}
            type={getControlItems.type}
            value={value}
            onChange={event=>setFormData({
                ...formData,
                [getControlItems.name] :event.target.value
            })}
            />);
            break;
        case 'select':
            element = (
            <Select value={value} onValueChange={(value)=> setFormData({
                ...formData,
                [getControlItems.name]:value
            })}>
                <SelectTrigger className='w-full'>
                    <SelectValue placeholder={getControlItems.placeholder}></SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {getControlItems.options && getControlItems.options.length>0?
                     getControlItems.options.map(optionItems=> <SelectItem key={optionItems.id} value={optionItems.id}>
                    {optionItems.label}
                    </SelectItem>):null}
                </SelectContent>
            </Select>
            );
            break;  
        case 'textarea':
            element = (
            <Textarea 
               value={value}
               name={getControlItems.name} 
               placeholder={getControlItems.placeholder} 
               id={getControlItems.id}
               type={getControlItems.type}
                onChange={event=>setFormData({
                ...formData,
                [getControlItems.name] :event.target.value
            })}
               />
            );
            break;
        default :
            element = (<Input
            name = {getControlItems.name}
            placeholder = {getControlItems.placeholder}
            id={getControlItems.name}
            type={getControlItems.type}
            onChange={event=>setFormData({
                ...formData,
                [getControlItems.name] :event.target.value
            })}
            />);
        break;
    }
    return element
    }
  return (
    <form onSubmit={onSubmit}>
         <div className='flex flex-col gap-3'>
             {formControls.map(controlItem=><div className='grid w-full gap-1.5' key={controlItem.name}>
                  <Label className='mb-1'>{controlItem.label}</Label>
                  {
                    renderInputsByComponentType(controlItem)
                  }
             </div>)}
         </div>
         <Button type='submit' className='mt-2 w-full'>{buttonText || 'Submit'}</Button>
    </form>
  )
}

export default CommonForm