import { useParams } from "react-router";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form"
import { useBorrowABookMutation } from "@/redux/api/baseApi";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const BorrowBook = () => {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const form = useForm();

    const [borrowABook] = useBorrowABookMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const finalData = {
            ...data,
            book: bookId,
            quantity: parseInt(data.quantity),
            dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : '',
        };

        try {
            const response = await borrowABook(finalData).unwrap();
            console.log('From Borrow Response: ', response);
            form.reset();
            Swal.fire({
                icon: "success",
                title: response.message,
                showConfirmButton: false,
                timer: 2000
            });
            navigate('/borrow-summary');
        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error?.data?.message,
            });
            navigate('/books')
        }
    }

    return (
        <div className="mx-auto max-w-7xl bg-[#7A9E7E] py-8">
            {/* -------- FORM HEADING -------- */}
            <div className='mb-8 text-center mx-auto w-[85%]'>
                <h4 className="mt-2 font-bold text-[32px] text-[#ffffff]">Start Your Reading Journey</h4>
                <p className="font-normal text-lg text-[rgba(255,255,255,0.6)]">Please Fill the Required Information To Confirm Request.</p>
            </div>

            {/* -------- FORM PART -------- */}
            <div className="w-[85%] sm:w-[64%] lg:w-[55%] mx-auto border-2 border-white p-8 rounded-4xl mt-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                            {/* ------ BOOK QUANTITY ------ */}
                            <FormField
                                control={form.control}
                                name="quantity"
                                rules={{
                                    required: "Quantity is required",
                                    validate: (value) => {
                                        const num = Number(value);
                                        if (!Number.isInteger(num)) {
                                            return "Quantity should be Integer Value";
                                        } if (num <= 0) {
                                            return "Quantity should be greater than 0";
                                        }
                                        return true;
                                    },
                                }}
                                render={({ field, fieldState }) => (
                                    <FormItem className="pb-5">
                                        <FormLabel className="font-medium text-lg text-white">Quantity</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="w-full bg-[rgba(255,255,255,0.5)] px-5 py-6 rounded-xl font-normal text-base"
                                                placeholder="Enter the book quantity"
                                                type="number" {...field} value={field.value || ""}></Input>
                                        </FormControl>
                                        <FormMessage>{fieldState.error?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />

                            {/* ------ DUE DATE ------ */}
                            <FormField
                                control={form.control}
                                name="dueDate"
                                rules={{
                                    required: "Due Date is required",
                                }}
                                render={({ field, fieldState }) => (
                                    <FormItem className="pb-5">
                                        <FormLabel className="font-medium text-lg text-white">Pick Due Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild className="w-full bg-[rgba(255,255,255,0.5)] px-5 py-6 rounded-xl font-normal text-base">
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                                        {field.value ? (format(field.value, "PPP")) : (
                                                            <span>Pick a date</span>)}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) => {
                                                        return date <= new Date();
                                                    }}
                                                    captionLayout="dropdown" />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage>{fieldState.error?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter className="mx-auto">
                            <Button
                                className="w-full mb-3 cursor-pointer px-16 py-3.5 bg-white rounded-xl text-lg text-[#7A9E7E] font-semibold"
                                type="submit">Done</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default BorrowBook;