import React, { Suspense } from "react";
import EncuestaWeb from "@/components/forms/EncuestaWeb";

interface PageProps {
    params: Promise<{ pag: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SurveyPage(props: PageProps) {
    const params = await props.params;
    const searchParams = await props.searchParams;

    const surveyId = params.pag;
    const nameParam = searchParams.name;
    const idParam = searchParams.id;
    const emailParam = searchParams.email;

    const userName = Array.isArray(nameParam) ? nameParam[0] : (nameParam || "Cliente");
    const userId = Array.isArray(idParam) ? idParam[0] : idParam;
    const userEmail = Array.isArray(emailParam) ? emailParam[0] : emailParam;

    const renderContent = () => {
        switch (surveyId) {
            case "01":
                return (
                    <EncuestaWeb
                        surveyId={surveyId}
                        userName={userName}
                        userId={userId}
                        userEmail={userEmail}
                    />
                );
            default:
                return (
                    <div className="h-screen flex flex-col items-center justify-center text-center px-4 z-10 relative">
                        <h1 className="text-3xl font-bold text-white mb-2">Encuesta no encontrada</h1>
                        <p className="text-gray-400">El código "{surveyId}" no corresponde a una encuesta activa.</p>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] relative selection:bg-cyan-500/30 overflow-hidden">
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full" />
            </div>

            <Suspense fallback={
                <div className="h-screen flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
                </div>
            }>
                {renderContent()}
            </Suspense>
        </div>
    );
}