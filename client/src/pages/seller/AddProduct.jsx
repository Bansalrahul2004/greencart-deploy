import React, { useState } from 'react'
import { assets, categories } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const AddProduct = () => {

    const [files, setFiles] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [offerPrice, setOfferPrice] = useState('');
    // Smart Badge Fields
    const [stockQuantity, setStockQuantity] = useState(100);
    const [featured, setFeatured] = useState(false);
    const [bestSeller, setBestSeller] = useState(false);
    const [popular, setPopular] = useState(false);
    const [green, setGreen] = useState(false);
    const [ecoType, setEcoType] = useState('');
    const [freeShipping, setFreeShipping] = useState(false);

    const {axios} = useAppContext()

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();

            const productData = {
                name,
                description: description.split('\n'),
                category,
                price,
                offerPrice,
                stockQuantity,
                featured,
                bestSeller,
                popular,
                green,
                ecoType: ecoType || null,
                freeShipping
            }

            const formData = new FormData();
            formData.append('productData', JSON.stringify(productData));
            for (let i = 0; i < files.length; i++) {
                formData.append('images', files[i])
            }

            const {data} = await axios.post('/api/product/add', formData)

            if (data.success){
                toast.success(data.message);
                setName('');
                setDescription('')
                setCategory('')
                setPrice('')
                setOfferPrice('')
                setFiles([])
                setStockQuantity(100)
                setFeatured(false)
                setBestSeller(false)
                setPopular(false)
                setGreen(false)
                setEcoType('')
                setFreeShipping(false)
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
        
      }

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
            <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">
                <div>
                    <p className="text-base font-medium">Product Image</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {Array(4).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`}>

                                <input onChange={(e)=>{
                                    const updatedFiles = [...files];
                                    updatedFiles[index] = e.target.files[0]
                                    setFiles(updatedFiles)
                                }}
                                type="file" id={`image${index}`} hidden />

                                <img className="max-w-24 cursor-pointer" src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area} alt="uploadArea" width={100} height={100} />
                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
                    <input onChange={(e)=> setName(e.target.value)} value={name}
                     id="product-name" type="text" placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
                    <textarea onChange={(e)=> setDescription(e.target.value)} value={description}
                     id="product-description" rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here"></textarea>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="category">Category</label>
                    <select onChange={(e)=> setCategory(e.target.value)} value={category} 
                    id="category" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40">
                        <option value="">Select Category</option>
                        {categories.map((item, index)=>(
                            <option key={index} value={item.path}>{item.path}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
                        <input onChange={(e)=> setPrice(e.target.value)} value={price}
                         id="product-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
                        <input onChange={(e)=> setOfferPrice(e.target.value)} value={offerPrice} 
                        id="offer-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                </div>
                
                {/* Smart Badge Fields */}
                <div className="space-y-4 border-t pt-4">
                    <h3 className="text-lg font-semibold text-gray-800">Smart Badge Settings</h3>
                    
                    <div className="flex flex-col gap-1">
                        <label className="text-base font-medium" htmlFor="stock-quantity">Stock Quantity</label>
                        <input 
                            onChange={(e)=> setStockQuantity(parseInt(e.target.value))} 
                            value={stockQuantity}
                            id="stock-quantity" 
                            type="number" 
                            min="0"
                            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" 
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <input 
                                type="checkbox" 
                                id="featured" 
                                checked={featured}
                                onChange={(e)=> setFeatured(e.target.checked)}
                                className="w-4 h-4"
                            />
                            <label htmlFor="featured" className="text-sm font-medium">Featured Product</label>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <input 
                                type="checkbox" 
                                id="bestSeller" 
                                checked={bestSeller}
                                onChange={(e)=> setBestSeller(e.target.checked)}
                                className="w-4 h-4"
                            />
                            <label htmlFor="bestSeller" className="text-sm font-medium">Best Seller</label>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <input 
                                type="checkbox" 
                                id="popular" 
                                checked={popular}
                                onChange={(e)=> setPopular(e.target.checked)}
                                className="w-4 h-4"
                            />
                            <label htmlFor="popular" className="text-sm font-medium">Popular</label>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <input 
                                type="checkbox" 
                                id="green" 
                                checked={green}
                                onChange={(e)=> setGreen(e.target.checked)}
                                className="w-4 h-4"
                            />
                            <label htmlFor="green" className="text-sm font-medium">Eco-Friendly</label>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <input 
                                type="checkbox" 
                                id="freeShipping" 
                                checked={freeShipping}
                                onChange={(e)=> setFreeShipping(e.target.checked)}
                                className="w-4 h-4"
                            />
                            <label htmlFor="freeShipping" className="text-sm font-medium">Free Shipping</label>
                        </div>
                    </div>

                    {green && (
                        <div className="flex flex-col gap-1">
                            <label className="text-base font-medium" htmlFor="eco-type">Eco Type</label>
                            <select 
                                onChange={(e)=> setEcoType(e.target.value)} 
                                value={ecoType}
                                id="eco-type" 
                                className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                            >
                                <option value="">Select Eco Type</option>
                                <option value="organic">Organic</option>
                                <option value="local">Local</option>
                                <option value="sustainable">Sustainable</option>
                                <option value="recycled">Recycled</option>
                            </select>
                        </div>
                    )}
                </div>

                <button className="px-8 py-2.5 bg-primary text-white font-medium rounded cursor-pointer">ADD</button>
            </form>
        </div>
  )
}

export default AddProduct
