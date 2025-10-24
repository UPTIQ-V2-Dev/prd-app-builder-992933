import { Upload, Building, FileText, Link } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export const UploadPage = () => {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [showBankModal, setShowBankModal] = useState(false);
    const navigate = useNavigate();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Filter for PDF and CSV files only
        const validFiles = acceptedFiles.filter(file => file.type === 'application/pdf' || file.type === 'text/csv');

        setUploadedFiles(prev => [...prev, ...validFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'text/csv': ['.csv']
        },
        maxSize: 10 * 1024 * 1024, // 10MB
        multiple: true
    });

    const handleUpload = async () => {
        if (uploadedFiles.length === 0) return;

        setIsUploading(true);

        // Simulate upload process
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsUploading(false);

        // Navigate to parsing page
        navigate('/parsing');
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

    return (
        <div className='max-w-4xl mx-auto px-6 py-8'>
            <div className='mb-8'>
                <h1 className='text-3xl font-bold text-gray-900 mb-2'>Treasury Analysis Setup</h1>
                <p className='text-lg text-gray-600'>
                    Upload your bank statements or connect directly to analyze treasury opportunities
                </p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
                {/* File Upload Section */}
                <Card className='h-fit'>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                            <Upload className='h-5 w-5' />
                            Upload Bank Statements
                        </CardTitle>
                        <CardDescription>Upload PDF or CSV files containing your transaction history</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div
                            {...getRootProps()}
                            className={cn(
                                'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
                                {
                                    'border-blue-300 bg-blue-50': isDragActive && !isDragReject,
                                    'border-red-300 bg-red-50': isDragReject,
                                    'border-gray-300 hover:border-gray-400': !isDragActive
                                }
                            )}
                        >
                            <input {...getInputProps()} />
                            <Upload className='h-12 w-12 mx-auto mb-4 text-gray-400' />
                            {isDragActive ? (
                                <p className='text-blue-600 font-medium'>Drop your files here...</p>
                            ) : (
                                <div>
                                    <p className='text-gray-600 mb-2'>
                                        Drag & drop files here, or{' '}
                                        <span className='text-blue-600 font-medium'>browse</span>
                                    </p>
                                    <p className='text-sm text-gray-400'>Supports PDF and CSV files up to 10MB</p>
                                </div>
                            )}
                        </div>

                        {uploadedFiles.length > 0 && (
                            <div className='mt-6 space-y-2'>
                                <h4 className='font-medium text-gray-900'>Uploaded Files:</h4>
                                {uploadedFiles.map((file, index) => (
                                    <div
                                        key={index}
                                        className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                                    >
                                        <div className='flex items-center gap-3'>
                                            <FileText className='h-5 w-5 text-gray-400' />
                                            <div>
                                                <p className='font-medium text-gray-900'>{file.name}</p>
                                                <p className='text-sm text-gray-500'>{formatFileSize(file.size)}</p>
                                            </div>
                                        </div>
                                        <Button
                                            variant='ghost'
                                            size='sm'
                                            onClick={() => removeFile(index)}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Bank Connection Section */}
                <Card className='h-fit'>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                            <Building className='h-5 w-5' />
                            Connect Bank Account
                        </CardTitle>
                        <CardDescription>Connect directly to your bank for real-time data analysis</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='text-center py-8'>
                            <Link className='h-12 w-12 mx-auto mb-4 text-gray-400' />
                            <p className='text-gray-600 mb-4'>
                                Securely connect to your business bank account for automatic data import
                            </p>
                            <Button
                                variant='outline'
                                onClick={() => setShowBankModal(true)}
                                className='w-full'
                            >
                                Connect Bank Account
                            </Button>
                        </div>

                        <div className='mt-6 p-4 bg-blue-50 rounded-lg'>
                            <h4 className='font-medium text-blue-900 mb-2'>Benefits of Direct Connection:</h4>
                            <ul className='text-sm text-blue-800 space-y-1'>
                                <li>• Real-time transaction data</li>
                                <li>• Automatic categorization</li>
                                <li>• Enhanced security</li>
                                <li>• Continuous monitoring</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Action Buttons */}
            <div className='flex justify-end gap-4'>
                <Button
                    variant='outline'
                    onClick={() => navigate('/dashboard')}
                >
                    Skip to Demo Data
                </Button>
                <Button
                    onClick={handleUpload}
                    disabled={uploadedFiles.length === 0 || isUploading}
                    className='min-w-32'
                >
                    {isUploading
                        ? 'Processing...'
                        : `Analyze ${uploadedFiles.length} File${uploadedFiles.length !== 1 ? 's' : ''}`}
                </Button>
            </div>

            {/* Bank Connection Modal placeholder */}
            {showBankModal && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <Card className='w-96 max-w-md mx-4'>
                        <CardHeader>
                            <CardTitle>Connect Bank Account</CardTitle>
                            <CardDescription>Choose your banking institution</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-3'>
                                <Button
                                    variant='outline'
                                    className='w-full justify-start'
                                    onClick={() => {
                                        setShowBankModal(false);
                                        // Simulate connection and navigate
                                        setTimeout(() => navigate('/parsing'), 1000);
                                    }}
                                >
                                    <Building className='h-4 w-4 mr-2' />
                                    Chase Business Banking
                                </Button>
                                <Button
                                    variant='outline'
                                    className='w-full justify-start'
                                    onClick={() => {
                                        setShowBankModal(false);
                                        setTimeout(() => navigate('/parsing'), 1000);
                                    }}
                                >
                                    <Building className='h-4 w-4 mr-2' />
                                    Wells Fargo Corporate
                                </Button>
                                <Button
                                    variant='outline'
                                    className='w-full justify-start'
                                    onClick={() => {
                                        setShowBankModal(false);
                                        setTimeout(() => navigate('/parsing'), 1000);
                                    }}
                                >
                                    <Building className='h-4 w-4 mr-2' />
                                    Bank of America Business
                                </Button>
                            </div>
                            <div className='flex justify-end gap-2 mt-6'>
                                <Button
                                    variant='outline'
                                    onClick={() => setShowBankModal(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};
