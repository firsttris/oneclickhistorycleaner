/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSignal, onMount, For } from "solid-js";
import {
  clearHistory,
  createNotification,
  defaultOptions,
} from "../clearHistory";
import { useTranslations } from "../i18n/utils";
import { styled } from "solid-styled-components";

const Container = styled("div")`
  margin: 1rem 0;
`;

const Text = styled("h4")`
  color: #333;
  font-size: 1.2rem;
  margin-top: 2rem;
`;

const FormCheck = styled("div")`
  display: block;
  position: relative;
  padding-left: 1.25rem;
  margin-bottom: 0.3rem;
  cursor: pointer;
  font-size: 1rem;
  user-select: none;
`;

const CheckInput = styled("input")`
  position: absolute;
  margin-top: 0.3rem;
  margin-left: -1.25rem;
`;

const SubmitButton = styled("button")`
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
`;

export const Settings = () => {
  const [options, setOptions] = createSignal(defaultOptions);
  const [removeTabs, setRemoveTabs] = createSignal(false);
  const t = useTranslations();

  onMount(async () => {
    const optionsResult = await chrome.storage.sync.get(["options"]);
    const tabsResult = await chrome.storage.sync.get(["tabs"]);

    if (optionsResult?.options) {
      setOptions({ ...options(), ...optionsResult?.options });
    }

    if (tabsResult?.tabs) {
      setRemoveTabs(tabsResult.tabs.removeTabs);
    }
  });

  const saveSettings = async () => {
    await chrome.storage.sync.set({
      options: options(),
      tabs: {
        removeTabs: removeTabs(),
      },
    });
    await createNotification(t("notification.saved"));

    setTimeout(async () => {
      await chrome.notifications.clear("RRNotification");
    }, 1000);
  };

  return (
    <Container>
      <Text>{t("whatShouldBeRemoved")}</Text>
      <For each={Object.entries(options())}>
        {([key, value]) => (
          <FormCheck>
            <label>
              <CheckInput
                id={key}
                checked={value}
                type="checkbox"
                onChange={() => {
                  setOptions({ ...options(), [key]: !value });
                  saveSettings();
                }}
              />
              {t(key as any)}
            </label>
          </FormCheck>
        )}
      </For>
      <Text>{t("removeOrReload")}</Text>
      <FormCheck>
        <label>
          <CheckInput
            id="refresh"
            checked={!removeTabs()}
            type="checkbox"
            onChange={() => {
              setRemoveTabs(!removeTabs());
              saveSettings();
            }}
          />
          {t("refresh")}
        </label>
      </FormCheck>
      <FormCheck>
        <label>
          <CheckInput
            id="remove"
            checked={removeTabs()}
            type="checkbox"
            onChange={() => {
              setRemoveTabs(!removeTabs());
              saveSettings();
            }}
          />
          {t("remove")}
        </label>
      </FormCheck>
      <br />
      <SubmitButton type="submit" onClick={clearHistory}>
        {t("cleanHistory")}
      </SubmitButton>
    </Container>
  );
};
