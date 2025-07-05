import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { useEditABookMutation, useGetABookQuery } from "@/redux/api/baseApi";
import { useEffect } from "react";

const UpdateBook = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const genres = ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'];
    const { data: previousBookInfo } = useGetABookQuery(id!);
    const [editABook] = useEditABookMutation();

    // ------ INITIALIZE FORM DEFAULT VALUES
    const form = useForm({
        defaultValues: {
            title: '',
            author: '',
            isbn: '',
            copies: 0,
            available: '',
            genre: ''
        },
    });

    // ------ RENDER FORM DEFAULT VALUES
    useEffect(() => {
        if (previousBookInfo?.data) {
            form.reset({
                title: previousBookInfo.data.title,
                author: previousBookInfo.data.author,
                isbn: previousBookInfo.data.isbn,
                copies: previousBookInfo.data.copies,
                available: previousBookInfo.data.available ? "yes" : "no",
                genre: previousBookInfo.data.genre
            });
        }
    }, [previousBookInfo, form]);


    // ------ FORM SUBMIT FUNCTION
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const finalData = {
            ...data,
            available: data.available === "yes" ? true : false,
            copies: parseInt(data.copies),
        };

        try {
            const response = await editABook({ bookId: id, bookData: finalData }).unwrap();
            console.log('response from edit a book: ', response);
            Swal.fire({
                icon: "success",
                title: response.message,
                showConfirmButton: false,
                timer: 2000
            });
            navigate('/books');
            form.reset();
        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: (`${error?.data?.message}, ${error?.data?.error?.errors}`)
            });
            navigate('/')
        }
    }


    return (
        <div className='mx-auto max-w-7xl bg-[#7A9E7E] py-8'>
            {/* -------- FORM HEADING -------- */}
            <div className='mb-8 text-center mx-auto w-[85%]'>
                <h4 className="text-[30px] sm:text-[32px] mt-2 font-bold text-[#ffffff]">Update Your Existing Book Info</h4>
                <p className="font-normal text-lg text-[rgba(255,255,255,0.6)]">Please Fill the Required Information To Procceed.</p>
            </div>

            {/* -------- FORM PART -------- */}
            <div className="w-[85%] sm:w-[64%] lg:w-[55%] mx-auto border-2 border-white p-8 rounded-4xl mt-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        {/* ------ BOOK TITLE ------ */}
                        <FormField
                            control={form.control}
                            name="title"
                            rules={{
                                required: "Book title is required",
                            }}
                            render={({ field, fieldState }) => (
                                <FormItem className="pb-3">
                                    <FormLabel className="font-medium text-lg text-white">Book Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="w-full bg-[rgba(255,255,255,0.5)] px-5 py-6 rounded-xl font-normal text-base"
                                            {...field} value={field.value}></Input>
                                    </FormControl>
                                    <FormMessage>{fieldState.error?.message}</FormMessage>
                                </FormItem>
                            )}
                        />

                        {/* ------ BOOK AUTHOR ------ */}
                        <FormField
                            control={form.control}
                            name="author"
                            rules={{
                                required: "Book author is required"
                            }}
                            render={({ field, fieldState }) => (
                                <FormItem className="pb-3">
                                    <FormLabel className="font-medium text-lg text-white">Book Author</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="w-full bg-[rgba(255,255,255,0.5)] px-5 py-6 rounded-xl font-normal text-base"
                                            {...field} value={field.value}></Input>
                                    </FormControl>
                                    <FormMessage>{fieldState.error?.message}</FormMessage>
                                </FormItem>
                            )}
                        />

                        {/* ------ BOOK ISBN ------ */}
                        <FormField
                            control={form.control}
                            name="isbn"
                            rules={{
                                required: "ISBN is required",
                                validate: (value) => {
                                    const num = Number(value);
                                    if (num < 0) {
                                        return "ISBN should be positive value";
                                    }
                                    return true;
                                },
                            }}
                            render={({ field, fieldState }) => (
                                <FormItem className="pb-3">
                                    <FormLabel className="font-medium text-lg text-white">ISBN Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="w-full bg-[rgba(255,255,255,0.5)] px-5 py-6 rounded-xl font-normal text-base"
                                            {...field} value={field.value}></Input>
                                    </FormControl>
                                    <FormMessage>{fieldState.error?.message}</FormMessage>
                                </FormItem>
                            )}
                        />

                        {/* ------ BOOK COPIES ------ */}
                        <FormField
                            control={form.control}
                            name="copies"
                            rules={{
                                validate: (value) => {
                                    const num = Number(value);
                                    if (!Number.isInteger(num)) {
                                        return "Copies should be integer value";
                                    } if (num < 0) {
                                        return "Copies should be positive value";
                                    }
                                    return true;
                                },
                            }}
                            render={({ field, fieldState }) => (
                                <FormItem className="pb-3">
                                    <FormLabel className="font-medium text-lg text-white">Book Copies</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="w-full bg-[rgba(255,255,255,0.5)] px-5 py-6 rounded-xl font-normal text-base"
                                            type="number" {...field} value={field.value} defaultValue={previousBookInfo?.data.copies}></Input>
                                    </FormControl>
                                    <FormMessage>{fieldState.error?.message}</FormMessage>
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                            {/* ------ BOOK AVAILABILITY ------ */}
                            <FormField
                                control={form.control}
                                name="available"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-medium text-lg text-white">Book Availability</FormLabel>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger className="w-full bg-[rgba(255,255,255,0.5)] px-5 py-6 rounded-xl font-normal text-base">
                                                    <SelectValue placeholder="Yes or No" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="bg-[#7A9E7E]">
                                                <SelectItem value="yes">Yes</SelectItem>
                                                <SelectItem value="no">No</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            {/* ------ BOOK GENRE ------ */}
                            <FormField
                                control={form.control}
                                name="genre"
                                rules={{
                                    required: "Genre is required"
                                }}
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel className="font-medium text-lg text-white">Book Genre</FormLabel>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger className="w-full bg-[rgba(255,255,255,0.5)] px-5 py-6 rounded-xl font-normal text-base">
                                                    <SelectValue placeholder="Select Genre" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="bg-[#7A9E7E]">
                                                {
                                                    genres.map((genre, idx) => (<SelectItem key={idx} value={genre}>{genre}</SelectItem>))
                                                }
                                            </SelectContent>
                                        </Select>
                                        <FormMessage>{fieldState.error?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter className="mx-auto mt-6">
                            <Button
                                className="w-full mb-3 cursor-pointer px-16 py-3.5 bg-white rounded-xl text-lg text-[#7A9E7E] font-semibold"
                                type="submit">Save Changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default UpdateBook;