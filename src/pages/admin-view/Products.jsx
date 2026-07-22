import {Fragment, useState} from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import CommonForm from '@/components/common/Form';
import { addProductFormElements } from '@/config';
import ProductImageUpload from './Image-Upload';


const initialFormData ={
  image:null,
  title:'',
  description:'',
  category:'',
  brand:'',
  price:"",
  salePrice:'',
  totalStock:''
} 
const Products = () => {
  const [openCreateProductsDialog,setOpenCreateProductsDialog] = useState(false);
  const [formData,setFormData] = useState(initialFormData);
  const [imageFile,setImageFile] = useState(null);
  const [uploadedImageUrl , setUploadedImageUrl] = useState("");
  const [imageLoadingState,setImageLoadingState]=useState(false);
  const onSubmit = ()=>{

  }
  return (
    <Fragment>
       <div className='mb-5 flex justify-end w-full'>
         <Button onClick={()=>setOpenCreateProductsDialog(true)}>Add New Product</Button>
       </div>
       <div className='grip gap-4 md:grid-cols-3 lg:grid-cols-4'></div>
       <Sheet open={openCreateProductsDialog} onOpenChange={()=>{
        setOpenCreateProductsDialog(false);
       }}>
          <SheetContent side='right' className="overflow-auto">
              <SheetHeader>
                 <SheetTitle>Add New Product</SheetTitle>
              </SheetHeader>
              <div className='px-4'>
                <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} 
                uploadedImageUrl={uploadedImageUrl} 
                setUploadedImageUrl={setUploadedImageUrl} imageLoadingState={imageLoadingState}
                 setImageLoadingState={setImageLoadingState}/>
                 <CommonForm formControls={addProductFormElements} 
                 onSubmit={onSubmit} formData={formData} 
                 setFormData={setFormData} 
                 buttonText='Add Product'></CommonForm>
              </div>
          </SheetContent>
       </Sheet>
    </Fragment>
  )
}

export default Products