import { SamplePaper } from './types';

export const SAMPLE_PAPERS: SamplePaper[] = [
  {
    id: 'transformers',
    title: 'Attention Is All You Need',
    authorsYear: 'Vaswani et al. (2017)',
    domain: 'Computer Science · Natural Language Processing',
    abstract: `The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.`,
    fullExcerpt: `The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. Experiments on two machine translation tasks show these models to be superior in quality while being more parallelizable and requiring significantly less time to train.

Our model achieves 28.4 BLEU on the WMT 2014 English-to-German translation task, improving over the existing best results, including ensembles, by over 2 BLEU. On the WMT 2014 English-to-French translation task, our model establishes a new single-model state-of-the-art BLEU score of 41.8 after training for 3.5 days on eight GPUs, a small fraction of the training costs of the best models from the literature. We show that the Transformer generalizes well to other tasks by applying it successfully to English constituency parsing both with large and limited training data.

Recurrent models typically factor computation along the symbol positions of the input and output sequences. Aligning the positions to steps in computation time, they generate a sequence of hidden states h_t, as a function of the previous hidden state h_{t-1} and the input for position t. This inherently sequential nature precludes parallelization within training examples, which becomes critical at longer sequence lengths, as memory constraints limit batching across examples.

In this work we propose the Transformer, a model architecture eschewing recurrence and instead relying entirely on an attention mechanism to draw global dependencies between input and output. The Transformer allows for significantly more parallelization and can reach a new state of the art in translation quality after being trained for as little as twelve hours on eight P100 GPUs.`
  },
  {
    id: 'crispr',
    title: 'A Programmable Dual-RNA-Guided DNA Endonuclease in Adaptive Bacterial Immunity',
    authorsYear: 'Jinek, Chylinski, Fonfara, Hauer, Doudna, Charpentier (2012)',
    domain: 'Molecular Biology · Genome Engineering',
    abstract: `Clustered regularly interspaced short palindromic repeats (CRISPR)/CRISPR-associated (Cas) systems provide bacteria and archaea with adaptive immunity against viruses and plasmids by using RNA-guided nucleases to cleave foreign nucleic acids. We show here that Cas9 endonuclease can be programmed by single-guide RNAs to introduce double-stranded breaks into specific DNA target sites.`,
    fullExcerpt: `Clustered regularly interspaced short palindromic repeats (CRISPR)/CRISPR-associated (Cas) systems provide bacteria and archaea with adaptive immunity against viruses and plasmids by using RNA-guided nucleases to cleave foreign nucleic acids. We show here that Cas9 endonuclease can be programmed by single-guide RNAs to introduce double-stranded breaks into specific DNA target sites.

We demonstrate that the Cas9 endonuclease cleaves double-stranded DNA targets matching the sequence of crRNA guides, requiring a short proto-spacer adjacent motif (PAM) located immediately 3' of the target sequence. Cleavage generates blunt-ended breaks 3 base pairs upstream of the PAM. Crucially, the dual-RNA structure consisting of crRNA and trans-activating crRNA (tracrRNA) can be engineered as a chimeric single guide RNA (sgRNA) that directs Cas9 site-specific DNA cleavage in vitro.

Our results demonstrate that the dual-RNA:Cas9 system functions as an RNA-guided endonuclease that uses dual RNA for target cleavage and can be programmed with customized single-guide RNAs to target virtually any genomic locus of interest containing an adjacent 5'-NGG PAM. This offers substantial efficiency and simplicity advantages over protein-guided nuclease platforms such as Zinc Finger Nucleases (ZFNs) and TALENs, which require laborious de novo protein re-engineering for each novel target sequence.`
  },
  {
    id: 'resnet',
    title: 'Deep Residual Learning for Image Recognition',
    authorsYear: 'He, Zhang, Ren, Sun (2015)',
    domain: 'Computer Vision · Deep Neural Architectures',
    abstract: `Deeper neural networks are more difficult to train. We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously. We explicitly reformulate the layers as learning residual functions with reference to the layer inputs, instead of learning unreferenced functions.`,
    fullExcerpt: `Deeper neural networks are more difficult to train. We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously. We explicitly reformulate the layers as learning residual functions with reference to the layer inputs, instead of learning unreferenced functions. We provide comprehensive empirical evidence showing that these residual networks are easier to optimize, and can gain accuracy from considerably increased depth.

On the ImageNet dataset, we evaluate residual nets with a depth of up to 152 layers—8x deeper than VGG nets but still having lower complexity. An ensemble of these residual nets achieves 3.57% top-5 error on the ImageNet test set. This result won the 1st place on the ILSVRC 2015 classification task. We also present analysis on CIFAR-10 with 100 and 1000 layers.

The degradation of training accuracy shows that not all systems are similarly easy to optimize. Consider a shallower architecture and its deeper counterpart that adds more layers. There exists a solution by construction to the deeper model: the added layers are identity mapping, and other layers are copied from the learned shallower model. The existence of this constructed solution indicates that a deeper model should produce no higher training error than its shallower counterpart. But experiments show that our current solvers are unable to find solutions that are comparably good or better than the constructed solution.

Formally, denoting the desired underlying mapping as H(x), we let the stacked nonlinear layers fit another mapping of F(x) := H(x) - x. The original mapping is recast into F(x) + x. We hypothesize that it is easier to optimize the residual mapping than to optimize the original, unreferenced mapping. To the extreme, if an identity mapping were optimal, it would be easier to push the residual to zero than to fit an identity mapping by a stack of nonlinear layers.`
  },
  {
    id: 'ligo',
    title: 'Observation of Gravitational Waves from a Binary Black Hole Merger',
    authorsYear: 'Abbott et al., LIGO Scientific Collaboration and Virgo Collaboration (2016)',
    domain: 'Astrophysics · Relativistic Gravitation',
    abstract: `On September 14, 2015 at 09:50:45 UTC the two detectors of the Laser Interferometer Gravitational-Wave Observatory simultaneously observed a transient gravitational-wave signal. The signal matches the waveform predicted by general relativity for the inspiral and merger of a pair of black holes and the ringdown of the resulting single black hole.`,
    fullExcerpt: `On September 14, 2015 at 09:50:45 UTC the two detectors of the Laser Interferometer Gravitational-Wave Observatory simultaneously observed a transient gravitational-wave signal. The signal matches the waveform predicted by general relativity for the inspiral and merger of a pair of black holes and the ringdown of the resulting single black hole. The signal was observed with a matched-filter signal-to-noise ratio of 24 and a false alarm rate estimated to be less than 1 event per 203,000 years, equivalent to a significance greater than 5.1 sigma.

The source lies at a luminosity distance of 410 (+160/-180) Mpc corresponding to a redshift z = 0.09 (+0.03/-0.04). In the source frame, the initial black hole masses are 36 (+5/-4) M_sun and 29 (+4/-4) M_sun, and the final black hole mass is 62 (+4/-4) M_sun, with 3.0 (+0.5/-0.5) M_sun c^2 radiated in gravitational waves. All uncertainties define 90% credible intervals.

These observations demonstrate the existence of binary stellar-mass black hole systems. This is the first direct detection of gravitational waves and the first observation of a binary black hole merger. The detectors in Hanford, Washington, and Livingston, Louisiana, measured strain amplitudes peaking at ~1.0 x 10^-21 within a frequency band of 35 to 250 Hz.`
  }
];
