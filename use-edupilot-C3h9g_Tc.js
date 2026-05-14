import { S as Subscribable, p as pendingThenable, r as resolveQueryBoolean, s as shallowEqualObjects, a as resolveStaleTime, n as noop, e as environmentManager, i as isValidTimeout, t as timeUntilStale, b as timeoutManager, f as focusManager, c as fetchState, d as replaceData, g as notifyManager, h as shouldThrowError, j as useQueryClient } from "./router-CojGKCx8.js";
import { r as reactExports } from "./server-DdGzs7CI.js";
var QueryObserver = class extends Subscribable {
  constructor(client, options) {
    super();
    this.options = options;
    this.#client = client;
    this.#selectError = null;
    this.#currentThenable = pendingThenable();
    this.bindMethods();
    this.setOptions(options);
  }
  #client;
  #currentQuery = void 0;
  #currentQueryInitialState = void 0;
  #currentResult = void 0;
  #currentResultState;
  #currentResultOptions;
  #currentThenable;
  #selectError;
  #selectFn;
  #selectResult;
  // This property keeps track of the last query with defined data.
  // It will be used to pass the previous data and query to the placeholder function between renders.
  #lastQueryWithDefinedData;
  #staleTimeoutId;
  #refetchIntervalId;
  #currentRefetchInterval;
  #trackedProps = /* @__PURE__ */ new Set();
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    if (this.listeners.size === 1) {
      this.#currentQuery.addObserver(this);
      if (shouldFetchOnMount(this.#currentQuery, this.options)) {
        this.#executeFetch();
      } else {
        this.updateResult();
      }
      this.#updateTimers();
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.destroy();
    }
  }
  shouldFetchOnReconnect() {
    return shouldFetchOn(
      this.#currentQuery,
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return shouldFetchOn(
      this.#currentQuery,
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set();
    this.#clearStaleTimeout();
    this.#clearRefetchInterval();
    this.#currentQuery.removeObserver(this);
  }
  setOptions(options) {
    const prevOptions = this.options;
    const prevQuery = this.#currentQuery;
    this.options = this.#client.defaultQueryOptions(options);
    if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof resolveQueryBoolean(this.options.enabled, this.#currentQuery) !== "boolean") {
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    }
    this.#updateQuery();
    this.#currentQuery.setOptions(this.options);
    if (prevOptions._defaulted && !shallowEqualObjects(this.options, prevOptions)) {
      this.#client.getQueryCache().notify({
        type: "observerOptionsUpdated",
        query: this.#currentQuery,
        observer: this
      });
    }
    const mounted = this.hasListeners();
    if (mounted && shouldFetchOptionally(
      this.#currentQuery,
      prevQuery,
      this.options,
      prevOptions
    )) {
      this.#executeFetch();
    }
    this.updateResult();
    if (mounted && (this.#currentQuery !== prevQuery || resolveQueryBoolean(this.options.enabled, this.#currentQuery) !== resolveQueryBoolean(prevOptions.enabled, this.#currentQuery) || resolveStaleTime(this.options.staleTime, this.#currentQuery) !== resolveStaleTime(prevOptions.staleTime, this.#currentQuery))) {
      this.#updateStaleTimeout();
    }
    const nextRefetchInterval = this.#computeRefetchInterval();
    if (mounted && (this.#currentQuery !== prevQuery || resolveQueryBoolean(this.options.enabled, this.#currentQuery) !== resolveQueryBoolean(prevOptions.enabled, this.#currentQuery) || nextRefetchInterval !== this.#currentRefetchInterval)) {
      this.#updateRefetchInterval(nextRefetchInterval);
    }
  }
  getOptimisticResult(options) {
    const query = this.#client.getQueryCache().build(this.#client, options);
    const result = this.createResult(query, options);
    if (shouldAssignObserverCurrentProperties(this, result)) {
      this.#currentResult = result;
      this.#currentResultOptions = this.options;
      this.#currentResultState = this.#currentQuery.state;
    }
    return result;
  }
  getCurrentResult() {
    return this.#currentResult;
  }
  trackResult(result, onPropTracked) {
    return new Proxy(result, {
      get: (target, key) => {
        this.trackProp(key);
        onPropTracked?.(key);
        if (key === "promise") {
          this.trackProp("data");
          if (!this.options.experimental_prefetchInRender && this.#currentThenable.status === "pending") {
            this.#currentThenable.reject(
              new Error(
                "experimental_prefetchInRender feature flag is not enabled"
              )
            );
          }
        }
        return Reflect.get(target, key);
      }
    });
  }
  trackProp(key) {
    this.#trackedProps.add(key);
  }
  getCurrentQuery() {
    return this.#currentQuery;
  }
  refetch({ ...options } = {}) {
    return this.fetch({
      ...options
    });
  }
  fetchOptimistic(options) {
    const defaultedOptions = this.#client.defaultQueryOptions(options);
    const query = this.#client.getQueryCache().build(this.#client, defaultedOptions);
    return query.fetch().then(() => this.createResult(query, defaultedOptions));
  }
  fetch(fetchOptions) {
    return this.#executeFetch({
      ...fetchOptions,
      cancelRefetch: fetchOptions.cancelRefetch ?? true
    }).then(() => {
      this.updateResult();
      return this.#currentResult;
    });
  }
  #executeFetch(fetchOptions) {
    this.#updateQuery();
    let promise = this.#currentQuery.fetch(
      this.options,
      fetchOptions
    );
    if (!fetchOptions?.throwOnError) {
      promise = promise.catch(noop);
    }
    return promise;
  }
  #updateStaleTimeout() {
    this.#clearStaleTimeout();
    const staleTime = resolveStaleTime(
      this.options.staleTime,
      this.#currentQuery
    );
    if (environmentManager.isServer() || this.#currentResult.isStale || !isValidTimeout(staleTime)) {
      return;
    }
    const time = timeUntilStale(this.#currentResult.dataUpdatedAt, staleTime);
    const timeout = time + 1;
    this.#staleTimeoutId = timeoutManager.setTimeout(() => {
      if (!this.#currentResult.isStale) {
        this.updateResult();
      }
    }, timeout);
  }
  #computeRefetchInterval() {
    return (typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(this.#currentQuery) : this.options.refetchInterval) ?? false;
  }
  #updateRefetchInterval(nextInterval) {
    this.#clearRefetchInterval();
    this.#currentRefetchInterval = nextInterval;
    if (environmentManager.isServer() || resolveQueryBoolean(this.options.enabled, this.#currentQuery) === false || !isValidTimeout(this.#currentRefetchInterval) || this.#currentRefetchInterval === 0) {
      return;
    }
    this.#refetchIntervalId = timeoutManager.setInterval(() => {
      if (this.options.refetchIntervalInBackground || focusManager.isFocused()) {
        this.#executeFetch();
      }
    }, this.#currentRefetchInterval);
  }
  #updateTimers() {
    this.#updateStaleTimeout();
    this.#updateRefetchInterval(this.#computeRefetchInterval());
  }
  #clearStaleTimeout() {
    if (this.#staleTimeoutId !== void 0) {
      timeoutManager.clearTimeout(this.#staleTimeoutId);
      this.#staleTimeoutId = void 0;
    }
  }
  #clearRefetchInterval() {
    if (this.#refetchIntervalId !== void 0) {
      timeoutManager.clearInterval(this.#refetchIntervalId);
      this.#refetchIntervalId = void 0;
    }
  }
  createResult(query, options) {
    const prevQuery = this.#currentQuery;
    const prevOptions = this.options;
    const prevResult = this.#currentResult;
    const prevResultState = this.#currentResultState;
    const prevResultOptions = this.#currentResultOptions;
    const queryChange = query !== prevQuery;
    const queryInitialState = queryChange ? query.state : this.#currentQueryInitialState;
    const { state } = query;
    let newState = { ...state };
    let isPlaceholderData = false;
    let data;
    if (options._optimisticResults) {
      const mounted = this.hasListeners();
      const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
      const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
      if (fetchOnMount || fetchOptionally) {
        newState = {
          ...newState,
          ...fetchState(state.data, query.options)
        };
      }
      if (options._optimisticResults === "isRestoring") {
        newState.fetchStatus = "idle";
      }
    }
    let { error, errorUpdatedAt, status } = newState;
    data = newState.data;
    let skipSelect = false;
    if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
      let placeholderData;
      if (prevResult?.isPlaceholderData && options.placeholderData === prevResultOptions?.placeholderData) {
        placeholderData = prevResult.data;
        skipSelect = true;
      } else {
        placeholderData = typeof options.placeholderData === "function" ? options.placeholderData(
          this.#lastQueryWithDefinedData?.state.data,
          this.#lastQueryWithDefinedData
        ) : options.placeholderData;
      }
      if (placeholderData !== void 0) {
        status = "success";
        data = replaceData(
          prevResult?.data,
          placeholderData,
          options
        );
        isPlaceholderData = true;
      }
    }
    if (options.select && data !== void 0 && !skipSelect) {
      if (prevResult && data === prevResultState?.data && options.select === this.#selectFn) {
        data = this.#selectResult;
      } else {
        try {
          this.#selectFn = options.select;
          data = options.select(data);
          data = replaceData(prevResult?.data, data, options);
          this.#selectResult = data;
          this.#selectError = null;
        } catch (selectError) {
          this.#selectError = selectError;
        }
      }
    }
    if (this.#selectError) {
      error = this.#selectError;
      data = this.#selectResult;
      errorUpdatedAt = Date.now();
      status = "error";
    }
    const isFetching = newState.fetchStatus === "fetching";
    const isPending = status === "pending";
    const isError = status === "error";
    const isLoading = isPending && isFetching;
    const hasData = data !== void 0;
    const result = {
      status,
      fetchStatus: newState.fetchStatus,
      isPending,
      isSuccess: status === "success",
      isError,
      isInitialLoading: isLoading,
      isLoading,
      data,
      dataUpdatedAt: newState.dataUpdatedAt,
      error,
      errorUpdatedAt,
      failureCount: newState.fetchFailureCount,
      failureReason: newState.fetchFailureReason,
      errorUpdateCount: newState.errorUpdateCount,
      isFetched: query.isFetched(),
      isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
      isFetching,
      isRefetching: isFetching && !isPending,
      isLoadingError: isError && !hasData,
      isPaused: newState.fetchStatus === "paused",
      isPlaceholderData,
      isRefetchError: isError && hasData,
      isStale: isStale(query, options),
      refetch: this.refetch,
      promise: this.#currentThenable,
      isEnabled: resolveQueryBoolean(options.enabled, query) !== false
    };
    const nextResult = result;
    if (this.options.experimental_prefetchInRender) {
      const hasResultData = nextResult.data !== void 0;
      const isErrorWithoutData = nextResult.status === "error" && !hasResultData;
      const finalizeThenableIfPossible = (thenable) => {
        if (isErrorWithoutData) {
          thenable.reject(nextResult.error);
        } else if (hasResultData) {
          thenable.resolve(nextResult.data);
        }
      };
      const recreateThenable = () => {
        const pending = this.#currentThenable = nextResult.promise = pendingThenable();
        finalizeThenableIfPossible(pending);
      };
      const prevThenable = this.#currentThenable;
      switch (prevThenable.status) {
        case "pending":
          if (query.queryHash === prevQuery.queryHash) {
            finalizeThenableIfPossible(prevThenable);
          }
          break;
        case "fulfilled":
          if (isErrorWithoutData || nextResult.data !== prevThenable.value) {
            recreateThenable();
          }
          break;
        case "rejected":
          if (!isErrorWithoutData || nextResult.error !== prevThenable.reason) {
            recreateThenable();
          }
          break;
      }
    }
    return nextResult;
  }
  updateResult() {
    const prevResult = this.#currentResult;
    const nextResult = this.createResult(this.#currentQuery, this.options);
    this.#currentResultState = this.#currentQuery.state;
    this.#currentResultOptions = this.options;
    if (this.#currentResultState.data !== void 0) {
      this.#lastQueryWithDefinedData = this.#currentQuery;
    }
    if (shallowEqualObjects(nextResult, prevResult)) {
      return;
    }
    this.#currentResult = nextResult;
    const shouldNotifyListeners = () => {
      if (!prevResult) {
        return true;
      }
      const { notifyOnChangeProps } = this.options;
      const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
      if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !this.#trackedProps.size) {
        return true;
      }
      const includedProps = new Set(
        notifyOnChangePropsValue ?? this.#trackedProps
      );
      if (this.options.throwOnError) {
        includedProps.add("error");
      }
      return Object.keys(this.#currentResult).some((key) => {
        const typedKey = key;
        const changed = this.#currentResult[typedKey] !== prevResult[typedKey];
        return changed && includedProps.has(typedKey);
      });
    };
    this.#notify({ listeners: shouldNotifyListeners() });
  }
  #updateQuery() {
    const query = this.#client.getQueryCache().build(this.#client, this.options);
    if (query === this.#currentQuery) {
      return;
    }
    const prevQuery = this.#currentQuery;
    this.#currentQuery = query;
    this.#currentQueryInitialState = query.state;
    if (this.hasListeners()) {
      prevQuery?.removeObserver(this);
      query.addObserver(this);
    }
  }
  onQueryUpdate() {
    this.updateResult();
    if (this.hasListeners()) {
      this.#updateTimers();
    }
  }
  #notify(notifyOptions) {
    notifyManager.batch(() => {
      if (notifyOptions.listeners) {
        this.listeners.forEach((listener) => {
          listener(this.#currentResult);
        });
      }
      this.#client.getQueryCache().notify({
        query: this.#currentQuery,
        type: "observerResultsUpdated"
      });
    });
  }
};
function shouldLoadOnMount(query, options) {
  return resolveQueryBoolean(options.enabled, query) !== false && query.state.data === void 0 && !(query.state.status === "error" && resolveQueryBoolean(options.retryOnMount, query) === false);
}
function shouldFetchOnMount(query, options) {
  return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
  if (resolveQueryBoolean(options.enabled, query) !== false && resolveStaleTime(options.staleTime, query) !== "static") {
    const value = typeof field === "function" ? field(query) : field;
    return value === "always" || value !== false && isStale(query, options);
  }
  return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
  return (query !== prevQuery || resolveQueryBoolean(prevOptions.enabled, query) === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
  return resolveQueryBoolean(options.enabled, query) !== false && query.isStaleByTime(resolveStaleTime(options.staleTime, query));
}
function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
  if (!shallowEqualObjects(observer.getCurrentResult(), optimisticResult)) {
    return true;
  }
  return false;
}
var IsRestoringContext = reactExports.createContext(false);
var useIsRestoring = () => reactExports.useContext(IsRestoringContext);
IsRestoringContext.Provider;
function createValue() {
  let isReset = false;
  return {
    clearReset: () => {
      isReset = false;
    },
    reset: () => {
      isReset = true;
    },
    isReset: () => {
      return isReset;
    }
  };
}
var QueryErrorResetBoundaryContext = reactExports.createContext(createValue());
var useQueryErrorResetBoundary = () => reactExports.useContext(QueryErrorResetBoundaryContext);
var ensurePreventErrorBoundaryRetry = (options, errorResetBoundary, query) => {
  const throwOnError = query?.state.error && typeof options.throwOnError === "function" ? shouldThrowError(options.throwOnError, [query.state.error, query]) : options.throwOnError;
  if (options.suspense || options.experimental_prefetchInRender || throwOnError) {
    if (!errorResetBoundary.isReset()) {
      options.retryOnMount = false;
    }
  }
};
var useClearResetErrorBoundary = (errorResetBoundary) => {
  reactExports.useEffect(() => {
    errorResetBoundary.clearReset();
  }, [errorResetBoundary]);
};
var getHasError = ({
  result,
  errorResetBoundary,
  throwOnError,
  query,
  suspense
}) => {
  return result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && (suspense && result.data === void 0 || shouldThrowError(throwOnError, [result.error, query]));
};
var ensureSuspenseTimers = (defaultedOptions) => {
  if (defaultedOptions.suspense) {
    const MIN_SUSPENSE_TIME_MS = 1e3;
    const clamp = (value) => value === "static" ? value : Math.max(value ?? MIN_SUSPENSE_TIME_MS, MIN_SUSPENSE_TIME_MS);
    const originalStaleTime = defaultedOptions.staleTime;
    defaultedOptions.staleTime = typeof originalStaleTime === "function" ? (...args) => clamp(originalStaleTime(...args)) : clamp(originalStaleTime);
    if (typeof defaultedOptions.gcTime === "number") {
      defaultedOptions.gcTime = Math.max(
        defaultedOptions.gcTime,
        MIN_SUSPENSE_TIME_MS
      );
    }
  }
};
var willFetch = (result, isRestoring) => result.isLoading && result.isFetching && !isRestoring;
var shouldSuspend = (defaultedOptions, result) => defaultedOptions?.suspense && result.isPending;
var fetchOptimistic = (defaultedOptions, observer, errorResetBoundary) => observer.fetchOptimistic(defaultedOptions).catch(() => {
  errorResetBoundary.clearReset();
});
function useBaseQuery(options, Observer, queryClient) {
  const isRestoring = useIsRestoring();
  const errorResetBoundary = useQueryErrorResetBoundary();
  const client = useQueryClient();
  const defaultedOptions = client.defaultQueryOptions(options);
  client.getDefaultOptions().queries?._experimental_beforeQuery?.(
    defaultedOptions
  );
  const query = client.getQueryCache().get(defaultedOptions.queryHash);
  defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
  ensureSuspenseTimers(defaultedOptions);
  ensurePreventErrorBoundaryRetry(defaultedOptions, errorResetBoundary, query);
  useClearResetErrorBoundary(errorResetBoundary);
  const isNewCacheEntry = !client.getQueryCache().get(defaultedOptions.queryHash);
  const [observer] = reactExports.useState(
    () => new Observer(
      client,
      defaultedOptions
    )
  );
  const result = observer.getOptimisticResult(defaultedOptions);
  const shouldSubscribe = !isRestoring && options.subscribed !== false;
  reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => {
        const unsubscribe = shouldSubscribe ? observer.subscribe(notifyManager.batchCalls(onStoreChange)) : noop;
        observer.updateResult();
        return unsubscribe;
      },
      [observer, shouldSubscribe]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  reactExports.useEffect(() => {
    observer.setOptions(defaultedOptions);
  }, [defaultedOptions, observer]);
  if (shouldSuspend(defaultedOptions, result)) {
    throw fetchOptimistic(defaultedOptions, observer, errorResetBoundary);
  }
  if (getHasError({
    result,
    errorResetBoundary,
    throwOnError: defaultedOptions.throwOnError,
    query,
    suspense: defaultedOptions.suspense
  })) {
    throw result.error;
  }
  client.getDefaultOptions().queries?._experimental_afterQuery?.(
    defaultedOptions,
    result
  );
  if (defaultedOptions.experimental_prefetchInRender && !environmentManager.isServer() && willFetch(result, isRestoring)) {
    const promise = isNewCacheEntry ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      fetchOptimistic(defaultedOptions, observer, errorResetBoundary)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      query?.promise
    );
    promise?.catch(noop).finally(() => {
      observer.updateResult();
    });
  }
  return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
}
function useQuery(options, queryClient) {
  return useBaseQuery(options, QueryObserver);
}
const student_id = "445004397";
const student_name = "نورة عبدالله الزهراني";
const program = "بكالوريوس علوم الحاسب — جامعة الباحة";
const gpa = 4.31;
const passed_courses = [{ "code": "CS101", "name": "مقدمة في الحوسبة", "grade": 100, "hours": 3, "term": "1446/1" }, { "code": "MATH151", "name": "حساب التفاضل", "grade": 88, "hours": 4, "term": "1446/1" }, { "code": "ENG101", "name": "اللغة الإنجليزية 1", "grade": 92, "hours": 3, "term": "1446/1" }, { "code": "ARAB101", "name": "اللغة العربية", "grade": 95, "hours": 2, "term": "1446/1" }, { "code": "ISLM101", "name": "ثقافة إسلامية", "grade": 96, "hours": 2, "term": "1446/1" }, { "code": "CS102", "name": "برمجة 1", "grade": 85, "hours": 3, "term": "1446/2" }, { "code": "MATH152", "name": "حساب التكامل", "grade": 78, "hours": 4, "term": "1446/2" }, { "code": "CS103", "name": "هياكل منفصلة", "grade": 95, "hours": 3, "term": "1446/2" }, { "code": "PHYS101", "name": "فيزياء عامة", "grade": 80, "hours": 3, "term": "1446/2" }, { "code": "ENG102", "name": "اللغة الإنجليزية 2", "grade": 90, "hours": 3, "term": "1446/2" }, { "code": "CS201", "name": "برمجة 2", "grade": 72, "hours": 3, "term": "1447/1" }, { "code": "CS202", "name": "تنظيم الحاسب", "grade": 86, "hours": 3, "term": "1447/1" }, { "code": "MATH251", "name": "الجبر الخطي", "grade": 83, "hours": 3, "term": "1447/1" }, { "code": "STAT201", "name": "إحصاء واحتمالات", "grade": 79, "hours": 3, "term": "1447/1" }];
const plan = [{ "code": "CS101", "name": "مقدمة في الحوسبة", "hours": 3, "prerequisites": [], "yearly_only": false, "level": 1, "type": "core", "difficulty": 35 }, { "code": "MATH151", "name": "حساب التفاضل", "hours": 4, "prerequisites": [], "yearly_only": false, "level": 1, "type": "core", "difficulty": 55 }, { "code": "ENG101", "name": "اللغة الإنجليزية 1", "hours": 3, "prerequisites": [], "yearly_only": false, "level": 1, "type": "core", "difficulty": 30 }, { "code": "ARAB101", "name": "اللغة العربية", "hours": 2, "prerequisites": [], "yearly_only": false, "level": 1, "type": "core", "difficulty": 25 }, { "code": "ISLM101", "name": "ثقافة إسلامية", "hours": 2, "prerequisites": [], "yearly_only": false, "level": 1, "type": "core", "difficulty": 20 }, { "code": "CS102", "name": "برمجة 1", "hours": 3, "prerequisites": ["CS101"], "yearly_only": false, "level": 2, "type": "core", "difficulty": 60 }, { "code": "MATH152", "name": "حساب التكامل", "hours": 4, "prerequisites": ["MATH151"], "yearly_only": false, "level": 2, "type": "core", "difficulty": 65 }, { "code": "CS103", "name": "هياكل منفصلة", "hours": 3, "prerequisites": ["MATH151"], "yearly_only": false, "level": 2, "type": "core", "difficulty": 70 }, { "code": "PHYS101", "name": "فيزياء عامة", "hours": 3, "prerequisites": [], "yearly_only": false, "level": 2, "type": "core", "difficulty": 55 }, { "code": "ENG102", "name": "اللغة الإنجليزية 2", "hours": 3, "prerequisites": ["ENG101"], "yearly_only": false, "level": 2, "type": "core", "difficulty": 35 }, { "code": "CS201", "name": "برمجة 2", "hours": 3, "prerequisites": ["CS102"], "yearly_only": false, "level": 3, "type": "core", "difficulty": 72 }, { "code": "CS202", "name": "تنظيم الحاسب", "hours": 3, "prerequisites": ["CS101"], "yearly_only": false, "level": 3, "type": "core", "difficulty": 68 }, { "code": "MATH251", "name": "الجبر الخطي", "hours": 3, "prerequisites": ["MATH152"], "yearly_only": false, "level": 3, "type": "core", "difficulty": 70 }, { "code": "STAT201", "name": "إحصاء واحتمالات", "hours": 3, "prerequisites": ["MATH152"], "yearly_only": false, "level": 3, "type": "core", "difficulty": 65 }, { "code": "CS301", "name": "هياكل البيانات", "hours": 4, "prerequisites": ["CS201", "CS103"], "yearly_only": false, "level": 4, "type": "core", "difficulty": 88 }, { "code": "CS302", "name": "نظم قواعد البيانات", "hours": 3, "prerequisites": ["CS201"], "yearly_only": false, "level": 4, "type": "core", "difficulty": 72 }, { "code": "CS303", "name": "تحليل وتصميم الخوارزميات", "hours": 3, "prerequisites": ["CS103", "CS201"], "yearly_only": false, "level": 4, "type": "core", "difficulty": 82 }, { "code": "ENG201", "name": "الكتابة التقنية", "hours": 2, "prerequisites": ["ENG102"], "yearly_only": false, "level": 4, "type": "core", "difficulty": 40 }, { "code": "CS304", "name": "هندسة البرمجيات", "hours": 3, "prerequisites": ["CS201"], "yearly_only": true, "level": 4, "type": "core", "difficulty": 68 }, { "code": "CS305", "name": "إنترنت الأشياء", "hours": 3, "prerequisites": ["CS202"], "yearly_only": true, "level": 4, "type": "core", "difficulty": 75 }, { "code": "CS401", "name": "نظم التشغيل", "hours": 3, "prerequisites": ["CS301", "CS202"], "yearly_only": false, "level": 5, "type": "core", "difficulty": 85 }, { "code": "CS402", "name": "شبكات الحاسب", "hours": 3, "prerequisites": ["CS202"], "yearly_only": false, "level": 5, "type": "core", "difficulty": 78 }, { "code": "CS403", "name": "الذكاء الاصطناعي", "hours": 3, "prerequisites": ["CS301", "STAT201"], "yearly_only": false, "level": 5, "type": "core", "difficulty": 85 }, { "code": "CS404", "name": "الأمن السيبراني", "hours": 3, "prerequisites": ["CS402"], "yearly_only": true, "level": 5, "type": "core", "difficulty": 80 }, { "code": "MATH301", "name": "نظرية الأعداد", "hours": 2, "prerequisites": ["MATH251"], "yearly_only": false, "level": 4, "type": "core", "difficulty": 65 }, { "code": "CS501", "name": "تطبيقات إنترنت الأشياء المتقدمة", "hours": 3, "prerequisites": ["CS305"], "yearly_only": false, "level": 6, "type": "core", "difficulty": 82 }, { "code": "CS499", "name": "مشروع التخرج", "hours": 4, "prerequisites": ["CS301", "CS302", "CS304"], "yearly_only": false, "level": 8, "type": "core", "difficulty": 90 }];
const current_term_courses = ["CS301", "CS302", "CS303", "ENG201", "CS304", "MATH301"];
const extracted = {
  student_id,
  student_name,
  program,
  gpa,
  passed_courses,
  plan,
  current_term_courses
};
const __vite_import_meta_env__ = {};
const API_BASE = typeof import.meta !== "undefined" && __vite_import_meta_env__?.VITE_EDUPILOT_API || "http://127.0.0.1:8000";
const HARD_DIFFICULTY = 75;
const WEAK_GRADE = 80;
const MAX_HEALTHY_HOURS = 15;
const HEAVY_DIFFICULTY = 70;
function computeLocally(data) {
  const passedByCode = new Map(data.passed_courses.map((c) => [c.code, c]));
  const planByCode = new Map(data.plan.map((c) => [c.code, c]));
  const current = new Set(data.current_term_courses);
  const alerts = [];
  const unlocksFor = (code) => data.plan.filter((c) => c.prerequisites.includes(code)).map((c) => ({ code: c.code, name: c.name }));
  const isEligible = (c) => c.prerequisites.every((p) => passedByCode.has(p));
  for (const c of data.plan) {
    if (passedByCode.has(c.code) || current.has(c.code)) continue;
    if (!isEligible(c)) continue;
    const unlocks = unlocksFor(c.code);
    if (c.yearly_only && unlocks.length > 0) {
      alerts.push({
        severity: "critical",
        title: `سجّل ${c.code} الآن — تُطرح سنوياً فقط`,
        body: `مادة ${c.name} متطلب أساسي لـ ${unlocks.map((u) => u.name).join("، ")} وتُطرح مرة واحدة في السنة. إن لم تُسجَّل هذا الفصل فسيتأخر التخرج عاماً كاملاً.`,
        course_code: c.code,
        course_name: c.name,
        unlocks,
        yearly: true
      });
      continue;
    }
    if (unlocks.length >= 2) {
      alerts.push({
        severity: "warning",
        title: `مهم: ${c.code} يفتح ${unlocks.length} مواد لاحقة`,
        body: `اجتزتِ متطلبات ${c.name} لكنها لم تظهر بعد في خطتك. تأجيلها يؤخر: ${unlocks.map((u) => u.name).join("، ")}.`,
        course_code: c.code,
        course_name: c.name,
        unlocks,
        yearly: false
      });
    }
  }
  for (const code of data.current_term_courses) {
    const c = planByCode.get(code);
    if (c?.yearly_only) {
      alerts.push({
        severity: "warning",
        title: `${c.name} تُطرح سنوياً — لا تسقطها`,
        body: "هذه المادة موجودة في خطة ترمك القادم لكنها تُطرح سنوياً. إسقاطها يعني تأخراً مقداره عام كامل.",
        course_code: c.code,
        course_name: c.name,
        unlocks: [],
        yearly: true
      });
    }
  }
  const bridges = [];
  for (const code of data.current_term_courses) {
    const c = planByCode.get(code);
    if (!c || c.difficulty < HARD_DIFFICULTY) continue;
    for (const pre of c.prerequisites) {
      const passed = passedByCode.get(pre);
      if (!passed || passed.grade >= WEAK_GRADE) continue;
      bridges.push({
        course_code: c.code,
        course_name: c.name,
        weak_prereq_code: passed.code,
        weak_prereq_name: passed.name,
        weak_prereq_grade: passed.grade,
        recommendation: `درجتك في ${passed.name} كانت ${Math.round(
          passed.grade
        )}/100 — راجعي هذه الموديولات القصيرة قبل بدء ${c.name}.`,
        micro_modules: defaultModules(c.code, passed.code)
      });
    }
  }
  let totalHours = 0;
  let weightedSum = 0;
  let difficultySum = 0;
  let count = 0;
  const breakdown = [];
  for (const code of data.current_term_courses) {
    const c = planByCode.get(code);
    if (!c) continue;
    totalHours += c.hours;
    weightedSum += c.hours * c.difficulty;
    difficultySum += c.difficulty;
    count++;
    breakdown.push({
      code: c.code,
      name: c.name,
      hours: c.hours,
      difficulty: c.difficulty,
      weight: Math.round(c.hours * c.difficulty / 10) / 10
    });
  }
  const avg = count ? difficultySum / count : 0;
  const weighted = totalHours ? weightedSum / totalHours : 0;
  const stressful = totalHours > MAX_HEALTHY_HOURS && (weighted >= HEAVY_DIFFICULTY || avg >= HEAVY_DIFFICULTY);
  const load = {
    total_hours: totalHours,
    avg_difficulty: Math.round(avg * 10) / 10,
    weighted_load: Math.round(weighted * 10) / 10,
    status: stressful ? "Stressful" : "Balanced",
    status_ar: stressful ? "مرهق" : "متوازن",
    breakdown
  };
  return {
    student: {
      student_id: data.student_id,
      student_name: data.student_name,
      program: data.program,
      gpa: data.gpa,
      passed_courses: data.passed_courses,
      current_term_courses: data.current_term_courses
    },
    plan: data.plan,
    alerts,
    bridges,
    load
  };
}
function defaultModules(courseCode, prereqCode) {
  const library = {
    "CS301:CS201": [
      {
        title: "مراجعة المؤشرات والذاكرة الديناميكية",
        channel: "أكاديمية حسوب",
        duration: "55 دقيقة",
        language: "ar",
        url: "https://www.youtube.com/results?search_query=المؤشرات+لغة+c+حسوب"
      },
      {
        title: "Pointers and Memory Crash Course",
        channel: "freeCodeCamp",
        duration: "1h 02m",
        language: "en",
        url: "https://www.youtube.com/watch?v=zuegQmMdy8M"
      }
    ],
    "CS303:CS103": [
      {
        title: "العلاقات والدوال في الرياضيات المنفصلة",
        channel: "Khan Academy العربية",
        duration: "40 دقيقة",
        language: "ar",
        url: "https://www.youtube.com/results?search_query=رياضيات+منفصلة+علاقات"
      },
      {
        title: "Big-O Notation from Scratch",
        channel: "CS Dojo",
        duration: "32m",
        language: "en",
        url: "https://www.youtube.com/watch?v=v4cd1O4zkGw"
      }
    ]
  };
  const key = `${courseCode}:${prereqCode}`;
  if (library[key]) return library[key];
  return [
    {
      title: `مراجعة مفاهيم ${prereqCode} الأساسية`,
      channel: "EduPilot — مكتبة المراجعات",
      duration: "45 دقيقة",
      language: "ar",
      url: `https://www.youtube.com/results?search_query=${prereqCode}+مراجعة`
    },
    {
      title: `Foundations review for ${courseCode}`,
      channel: "EduPilot Micro Library",
      duration: "35m",
      language: "en",
      url: `https://www.youtube.com/results?search_query=${courseCode}+foundations+review`
    }
  ];
}
let _cache = null;
function getDashboard() {
  if (_cache) return _cache;
  _cache = (async () => {
    try {
      const res = await fetch(`${API_BASE}/api/dashboard`, {
        headers: { Accept: "application/json" }
      });
      if (res.ok) {
        const data = await res.json();
        const student = data.student;
        return {
          student,
          plan: data.plan ?? [],
          alerts: data.alerts ?? [],
          bridges: data.bridges ?? [],
          load: data.load
        };
      }
    } catch {
    }
    return computeLocally(extracted);
  })();
  return _cache;
}
async function loginDemo(studentId, password) {
  try {
    const res = await fetch(`${API_BASE}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ student_id: studentId, password })
    });
    if (res.ok) {
      const data = await res.json();
      const studentRes = await fetch(`${API_BASE}/api/student`).then(
        (r) => r.ok ? r.json() : null
      );
      return studentRes ?? data;
    }
  } catch {
  }
  const local = extracted;
  if (studentId === local.student_id) {
    return {
      student_id: local.student_id,
      student_name: local.student_name,
      program: local.program,
      gpa: local.gpa,
      passed_courses: local.passed_courses,
      current_term_courses: local.current_term_courses
    };
  }
  throw new Error("رقم جامعي غير معروف");
}
const KEY = ["edupilot", "dashboard"];
function useEduPilot() {
  return useQuery({
    queryKey: KEY,
    queryFn: getDashboard,
    staleTime: 6e4,
    refetchOnWindowFocus: false
  });
}
export {
  loginDemo as l,
  useEduPilot as u
};
