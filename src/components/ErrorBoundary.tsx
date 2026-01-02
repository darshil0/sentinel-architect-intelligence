import React, { ReactNode, Component, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-4">
            <div className="bg-slate-900 border border-rose-500/30 rounded-[32px] p-10 max-w-lg shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-black text-white uppercase tracking-tight">System Failure</h1>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Architect Integrity Compromised</p>
                </div>
              </div>
              
              <p className="text-slate-300 mb-6 leading-relaxed">
                An unexpected error occurred. The system has been secured and is ready for recovery.
              </p>

              <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-4 mb-6 font-mono text-[11px] text-slate-400 max-h-32 overflow-auto">
                <p className="text-rose-400 font-bold mb-2">Error Details:</p>
                <p className="text-slate-500">{this.state.error?.message || 'Unknown error'}</p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={this.handleReset}
                  className="flex-1 py-3 bg-emerald-500 text-slate-950 rounded-xl font-black uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                >
                  Recover System
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="flex-1 py-3 bg-slate-800 text-slate-300 rounded-xl font-black uppercase tracking-widest hover:bg-slate-700 transition-all active:scale-95"
                >
                  Home
                </button>
              </div>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
