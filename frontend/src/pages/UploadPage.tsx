import { Upload, Building, Link, X, CheckCircle, AlertTriangle, Sparkles, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { treasuryService } from '@/services/treasury';

export const UploadPage = () => {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [showBankModal, setShowBankModal] = useState(false);
    const navigate = useNavigate();

    const uploadMutation = useMutation({
        mutationFn: async (files: File[]) => {
            if (files.length === 0) throw new Error('No files selected');

            // For now, upload the first file. In real implementation, handle multiple files
            const response = await treasuryService.uploadFile({
                file: files[0],
                clientId: 'demo-client'
            });

            return response;
        },
        onSuccess: () => {
            navigate('/parsing');
        },
        onError: error => {
            console.error('Upload failed:', error);
        }
    });

    const bankConnectMutation = useMutation({
        mutationFn: async (bankId: string) => {
            const response = await treasuryService.connectBank({
                bankId,
                bankName: `Bank ${bankId}`,
                institutionId: bankId,
                clientId: 'demo-client'
            });
            return response;
        },
        onSuccess: () => {
            setShowBankModal(false);
            navigate('/parsing');
        }
    });

    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
        // Filter for PDF and CSV files only
        const validFiles = acceptedFiles.filter(
            file =>
                file.type === 'application/pdf' ||
                file.type === 'text/csv' ||
                file.name.toLowerCase().endsWith('.pdf') ||
                file.name.toLowerCase().endsWith('.csv')
        );

        setUploadedFiles(prev => [...prev, ...validFiles]);

        // Show alerts for rejected files
        if (rejectedFiles.length > 0) {
            console.warn('Rejected files:', rejectedFiles);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'text/csv': ['.csv'],
            'application/vnd.ms-excel': ['.xls'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
        },
        maxSize: 25 * 1024 * 1024, // 25MB
        multiple: true
    });

    const handleUpload = () => {
        if (uploadedFiles.length === 0) return;
        uploadMutation.mutate(uploadedFiles);
    };

    const removeFile = (index: number) => {
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getFileIcon = (file: File) => {
        if (file.type === 'application/pdf') return '📄';
        if (file.type === 'text/csv' || file.name.toLowerCase().endsWith('.csv')) return '📊';
        if (file.name.toLowerCase().endsWith('.xls') || file.name.toLowerCase().endsWith('.xlsx')) return '📈';
        return '📄';
    };

    const isUploading = uploadMutation.isPending;

    return (
        <div className='max-w-7xl mx-auto px-6 py-8'>
            {/* Hero Section */}
            <div className='text-center mb-12'>
                <div className='inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-full mb-4'>
                    <Sparkles className='h-5 w-5 text-blue-600' />
                    <span className='text-sm font-medium text-blue-700'>AI-Powered Treasury Analysis</span>
                </div>
                <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
                    Unlock Your Treasury
                    <span className='block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                        Potential
                    </span>
                </h1>
                <p className='text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'>
                    Upload your bank statements or connect directly to discover hidden opportunities and optimize your
                    cash management with AI-driven insights.
                </p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12'>
                {/* File Upload Section */}
                <Card className='relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30'>
                    <div className='absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5'></div>
                    <CardHeader className='relative'>
                        <CardTitle className='flex items-center gap-3 text-xl'>
                            <div className='p-2 bg-blue-100 rounded-lg'>
                                <Upload className='h-5 w-5 text-blue-600' />
                            </div>
                            Upload Bank Statements
                        </CardTitle>
                        <CardDescription className='text-base'>
                            Securely upload PDF, CSV, or Excel files containing your transaction history
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='relative'>
                        <div
                            {...getRootProps()}
                            className={cn(
                                'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 hover:scale-[1.02]',
                                {
                                    'border-blue-400 bg-blue-50/50 scale-[1.02] shadow-lg':
                                        isDragActive && !isDragReject,
                                    'border-red-400 bg-red-50/50': isDragReject,
                                    'border-gray-300 hover:border-blue-400 hover:bg-blue-50/30': !isDragActive
                                }
                            )}
                        >
                            <input {...getInputProps()} />
                            <div
                                className={cn(
                                    'inline-flex p-4 rounded-full mb-4 transition-colors',
                                    isDragActive && !isDragReject ? 'bg-blue-100' : 'bg-gray-100'
                                )}
                            >
                                <Upload
                                    className={cn(
                                        'h-8 w-8 transition-colors',
                                        isDragActive && !isDragReject ? 'text-blue-600' : 'text-gray-400'
                                    )}
                                />
                            </div>
                            {isDragActive && !isDragReject ? (
                                <div>
                                    <p className='text-blue-600 font-semibold text-lg mb-2'>Drop your files here!</p>
                                    <p className='text-blue-500 text-sm'>We'll analyze them instantly</p>
                                </div>
                            ) : isDragReject ? (
                                <div>
                                    <p className='text-red-600 font-semibold mb-2'>Invalid file type</p>
                                    <p className='text-red-500 text-sm'>Please use PDF, CSV, or Excel files only</p>
                                </div>
                            ) : (
                                <div>
                                    <p className='text-gray-700 font-medium mb-2 text-lg'>
                                        Drag & drop files here, or{' '}
                                        <span className='text-blue-600 font-semibold hover:underline'>browse</span>
                                    </p>
                                    <div className='flex flex-wrap justify-center gap-2 mb-3'>
                                        <Badge
                                            variant='secondary'
                                            className='bg-blue-50 text-blue-700'
                                        >
                                            PDF
                                        </Badge>
                                        <Badge
                                            variant='secondary'
                                            className='bg-green-50 text-green-700'
                                        >
                                            CSV
                                        </Badge>
                                        <Badge
                                            variant='secondary'
                                            className='bg-orange-50 text-orange-700'
                                        >
                                            Excel
                                        </Badge>
                                    </div>
                                    <p className='text-sm text-gray-500'>
                                        Maximum file size: 25MB • Multiple files supported
                                    </p>
                                </div>
                            )}
                        </div>

                        {uploadedFiles.length > 0 && (
                            <div className='mt-6 space-y-3'>
                                <div className='flex items-center justify-between'>
                                    <h4 className='font-semibold text-gray-900'>Ready for Analysis:</h4>
                                    <Badge
                                        variant='outline'
                                        className='bg-green-50 text-green-700 border-green-200'
                                    >
                                        {uploadedFiles.length} file{uploadedFiles.length !== 1 ? 's' : ''}
                                    </Badge>
                                </div>
                                {uploadedFiles.map((file, index) => (
                                    <div
                                        key={index}
                                        className='flex items-center justify-between p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:shadow-md transition-shadow'
                                    >
                                        <div className='flex items-center gap-4'>
                                            <div className='text-2xl'>{getFileIcon(file)}</div>
                                            <div className='flex-1 min-w-0'>
                                                <p className='font-medium text-gray-900 truncate'>{file.name}</p>
                                                <div className='flex items-center gap-3 mt-1'>
                                                    <p className='text-sm text-gray-500'>{formatFileSize(file.size)}</p>
                                                    <Badge
                                                        variant='outline'
                                                        className='bg-green-50 text-green-600 border-green-200 text-xs'
                                                    >
                                                        <CheckCircle className='h-3 w-3 mr-1' />
                                                        Valid
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            variant='ghost'
                                            size='sm'
                                            onClick={() => removeFile(index)}
                                            className='hover:bg-red-50 hover:text-red-600'
                                        >
                                            <X className='h-4 w-4' />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Bank Connection Section */}
                <Card className='relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white via-green-50/30 to-emerald-50/30'>
                    <div className='absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5'></div>
                    <CardHeader className='relative'>
                        <CardTitle className='flex items-center gap-3 text-xl'>
                            <div className='p-2 bg-green-100 rounded-lg'>
                                <Building className='h-5 w-5 text-green-600' />
                            </div>
                            Connect Bank Account
                        </CardTitle>
                        <CardDescription className='text-base'>
                            Instantly connect to your business bank for real-time analysis and automated insights
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='relative'>
                        <div className='text-center py-8'>
                            <div className='inline-flex p-4 rounded-full bg-green-100 mb-6'>
                                <Link className='h-8 w-8 text-green-600' />
                            </div>
                            <h3 className='text-lg font-semibold text-gray-900 mb-3'>Bank-Grade Security</h3>
                            <p className='text-gray-600 mb-6 leading-relaxed'>
                                Connect securely using industry-standard encryption. We never store your banking
                                credentials.
                            </p>
                            <Button
                                onClick={() => setShowBankModal(true)}
                                className='w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200'
                                size='lg'
                            >
                                <Building className='h-4 w-4 mr-2' />
                                Connect Bank Account
                            </Button>
                        </div>

                        <div className='mt-6 p-5 bg-white/70 backdrop-blur-sm rounded-xl border border-green-200/50'>
                            <h4 className='font-semibold text-green-900 mb-3 flex items-center gap-2'>
                                <CheckCircle className='h-4 w-4' />
                                Instant Benefits:
                            </h4>
                            <div className='grid grid-cols-2 gap-3'>
                                <div className='flex items-center gap-2 text-sm text-green-800'>
                                    <div className='w-1.5 h-1.5 rounded-full bg-green-500'></div>
                                    Real-time data sync
                                </div>
                                <div className='flex items-center gap-2 text-sm text-green-800'>
                                    <div className='w-1.5 h-1.5 rounded-full bg-green-500'></div>
                                    Auto-categorization
                                </div>
                                <div className='flex items-center gap-2 text-sm text-green-800'>
                                    <div className='w-1.5 h-1.5 rounded-full bg-green-500'></div>
                                    Enhanced security
                                </div>
                                <div className='flex items-center gap-2 text-sm text-green-800'>
                                    <div className='w-1.5 h-1.5 rounded-full bg-green-500'></div>
                                    Continuous monitoring
                                </div>
                            </div>
                        </div>

                        <div className='mt-4 flex items-center justify-center gap-2 text-xs text-gray-500'>
                            <div className='w-2 h-2 rounded-full bg-gray-300'></div>
                            <span>256-bit SSL encryption</span>
                            <div className='w-2 h-2 rounded-full bg-gray-300'></div>
                            <span>SOC 2 Type II compliant</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Features Preview */}
            <div className='mb-12'>
                <div className='text-center mb-8'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-2'>What You'll Discover</h2>
                    <p className='text-gray-600'>Our AI analyzes your financial data to uncover opportunities</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100'>
                        <div className='inline-flex p-3 rounded-full bg-blue-100 mb-4'>
                            <TrendingUp className='h-6 w-6 text-blue-600' />
                        </div>
                        <h3 className='font-semibold text-gray-900 mb-2'>Cash Flow Optimization</h3>
                        <p className='text-gray-600 text-sm'>Identify idle cash and optimize your liquidity position</p>
                    </div>
                    <div className='text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100'>
                        <div className='inline-flex p-3 rounded-full bg-green-100 mb-4'>
                            <AlertTriangle className='h-6 w-6 text-green-600' />
                        </div>
                        <h3 className='font-semibold text-gray-900 mb-2'>Risk Assessment</h3>
                        <p className='text-gray-600 text-sm'>
                            Evaluate liquidity risks and strengthen your financial position
                        </p>
                    </div>
                    <div className='text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100'>
                        <div className='inline-flex p-3 rounded-full bg-purple-100 mb-4'>
                            <Sparkles className='h-6 w-6 text-purple-600' />
                        </div>
                        <h3 className='font-semibold text-gray-900 mb-2'>Product Recommendations</h3>
                        <p className='text-gray-600 text-sm'>Get personalized treasury product suggestions</p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row justify-between items-center gap-4 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border'>
                <div className='text-left'>
                    <p className='font-medium text-gray-900'>Ready to get started?</p>
                    <p className='text-sm text-gray-600'>Analyze your data or explore with demo data</p>
                </div>
                <div className='flex gap-3'>
                    <Button
                        variant='outline'
                        onClick={() => navigate('/dashboard')}
                        className='hover:bg-gray-50'
                    >
                        <Sparkles className='h-4 w-4 mr-2' />
                        Try Demo Data
                    </Button>
                    <Button
                        onClick={handleUpload}
                        disabled={uploadedFiles.length === 0 || isUploading}
                        className='min-w-40 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200'
                    >
                        {isUploading ? (
                            <div className='flex items-center gap-2'>
                                <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                                Processing...
                            </div>
                        ) : uploadedFiles.length > 0 ? (
                            <div className='flex items-center gap-2'>
                                <Upload className='h-4 w-4' />
                                Analyze {uploadedFiles.length} File{uploadedFiles.length !== 1 ? 's' : ''}
                            </div>
                        ) : (
                            'Start Analysis'
                        )}
                    </Button>
                </div>
            </div>

            {/* Bank Connection Modal */}
            {showBankModal && (
                <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
                    <Card className='w-full max-w-lg mx-4 border-0 shadow-2xl'>
                        <CardHeader className='text-center pb-2'>
                            <div className='inline-flex p-3 rounded-full bg-green-100 mb-3 mx-auto'>
                                <Building className='h-6 w-6 text-green-600' />
                            </div>
                            <CardTitle className='text-2xl'>Connect Bank Account</CardTitle>
                            <CardDescription className='text-base'>
                                Choose your banking institution for secure, real-time connectivity
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='pt-4'>
                            <div className='space-y-3 mb-6'>
                                {[
                                    {
                                        name: 'Chase Business Banking',
                                        color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                                    },
                                    {
                                        name: 'Wells Fargo Corporate',
                                        color: 'bg-red-50 border-red-200 hover:bg-red-100'
                                    },
                                    {
                                        name: 'Bank of America Business',
                                        color: 'bg-green-50 border-green-200 hover:bg-green-100'
                                    },
                                    {
                                        name: 'Citibank Commercial',
                                        color: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100'
                                    }
                                ].map((bank, index) => (
                                    <Button
                                        key={index}
                                        variant='outline'
                                        className={`w-full justify-start p-4 h-auto ${bank.color} transition-all duration-200 hover:shadow-md`}
                                        onClick={() => bankConnectMutation.mutate(`bank-${index + 1}`)}
                                        disabled={bankConnectMutation.isPending}
                                    >
                                        <div className='flex items-center gap-3'>
                                            <div className='p-2 bg-white rounded-lg shadow-sm'>
                                                <Building className='h-4 w-4 text-gray-600' />
                                            </div>
                                            <div className='text-left'>
                                                <div className='font-medium text-gray-900'>{bank.name}</div>
                                                <div className='text-xs text-gray-500'>
                                                    Instant connection available
                                                </div>
                                            </div>
                                        </div>
                                        {bankConnectMutation.isPending && (
                                            <div className='w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin ml-auto'></div>
                                        )}
                                    </Button>
                                ))}
                            </div>

                            <div className='bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6'>
                                <div className='flex items-start gap-3'>
                                    <CheckCircle className='h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0' />
                                    <div>
                                        <h4 className='font-medium text-blue-900 mb-1'>Secure & Private</h4>
                                        <p className='text-sm text-blue-700'>
                                            We use bank-level 256-bit encryption. Your credentials are never stored on
                                            our servers.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className='flex gap-3'>
                                <Button
                                    variant='outline'
                                    onClick={() => setShowBankModal(false)}
                                    className='flex-1'
                                    disabled={bankConnectMutation.isPending}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant='ghost'
                                    className='flex-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                                >
                                    Other Bank
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};
