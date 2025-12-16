import { DiscoverHowSection, FormSection } from "./components"
import { FormProvider } from "./components/form/FormContext"

export default function page() {
    return (
        <div>
            <DiscoverHowSection />
            <FormSection />
        </div>
    )
}
